// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  collection,
  getFirestore,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import { string } from "zod";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvKLRkWANjUnbS8ZfGnW_JuCpYfid5rFE",
  authDomain: "barbearia-rs.firebaseapp.com",
  projectId: "barbearia-rs",
  storageBucket: "barbearia-rs.appspot.com",
  messagingSenderId: "212413521284",
  appId: "1:212413521284:web:77d263160c5c84cc4e91d1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
