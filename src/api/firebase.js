import {initializeApp} from 'firebase/app';
import {
	getAuth,
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithPopup,
	signOut,
} from 'firebase/auth';
import {child, get, getDatabase, ref, set, remove} from 'firebase/database';
import {v4 as uuid} from 'uuid';

const firebaseConfig = {
	apiKey     : process.env.REACT_APP_FIREBASE_KEY,
	authDomain : process.env.REACT_APP_ADMIN_DOMAIN,
	databaseURL: process.env.REACT_APP_DATABASE_URL,
	projectId  : process.env.REACT_APP_PROJECT_ID,
};


initializeApp(firebaseConfig);
const auth = getAuth();
// const dbRef = ref(getDatabase());
const provider = new GoogleAuthProvider();

// const db = getDatabase();

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