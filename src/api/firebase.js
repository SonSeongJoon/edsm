import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { child, get, getDatabase, ref, set } from 'firebase/database';
import { v4 as uuid } from 'uuid';
import moment from 'moment';

const firebaseConfig = {
	apiKey     : process.env.REACT_APP_FIREBASE_KEY,
	authDomain : process.env.REACT_APP_ADMIN_DOMAIN,
	databaseURL: process.env.REACT_APP_DATABASE_URL,
	projectId  : process.env.REACT_APP_PROJECT_ID,
};


initializeApp(firebaseConfig);
const auth = getAuth();
const dbRef = ref(getDatabase());
const provider = new GoogleAuthProvider();
const db = getDatabase();

export function login() {
	 signInWithPopup(auth, provider).catch(console.error)
}

export function logout() {
	return signOut(auth).catch(console.error);
}

export function onUserStateChange(callback) {
	onAuthStateChanged(auth, (user) => {
		callback(user)
	});
}

export async function addNewProduct(product) {
	const userId = auth.currentUser?.uid;
	if (!userId) {
		throw new Error("User is not authenticated");
	}

	const id = uuid();
	let now = moment();
	let dateTime = now.format("YY.MM.DD | HH:mm");

	return set(ref(db, `products/${id}`), {
		...product,
		id,
		userId,
		date: dateTime,
		state: '대기',
	});
}


export async function getProduct(filterState) {
	const userId = auth.currentUser?.uid;
	if (!userId) {
		throw new Error("User is not authenticated");
	}

	return get(child(dbRef, 'products')).then(snapshot => {
		if(snapshot.exists()) {
			const allProducts = Object.values(snapshot.val());
			const filteredProducts = allProducts.filter(product => {
				// userId가 일치하는지 확인
				if (product.userId !== userId) return false;

				// filterState 값이 주어졌을 때만 state를 확인
				if (filterState && product.state !== filterState) return false;

				return true;
			});

			// 시간 순으로 정렬 (최신 데이터가 맨 위로)
			return filteredProducts.sort((a, b) => {
				if (a.date < b.date) return 1;
				if (a.date > b.date) return -1;
				return 0;
			});
		}
		return [];
	})
}

export async function updateProduct(product, updatedProduct) {
	return set(ref(db, `products/${product.id}`), updatedProduct)
	.then(() => {
		console.log('성공적으로 수정되었습니다.')
	}).catch(console.error);
}

export async function yourFirebaseFunctionToGetProduct(productId) {
	return get(child(dbRef, `products/${productId}`))
	.then(snapshot => {
		return snapshot.val();
	}).catch("dfdfdfdfdfdf"+console.error);
}



