
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAtyKeedoktUDS9Ddb-CV_91xwS-jeVduk",
  authDomain: "cars-8b439.firebaseapp.com",
  projectId: "cars-8b439",
  storageBucket: "cars-8b439.firebasestorage.app",
  messagingSenderId: "895391657212",
  appId: "1:895391657212:web:d57ff33c81b99d67573b79"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };