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
  update,
} from 'firebase/database';
import {
  getStorage,
  ref as Ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';

import { v4 as uuid } from 'uuid';
import moment from 'moment';
import { sendKakaoCreateProduct, sendKakaoModifyProduct } from './kakao';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_ADMIN_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE,
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
      const isAdmin = Object.keys(users).some(
        (uid) => users[uid].role === '부서장&대표' && uid === user.uid,
      );
      const isMst = Object.keys(users).some(
        (uid) => users[uid].department === '경영지원팀' && uid === user.uid,
      );

      const userDepartment = users[user.uid]?.department;
      const userPhoneNum = users[user.uid]?.phoneNum;
      const userCorporation = users[user.uid]?.corporation;

      return {
        ...user,
        isAdmin,
        isMst,
        dept: userDepartment,
        phoneNum: userPhoneNum,
        corporation: userCorporation,
      };
    }
    return user;
  });
}

export async function addNewProduct(
  product,
  userName,
  userDept,
  userPhoneNum,
  userCorporation,
  downloadURL,
) {
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
    corporation: userCorporation,
    mstCheck: false,
    ...(downloadURL && { downloadURL: downloadURL }),
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
        const link = `https://seouliredsm.netlify.app/receive/detail/${id}`;
        const encodeLink = encodeURIComponent(link);
        const kakaoData = {
          name: userName,
          phoneNum: matchedUser.phoneNum,
          file: product.file,
          link: encodeLink,
        };

        await sendKakaoCreateProduct(kakaoData);
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
        return !(filterState && product.state !== filterState);
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
        if (a.date < b.date) return 1;
        if (a.date > b.date) return -1;
        return 0;
      });
    }
    return [];
  });
}

export async function updateProduct(
  product,
  userName,
  productID,
  updatedProduct,
) {
  const emails = product.agree;
  const usersRef = ref(db, 'userdata');
  const snapshot = await get(usersRef);

  if (snapshot.exists()) {
    const usersData = snapshot.val();

    await set(ref(db, `products/${product.id}`), updatedProduct).catch(
      console.error,
    );

    await Promise.all(
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
        const kakaoData = {
          writeName: userName,
          name: matchedUser.name,
          phoneNum: matchedUser.phoneNum,
          file: product.file,
          link: productID,
        };
        await sendKakaoModifyProduct(kakaoData);
      }),
    );
  }
}

export async function deleteProduct(productID) {
  const db = getDatabase();
  const productRef = ref(db, `products/${productID}`);
  const adminRef = ref(db, `admins/${productID}`);

  const productSnapshot = await get(productRef);
  if (productSnapshot.exists()) {
    const productData = productSnapshot.val();

    if (productData.downloadURL && Array.isArray(productData.downloadURL)) {
      const storage = getStorage();
      const promises = productData.downloadURL.map((file) => {
        const url = new URL(file.url);
        const fileRef = Ref(storage, url);

        return deleteObject(fileRef);
      });
      await Promise.all(promises);
    }
  }
  await Promise.all([remove(productRef), remove(adminRef)]);
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
    if (error.code === 'auth/email-already-in-use') {
      alert('이미 가입된 회원입니다.');
    }
    throw error;
  }
};

export async function setOneState(adminId, fileId, desiredState) {
  const validStates = ['대기', '승인', '반려'];

  if (!validStates.includes(desiredState)) {
    throw new Error('Invalid state provided');
  }

  const currentStateSnapshot = await get(
    child(dbRef, `admins/${fileId}/${adminId}/oneState`),
  );

  if (
    currentStateSnapshot.exists() &&
    currentStateSnapshot.val() === desiredState
  ) {
    return desiredState;
  }

  await set(ref(db, `admins/${fileId}/${adminId}/oneState`), desiredState);

  return desiredState;
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
  return get(child(dbRef, `userdata`)).then((snapshot) => {
    return snapshot.val();
  });
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
      Error(`No data found for product id: ${id}`);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export const handleMultipleFilesUpload = async (files) => {
  const storage = getStorage();
  const uploadPromises = [];

  files.forEach((file) => {
    const storageRef = Ref(storage, 'uploads/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    const uploadPromise = new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          console.log(error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            resolve({
              url: downloadURL,
              name: file.name,
            });
          });
        },
      );
    });
    uploadPromises.push(uploadPromise);
  });

  // Promise.all을 사용하여 모든 업로드 작업이 완료될 때까지 기다립니다.
  // 모든 프로미스가 해결되면, 각 파일에 대한 다운로드 URL과 파일명을 포함하는 객체의 배열이 반환됩니다.
  return Promise.all(uploadPromises);
};

export const handleFileDelete = async (productId, file, index) => {
  try {
    const storage = getStorage();
    const fileRef = Ref(storage, `uploads/${file.name}`); // 파일의 스토리지 경로를 지정합니다.
    await deleteObject(fileRef);

    // Realtime Database에서 제품 데이터 가져오기
    const db = getDatabase();
    const productRef = ref(db, 'products/' + productId);

    // 제품 데이터를 가져옵니다.
    const snapshot = await get(productRef);
    if (snapshot.exists()) {
      const productData = snapshot.val(); // 제품 데이터를 가져옵니다.

      const updatedDownloadURLs = productData.downloadURL || [];
      updatedDownloadURLs.splice(index, 1); // 배열에서 해당 요소를 제거합니다.

      await update(productRef, { downloadURL: updatedDownloadURLs });
    } else {
      console.log('No such product!');
    }
  } catch (error) {
    console.error('Error removing file: ', error);
  }
};

export async function updateProductDownloadURLs(productId, newFileURLs) {
  try {
    const productRef = ref(db, 'products/' + productId);

    await update(productRef, {
      downloadURL: newFileURLs,
    });

    console.log('File URLs updated with new files only.');
    return newFileURLs;
  } catch (error) {
    console.error('An error occurred while updating file URLs:', error);
    throw error;
  }
}

export async function updateMstCheckInFirebase(productId, checkStatus) {
	const db = getDatabase();
	const productRef = ref(db, 'products/' + productId);

	const updates = {
		mstCheck: checkStatus
	};
	await update(productRef, updates)
	.then(() => {
		console.log("mstCheck updated successfully!");
	})
	.catch((error) => {
		console.error("Error updating mstCheck: ", error);
	});
}


