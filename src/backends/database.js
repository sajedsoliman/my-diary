import firebase from "firebase";
import "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyAXGq7ouu_hN15awOpBk9apn-TgnYfLvbs",
	authDomain: "mydiary-3fb9b.firebaseapp.com",
	projectId: "mydiary-3fb9b",
	storageBucket: "mydiary-3fb9b.appspot.com",
	messagingSenderId: "518382843249",
	appId: "1:518382843249:web:8caa78037d4d46128a72d0",
};

let firebaseInit;
if (!firebase.apps.length) {
	firebaseInit = firebase.initializeApp(firebaseConfig);
} else {
	firebaseInit = firebase.app();
}

const db = firebaseInit.firestore();

const auth = firebase.auth();

const storage = firebase.storage();

export { db, auth, storage, firebase };
