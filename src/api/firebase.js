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
  equalTo,
  get,
  getDatabase,
  orderByChild,
  query,
  ref,
  remove,
  set,
} from 'firebase/database';
import { v4 as uuid } from 'uuid';
import moment from 'moment';

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
    const updateUser = user ? await adminUser(user) : null;
    callback(updateUser);
  });
}

async function adminUser(user) {
  const usersQuery = query(
    child(dbRef, 'userdata'),
    orderByChild('role'),
    equalTo('부서장&대표'),
  );

  return get(usersQuery).then((snapshot) => {
    if (snapshot.exists()) {
      const users = snapshot.val();
      const isAdmin = Object.keys(users).includes(user.uid);
      return { ...user, isAdmin };
    }
    return user;
  });
}

export async function addNewProduct(product, userName) {
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
  });
  const emails = product.agree;
  const usersRef = ref(db, 'userdata');
  const snapshot = await get(usersRef);
  if (snapshot.exists()) {
    const usersData = snapshot.val();

    emails.map(async (email) => {
      let matchedUserId;
      for (const [userId, userData] of Object.entries(usersData)) {
        if (userData.email === email) {
          matchedUserId = userId;
          break;
        }
      }
      if (matchedUserId) {
        console.log('Matched User ID:', matchedUserId);
        await set(ref(db, `admins/${matchedUserId}/${id}`), {
          id,
          oneState: '대기',
          date: dateTime,
          writeUser: userId,
          ...product,
          isAdmin: true,
          displayName: userName,
        });
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

export async function updateProduct(product, updatedProduct) {
  return set(ref(db, `products/${product.id}`), updatedProduct)
    .then(() => {
      console.log('성공적으로 수정되었습니다.');
    })
    .catch(console.error);
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
      department: formData.department,
      role: formData.role,
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

export async function getReceive(adminId) {
  return get(child(dbRef, `admins/${adminId}`)).then((snapshot) => {
    if (snapshot.exists()) {
      const allEntries = snapshot.val();
      const sortedEntries = Object.values(allEntries).sort((a, b) => {
        if (a.date < b.date) return 1;
        if (a.date > b.date) return -1;
        return 0;
      });
      return sortedEntries;
    }
    return [];
  });
}

// 승인버튼 클릭
export async function setOneState(adminId, fileId) {
  return get(child(dbRef, `admins/${adminId}/${fileId}/oneState`)).then(
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
        await set(ref(db, `admins/${adminId}/${fileId}/oneState`), newState);
        return newState;
      }
    },
  );
}

export async function getOneState(adminId, fileId) {
  return get(child(dbRef, `admins/${adminId}/${fileId}/oneState`)).then(
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

  const secondPath = ref(db, `admins/${userId}/${fileId}/reason`);

  await Promise.all([
    set(firstPath, reasonText),
    set(secondPath, reasonText)
  ]);

  return true;
}

// 반려사유 삭제하기
export async function removeRejectReason(fileId, userName, userId) {
  const firstPath = ref(db, `products/${fileId}/reason/${userName}`);

  const secondPath = ref(db, `admins/${userId}/${fileId}/reason`);

  await Promise.all([
     remove(firstPath),
     remove(secondPath)
  ]);
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
  return get(child(dbRef, `admins/${userId}/${fileId}/reason`)).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val()
    }
    return null;
  });
}

export async function setAdmit(fileId, userName) {
  return set(ref(db, `products/${fileId}/admitMember/${userName}`), true);
}



export async function removeAdmit(fileId, userName) {
  return remove(ref(db, `products/${fileId}/admitMember/${userName}`))
}

export async function getAllOneState() {
  const adminsRef = ref(db, 'admins'); // 'admins' 참조를 가져옵니다.
  const snapshot = await get(adminsRef);
  const data = snapshot.val();

  if (!data) {
    console.log('No matching documents found.');
    return [];
  }

  let oneStates = [];
  for (let userId in data) {
    for (let file in data[userId]) {
      oneStates.push({
        id: data[userId][file].id,
        state: data[userId][file].oneState
      });
    }
  }
  return oneStates;
}

