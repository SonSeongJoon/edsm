import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import {
  child,
  get,
  getDatabase,
  ref,
  set,
  remove,
  equalTo,
  query,
  orderByChild,
} from 'firebase/database';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import {} from 'firebase/database'; // 필요한 함수와 변수들을 import 해야 합니다.

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
  const usersQuery = query(child(dbRef, 'userdata'), orderByChild('role'), equalTo('부서장&대표'));

  return get(usersQuery).then((snapshot) => {
    if (snapshot.exists()) {
      const users = snapshot.val();
      const isAdmin = Object.keys(users).includes(user.uid);
      return { ...user, isAdmin };
    }
    return user;
  });
}

export async function addNewProduct(product) {
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
        console.log("Matched User ID:", matchedUserId);
        await set(ref(db, `admins/${matchedUserId}/${id}`), {
          fileId: id,
          oneState: '대기',
          data: {
            ...product,
          },
        });
      } else {
        console.log("No matching user found for email:", email);
      }
    });
  } else {
    console.log("No users found in the database.");
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
  const userId = auth.currentUser?.uid;
}