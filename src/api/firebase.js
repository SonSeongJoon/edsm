import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import {
  child,
  get,
  getDatabase,
  query,
  ref,
  remove,
  set,
} from 'firebase/database';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import {sendKakaoCreateProduct} from "./kakao";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_ADMIN_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
};

initializeApp(firebaseConfig);
const auth = getAuth();
const dbRef = ref(getDatabase());
const db = getDatabase();

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password).catch((error) => {
    console.error('Error signing in with email and password:', error);
    throw error;
  });
}

export function logout() {
  return signOut(auth).catch(console.error);
}

export function onUserStateChange(callback) {
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await getUserDetails(user) : null;
    callback(updatedUser);
  });
}

async function getUserDetails(user) {
  const usersQuery = query(child(dbRef, 'userdata'));

  return get(usersQuery).then((snapshot) => {
    if (snapshot.exists()) {
      const users = snapshot.val();
      const isAdmin = Object.keys(users).some(uid => users[uid].role === '부서장&대표' && uid === user.uid);
      const isMst = Object.keys(users).some(uid => users[uid].department === '경영지원팀' && uid === user.uid);

      // user의 uid에 해당하는 department 값을 찾기
      const userDepartment = users[user.uid]?.department;
      const userPhoneNum = users[user.uid]?.phoneNum;

      return { ...user, isAdmin, isMst, dept: userDepartment, phoneNum: userPhoneNum };
    }
    return user;
  });
}

export async function addNewProduct(product, userName, userDept, userPhoneNum) {
  const userId = auth.currentUser?.uid;
  if (!userId) {
    throw new Error('User is not authenticated');
  }
  const id = uuid();
  let now = moment();
  let dateTime = now.format('YY.MM.DD | HH:mm');

  await set(ref(db, `products/${id}`), {
    ...product,
    id,
    userId,
    date: dateTime,
    state: '대기',
    displayName: userName,
    dept: userDept,
    writerPhonNum: userPhoneNum,
  });
  const emails = product.agree;
  const usersRef = ref(db, 'userdata');
  const snapshot = await get(usersRef);
  if (snapshot.exists()) {
    const usersData = snapshot.val();

    emails.map(async (email) => {
      let matchedUser;
      for (const [userId, userData] of Object.entries(usersData)) {
        if (userData.email === email) {
          matchedUser = {
            matchedUserId: userId,
            name: userData.name,
            phoneNum: userData.phoneNum,
          };
          break;
        }
      }
      if (matchedUser.matchedUserId) {
        await set(ref(db, `admins/${id}/${matchedUser.matchedUserId}`), {
          id,
          oneState: '대기',
          date: dateTime,
          writeUser: userId,
          ...product,
          isAdmin: true,
          displayName: userName,
          admitName: matchedUser.name,
        });
        const link = `https://seouliredsm.netlify.app/receive`
        // const encodeLink = encodeURIComponent(link)
        // const kakaoData = {
        //   name : userName,
        //   phoneNum : matchedUser.phoneNum,
        //   file : product.file,
        //   link : encodeLink,
        // };

        // await sendKakaoCreateProduct(kakaoData);
      } else {
        console.log('No matching user found for email:', email);
      }
    });
  } else {
    console.log('No users found in the database.');
  }
}

export async function getProduct(filterState) {
  const userId = auth.currentUser?.uid;
  if (!userId) {
    throw new Error('User is not authenticated');
  }
  return get(child(dbRef, 'products')).then((snapshot) => {
    if (snapshot.exists()) {
      const allProducts = Object.values(snapshot.val());
      const filteredProducts = allProducts.filter((product) => {
        // userId가 일치하는지 확인
        if (product.userId !== userId) return false;

        // filterState 값이 주어졌을 때만 state를 확인
        if (filterState && product.state !== filterState) return false;

        return true;
      });
      return filteredProducts.sort((a, b) => {
        if (a.date < b.date) return 1;
        if (a.date > b.date) return -1;
        return 0;
      });
    }
    return [];
  });
}

export async function getReceive(adminId) {
  const adminsRef = ref(db, 'admins');
  const snapshot = await get(adminsRef);

  if (!snapshot.exists()) {
    console.log('No admins data found.');
    return [];
  }

  const allAdminsData = snapshot.val();
  let userEntries = [];

  for (let fileId in allAdminsData) {
    const userData = allAdminsData[fileId][adminId];

    if (userData) {
      userEntries.push({
        ...userData,
        fileId: fileId,
      });
    }
  }

  const augmentedEntriesPromises = userEntries.map(async (entry) => {
    const productSnapshot = await get(ref(db, `products/${entry.fileId}`));
    if (productSnapshot.exists()) {
      const productData = productSnapshot.val();
      return {
        ...entry,
        ...productData,
      };
    }
    return entry;
  });

  const augmentedEntries = await Promise.all(augmentedEntriesPromises);

  return augmentedEntries.sort((a, b) => {
    if (a.date < b.date) return 1;
    if (a.date > b.date) return -1;
    return 0;
  });
}

export async function getAll() {
  return get(child(dbRef, `products`)).then((snapshot) => {
    if (snapshot.exists()) {
      const allEntries = snapshot.val();
      return Object.values(allEntries).sort((a, b) => {
        if(a.date < b.date) return 1;
        if(a.date > b.date) return -1;
        return 0;
      });
    }
    return [];
  });
}

export async function updateProduct(product, updatedProduct) {
  return set(ref(db, `products/${product.id}`), updatedProduct).catch(
    console.error,
  );
}

export async function deleteProduct(productId) {
  return remove(ref(db, `products/${productId}`));
}

//Email 회원가입
export const signupEmail = async (formData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password,
    );
    const user = userCredential.user;
    await updateProfile(user, {
      displayName: formData.name,
    });
    const db = getDatabase();
    const userRef = ref(db, `userdata/${user.uid}`);
    await set(userRef, {
      name: formData.name,
      email: formData.email,
      phoneNum: formData.phoneNum,
      department: formData.department,
      role: formData.role,
      corporation: formData.corporation,
    });
  } catch (error) {
    console.error('Error signing up with email and password:', error);
    // 이미 가입된 회원인 경우
    if (error.code === 'auth/email-already-in-use') {
      alert('이미 가입된 회원입니다.');
    }
    throw error;
  }
};



// 승인버튼 클릭
export async function setOneState(adminId, fileId) {
  return get(child(dbRef, `admins/${fileId}/${adminId}/oneState`)).then(
    async (snapshot) => {
      if (snapshot.exists()) {
        const state = snapshot.val();
        let newState = '';
        switch (state) {
          case '대기':
            newState = '승인';
            break;
          case '승인':
            newState = '반려';
            break;
          case '반려':
            newState = '대기';
            break;
          default:
            break;
        }
        await set(ref(db, `admins/${fileId}/${adminId}/oneState`), newState);
        return newState;
      }
    },
  );
}

export async function getOneState(adminId, fileId) {
  return get(child(dbRef, `admins/${fileId}/${adminId}/oneState`)).then(
     (snapshot) => {
       if (snapshot.exists()) {
         return snapshot.val();
       }
     },
  );
}


// 반려사유등록하기
export async function setRejectReason(fileId, reasonText, userName, userId) {
  // 첫 번째 경로에 저장
  const firstPath = ref(db, `products/${fileId}/reason/${userName}`);

  const secondPath = ref(db, `admins/${fileId}/${userId}/reason`);

  await Promise.all([set(firstPath, reasonText), set(secondPath, reasonText)]);

  return true;
}

// 반려사유 삭제하기
export async function removeRejectReason(fileId, userName, userId) {
  const firstPath = ref(db, `products/${fileId}/reason/${userName}`);

  const secondPath = ref(db, `admins/${fileId}/${userId}/reason`);

  await Promise.all([remove(firstPath), remove(secondPath)]);
  return true;
}

export async function getRejectReasonProduct(fileId) {
  return get(child(dbRef, `products/${fileId}`)).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val().reason;
    }
    return null;
  });
}

export async function getRejectReasonAdmin(userId, fileId) {
  return get(child(dbRef, `admins/${fileId}/${userId}/reason`)).then(
    (snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      }
      return null;
    },
  );
}

export async function setAdmit(fileId, userName) {
  return set(ref(db, `products/${fileId}/admitMember/${userName}`), true);
}

export async function removeAdmit(fileId, userName) {
  return remove(ref(db, `products/${fileId}/admitMember/${userName}`));
}

export async function getAllOneState(fileId) {
  const adminsRef = ref(db, `admins/${fileId}`);
  const snapshot = await get(adminsRef);
  const data = snapshot.val();

  if (!data) {
    console.log('No matching documents found.');
    return [];
  }

  let oneStates = [];
  for (let userId in data) {
    oneStates.push({
      id: data[userId].id,
      state: data[userId].oneState,
      name: data[userId].admitName,
    });
  }
  return oneStates;
}

export async function setState(fileId, state) {
  return set(ref(db, `products/${fileId}/state`), state);
}

export async function getUsersData() {
  return get(child(dbRef, `userdata`)).then(snapshot => {
    return snapshot.val();
  })
}

export async function getData(id) {
  const db = getDatabase();
  const productRef = ref(db, `products/${id}`);

  try {
    const snapshot = await get(productRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log(`No data found for product id: ${id}`);
      return null;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
