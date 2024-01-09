import {initializeApp} from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import {
  child,
  equalTo,
  get,
  getDatabase,
  limitToLast,
  orderByChild,
  query,
  ref,
  remove,
  set,
  update,
} from 'firebase/database';
import {deleteObject, getDownloadURL, getStorage, ref as Ref, uploadBytesResumable} from 'firebase/storage';

import {v4 as uuid} from 'uuid';
import moment from 'moment';
import {sendKakaoCreateProduct, sendKakaoModifyProduct} from './kakao';

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
      const isAdmin = Object.keys(users).some((uid) => users[uid].role === '부서장&대표' && uid === user.uid);
      const isMst = Object.keys(users).some((uid) => users[uid].department === '경영지원팀' && uid === user.uid);

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

// 해결
export async function addNewProduct(
   product,
   userName,
   userDept,
   userPhoneNum,
   userCorporation,
   downloadURL,
   referenceList,
) {
  const userId = auth.currentUser?.uid;
  if (!userId) {
    throw new Error('User is not authenticated');
  }

  try {
    const id = uuid();
    const now = moment();
    const dateTime = now.format('YY.MM.DD | HH:mm');
    const timestamp = now.valueOf();
    const yearMonth = now.format('YYMM');

    // Create common product data
    const commonProductData = {
      ...product,
      id,
      userId,
      date: dateTime,
      state: '대기',
      displayName: userName,
      dept: userDept,
      writerPhoneNum: userPhoneNum,
      corporation: userCorporation,
      timestamp: timestamp,
      yearMonth: yearMonth,
      mstCheck: '미확인',
      referenceList: referenceList,
      ...(downloadURL && { downloadURL: downloadURL }),
    };

    // Save product data to products and newProducts
    const productRef = set(ref(db, `products/${id}`), commonProductData);
    const newProductRef = set(ref(db, `newProducts/${userId}/${id}`), commonProductData);

    const usersRef = ref(db, 'userdata');
    const snapshot = await get(usersRef);

    if (snapshot.exists()) {
      const usersData = snapshot.val();
      const referenceUserIds = referenceList.map((userInfo) => userInfo.id);
      const emails = product.agree;

      // Save reference users
      const referenceTasks = referenceUserIds.map(async (uid) => {
        const matchedUser = {
          matchedUserId: uid,
          name: usersData[uid].name,
          phoneNum: usersData[uid].phoneNum,
        };
        if (matchedUser.matchedUserId && referenceUserIds.includes(uid)) {
          return set(ref(db, `referenced/${uid}/${id}`), {
            id,
            ...product,
            oneState: '참조',
            date: dateTime,
            writeUser: userId,
            writeName: matchedUser.name,
            yearMonth: yearMonth,

          });
        }
      });

      // Handle email tasks
      const emailTasks = emails.map(async (email) => {
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
          const adminTask = set(ref(db, `new_admin/${matchedUser.matchedUserId}/${id}`), {
            id,
            oneState: '대기',
            date: dateTime,
            writeUser: userId,
            ...product,
            isAdmin: true,
            displayName: userName,
            admitName: matchedUser.name,
            yearMonth: yearMonth,

          });

          const link = `https://seouliredsm.netlify.app/receive/detail/${id}`;
          const encodeLink = encodeURIComponent(link);
          const kakaoData = {
            name: userName,
            phoneNum: matchedUser.phoneNum,
            file: product.file,
            link: encodeLink,
          };

          const kakaoTask = sendKakaoCreateProduct(kakaoData);

          return Promise.all([adminTask, kakaoTask]);
        } else {
          console.log('No matching user found for email:', email);
        }
      });

      // Wait for all tasks to complete
      await Promise.all([productRef, newProductRef, ...referenceTasks, ...emailTasks]);
    } else {
      console.log('No users found in the database.');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}


// 해결
export async function getProduct(filterState, yearMonth) {
  const userId = auth.currentUser?.uid;
  if (!userId) {
    throw new Error('User is not authenticated');
  }

  const db = getDatabase();

  const userProductsRef = child(ref(db), `newProducts/${userId}`);
  const referencedProductsRef = child(ref(db), `referenced/${userId}`);

  const userProductsQuery = query(userProductsRef, orderByChild('yearMonth'), equalTo(yearMonth));
  const referencedProductsQuery = query(referencedProductsRef, orderByChild('yearMonth'), equalTo(yearMonth));

  const [userProductsSnapshot, referencedProductsSnapshot] = await Promise.all([
    get(userProductsQuery),
    get(referencedProductsQuery),
  ]);

  let allProducts = [];

  if (userProductsSnapshot.exists()) {
    allProducts.push(...Object.values(userProductsSnapshot.val()));
  }

  if (referencedProductsSnapshot.exists()) {
    allProducts.push(...Object.values(referencedProductsSnapshot.val()));
  }

  const filteredProducts = allProducts.filter((product) => {
    return !filterState || product.state === filterState;
  });

  return filteredProducts.sort((a, b) => {
    if (a.date < b.date) return 1;
    if (a.date > b.date) return -1;
    return 0;
  });
}



// 해결
export async function getReceive(adminId, yearMonth) {
  const newAdminRef = ref(db, `new_admin/${adminId}`);
  const queryRef = query(newAdminRef, orderByChild('yearMonth'), equalTo(yearMonth));
  const snapshot = await get(queryRef);

  if (!snapshot.exists()) {
    console.log('No data found for the given yearMonth.');
    return [];
  }

  const adminsData = snapshot.val();
  let userEntries = [];

  for (let fileId in adminsData) {
    const userData = adminsData[fileId];

    userEntries.push({
      ...userData,
      fileId: fileId,
    });
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



//해결
export async function getAll(state, yearMonth) {
  const db = getDatabase();
  const productsRef = ref(db, 'products');
  let dataQuery;

  if (state === 'all') {
    console.log(yearMonth);
    dataQuery = query(productsRef, orderByChild('yearMonth'), equalTo(`${yearMonth}`));
  } else {
    dataQuery = query(productsRef, orderByChild('timestamp'), limitToLast(20));
  }

  // 데이터 쿼리 실행
  const snapshot = await get(dataQuery);

  if (snapshot.exists()) {
    let allEntries = snapshot.val();

    if (state === 'verified') {
      allEntries = Object.values(allEntries).filter((entry) => entry.mstCheck === '확인');
    } else if (state === 'unverified') {
      allEntries = Object.values(allEntries).filter((entry) => entry.mstCheck === '미확인');
    }

    // all 상태일 때도 포함하여 정렬
    return Object.values(allEntries).sort((a, b) => {
      if (a.date < b.date) return 1;
      if (a.date > b.date) return -1;
      return 0;
    });
  }

  return [];
}

//해결
export async function updateProduct(product, userName, productID, updatedProduct) {
  const userId = auth.currentUser?.uid;
  if (!userId) {
    throw new Error('User is not authenticated');
  }
  const emails = product.agree;
  const usersRef = ref(db, 'userdata');
  const snapshot = await get(usersRef);

  if (snapshot.exists()) {
    const usersData = snapshot.val();

    // Update the product in both 'products' and 'newProducts' paths
    const productRef = ref(db, `products/${product.id}`);
    const newProductRef = ref(db, `newProducts/${userId}/${product.id}`);

    await set(productRef, updatedProduct).catch(console.error);
    await set(newProductRef, updatedProduct).catch(console.error);

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


//해결
export async function deleteProduct(productID) {
  const db = getDatabase();
  const productRef = ref(db, `products/${productID}`);
  const newProductSnapshot = await get(productRef);

  if (newProductSnapshot.exists()) {
    const productData = newProductSnapshot.val();
    const userId = productData.userId;
    const uidList = productData.agreeUid;

    const newProductRef = ref(db, `newProducts/${userId}/${productID}`);

    const referencedDeleteTasks = productData.referenceList?.map(({ id }) => {
      const referencedProductRef = ref(db, `referenced/${id}/${productID}`);
      return remove(referencedProductRef);
    }) || [];

    const storageDeleteTasks = productData.downloadURL?.map((file) => {
      if (file && file.url) {
        const url = new URL(file.url);
        const fileRef = Ref(getStorage(), url.pathname);
        return deleteObject(fileRef);
      }
      return null;
    }).filter(task => task !== null) || [];

    await Promise.all(
       uidList.map(async (uid) => {
         const newAdminProductRef = ref(db, `new_admin/${uid}/${productID}`);
         await remove(newAdminProductRef);
       })
    );

    await Promise.all([
      remove(productRef),
      remove(newProductRef),
      ...referencedDeleteTasks,
      ...storageDeleteTasks
    ]);
  } else {
    console.log('No product found with the given ID:', productID);
  }
}






//Email 회원가입
export const signupEmail = async (formData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
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

  // new_admin 경로에서 현재 상태 가져오기
  const currentStateSnapshot = await get(ref(db, `new_admin/${adminId}/${fileId}/oneState`));

  if (currentStateSnapshot.exists() && currentStateSnapshot.val() === desiredState) {
    return desiredState; // 상태가 이미 원하는 상태와 일치하는 경우 바로 반환
  }

  // new_admin 경로에 상태 업데이트
  await set(ref(db, `new_admin/${adminId}/${fileId}/oneState`), desiredState);

  return desiredState;
}


export async function getOneState(adminId, fileId) {
  return get(ref(db, `new_admin/${adminId}/${fileId}/oneState`)).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log('No state found for the given adminId and fileId');
      return null;
    }
  });
}


// 반려사유등록하기
export async function setRejectReason(fileId, reasonText, userName, userId) {
  // 첫 번째 경로에 저장 (products)
  const firstPath = ref(db, `products/${fileId}/reason/${userName}`);

  // 두 번째 경로에 저장 (new_admin)
  const secondPath = ref(db, `new_admin/${userId}/${fileId}/reason`);

  await Promise.all([set(firstPath, reasonText), set(secondPath, reasonText)]);

  return true;
}


// 반려사유 삭제하기
export async function removeRejectReason(fileId, userName, userId) {
  const firstPath = ref(db, `products/${fileId}/reason/${userName}`);

  const secondPath = ref(db, `new_admin/${userId}/${fileId}/reason`);

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
  return get(ref(db, `new_admin/${userId}/${fileId}/reason`)).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val();
    }
    return null; // 거절 사유가 없는 경우 null 반환
  });
}


export async function setAdmit(fileId, userName) {
  return set(ref(db, `products/${fileId}/admitMember/${userName}`), true);
}

export async function removeAdmit(fileId, userName) {
  return remove(ref(db, `products/${fileId}/admitMember/${userName}`));
}

export async function getAllOneState(fileId) {
  const newAdminRef = ref(db, `new_admin`);
  const snapshot = await get(newAdminRef);
  const allAdminsData = snapshot.val();

  if (!allAdminsData) {
    console.log('No matching documents found.');
    return [];
  }

  let oneStates = [];
  for (let userId in allAdminsData) {
    if (allAdminsData[userId][fileId]) {
      oneStates.push({
        id: allAdminsData[userId][fileId].id,
        state: allAdminsData[userId][fileId].oneState,
        name: allAdminsData[userId][fileId].admitName,
      });
    }
  }
  return oneStates;
}


//해결
export async function setState(fileId, state, userId) {
  try {
    await set(ref(db, `products/${fileId}/state`), state);

    if (!userId) {
      Error('User is not authenticated');
    }
    await set(ref(db, `newProducts/${userId}/${fileId}/state`), state);

    console.log('State updated successfully');
  } catch (error) {
    console.error('Error updating state: ', error);
  }
}

export async function getUsersData() {
  return get(child(dbRef, `userdata`)).then((snapshot) => {
    return snapshot.val();
  });
}

// 해결
export async function getData(id) {
  const db = getDatabase();
  const productRef = ref(db, `products/${id}`);

  try {
    const snapshot = await get(productRef);
    if(snapshot.exists()) {
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
           const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
           console.log('Upload is ' + progress + '% done');
           if (progress === 100) {
             console.log('Upload of ' + file.name + ' is complete.');
           }
         },
         (error) => {
           console.error('Upload failed for ' + file.name + ':', error);
           alert('Upload failed for ' + file.name + ': ' + error.message);
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

  return Promise.all(uploadPromises);
};


// 해결
export const handleFileDelete = async (productId, file, index, userId) => {
  try {
    const storage = getStorage();
    const fileRef = Ref(storage, `uploads/${file.name}`); // 파일의 스토리지 경로를 지정합니다.
    await deleteObject(fileRef);

    // Realtime Database에서 제품 데이터 가져오기
    const db = getDatabase();
    const oldProductRef = ref(db, 'products/' + productId);
    const newProductRef = ref(db, `newProducts/${userId}/${productId}`);

    // 기존 products 경로에서 제품 데이터 업데이트
    const oldSnapshot = await get(oldProductRef);
    if (oldSnapshot.exists()) {
      const oldProductData = oldSnapshot.val();
      const updatedOldDownloadURLs = oldProductData.downloadURL || [];
      updatedOldDownloadURLs.splice(index, 1);
      await update(oldProductRef, { downloadURL: updatedOldDownloadURLs });
    } else {
      console.log('No such product in old path!');
    }

    // newProducts 경로에서 제품 데이터 업데이트
    const newSnapshot = await get(newProductRef);
    if (newSnapshot.exists()) {
      const newProductData = newSnapshot.val();
      const updatedNewDownloadURLs = newProductData.downloadURL || [];
      updatedNewDownloadURLs.splice(index, 1);
      await update(newProductRef, { downloadURL: updatedNewDownloadURLs });
    } else {
      console.log('No such product in new path!');
    }
  } catch (error) {
    console.error('Error removing file: ', error);
  }
};

export async function updateProductDownloadURLs(productId, newFileURLs, userId) {
  try {
    const db = getDatabase();
    const oldProductRef = ref(db, 'products/' + productId);
    const newProductRef = ref(db, `newProducts/${userId}/${productId}`);

    await update(oldProductRef, {
      downloadURL: newFileURLs,
    });

    await update(newProductRef, {
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

  const statusString = checkStatus ? '확인' : '미확인';

  const updates = {
    mstCheck: statusString,
  };

  await update(productRef, updates)
    .then(() => {
      console.log('mstCheck updated successfully!');
    })
    .catch((error) => {
      console.error('Error updating mstCheck: ', error);
    });
}

// 해결
export async function getPersonalData(userId) {
  const db = getDatabase();
  const userProductsRef = ref(db, `newProducts/${userId}`);
  const snapshot = await get(userProductsRef);

  if (snapshot.exists()) {
    const userEntries = snapshot.val();

    return Object.values(userEntries).map((entry) => entry.state);
  } else {
    console.warn('No data found for userId:', userId);
    return null;
  }
}

// 해결
export async function getPersonalReceive(adminId) {
  const newAdminsRef = ref(db, `new_admin/${adminId}`);
  const snapshot = await get(newAdminsRef);

  if (!snapshot.exists()) {
    console.log('No data found for adminId:', adminId);
    return [];
  }

  const adminData = snapshot.val();
  let userEntries = [];

  for (let fileId in adminData) {
    const userData = adminData[fileId];

    if (userData) {
      const productSnapshot = await get(ref(db, `newProducts/${adminId}/${fileId}`));
      if (productSnapshot.exists()) {
        const productData = productSnapshot.val();
        userEntries.push({
          ...userData,
          ...productData,
          fileId: fileId,
        });
      }
    }
  }

  return userEntries.map((entry) => entry.state);
}


export function resetPassword(email) {
  const auth = getAuth();

  return sendPasswordResetEmail(auth, email);
}

export async function isUserValid(email, inputName) {
  const usersRef = ref(db, 'userdata');

  const snapshot = await get(usersRef);

  if (snapshot.exists()) {
    const users = snapshot.val();
    for (const userId in users) {
      const userData = users[userId];
      if (userData.email === email && userData.name === inputName) {
        return true;
      }
    }
  }
  return false;
}

export async function getUsersName() {
  return get(child(dbRef, `userdata`)).then((snapshot) => {
    const allUsersData = snapshot.val();
    const usersInfo = [];

    for (let userId in allUsersData) {
      usersInfo.push({
        name: allUsersData[userId].name,
        id: userId,
      });
    }

    return usersInfo;
  });
}

export async function setAllStatesToWaiting(fileId) {
  const userId = auth.currentUser?.uid;
  const newAdminRef = ref(db, `new_admin`);

  try {
    const newAdminSnapshot = await get(newAdminRef);

    if (!newAdminSnapshot.exists()) {
      console.log('No matching documents found.');
      return;
    }

    const updates = {};
    newAdminSnapshot.forEach((userSnapshot) => {
      userSnapshot.forEach((fileSnapshot) => {
        if (fileSnapshot.key === fileId) {
          updates[`new_admin/${userSnapshot.key}/${fileId}/oneState`] = '대기';
        }
      });
    });

    await update(ref(db), updates);
    await setState(fileId, '대기', userId);
    console.log('모든 상태를 "대기"로 업데이트했습니다.');
  } catch (error) {
    console.error('상태 업데이트 중 오류 발생:', error);
  }
}


export async function reorganizeAdminData() {
  const db = getDatabase();
  const adminsRef = ref(db, 'admins');
  const newAdminsRef = ref(db, 'new_admin');

  try {
    const snapshot = await get(adminsRef);

    if (!snapshot.exists()) {
      console.log('No admins data found.');
      return;
    }

    const adminsData = snapshot.val();
    const newAdminsData = {};

    for (const id in adminsData) {
      for (const matchedUserId in adminsData[id]) {
        const userData = adminsData[id][matchedUserId];

        if (!newAdminsData[matchedUserId]) {
          newAdminsData[matchedUserId] = {};
        }

        // Copy data under the matchedUserId
        newAdminsData[matchedUserId][id] = userData;
      }
    }

    // Save the reorganized data to new_admin
    await set(newAdminsRef, newAdminsData);
    console.log('Admin data reorganized successfully.');
  } catch (error) {
    console.error('Error reorganizing admin data:', error);
    throw error;
  }
}

export async function getAllDataForUser(userId) {
  const db = getDatabase();
  const productsRef = ref(db, `newProducts/${userId}`);

  try {
    const queryRef = query(productsRef, orderByChild('file'), equalTo('휴가계'));
    const snapshot = await get(queryRef);

    if (snapshot.exists()) {
      const data = snapshot.val();
      const sortedData = Object.values(data).sort((a, b) => b.timestamp - a.timestamp);
      const latestData = sortedData[0];
      const useDays = latestData.UsedDays
      const totalDaysDifference = latestData.Vacations.reduce((total, vacation) => {
        return total + parseFloat(vacation.daysDifference || 0);
      }, 0);
      return parseFloat(useDays) + totalDaysDifference;
    } else {
      console.log(`No data found for userId: ${userId}`);
      return null;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}






