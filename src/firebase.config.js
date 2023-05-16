import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCbr_R3haMBodHHsEk94AjRoJqpvaXhb-Y",
  authDomain: "learnalanguage-63443.firebaseapp.com",
  projectId: "learnalanguage-63443",
  storageBucket: "learnalanguage-63443.appspot.com",
  databaseURL: "https://learnalanguage-63443.firebaseio.com",
  messagingSenderId: "981225542967",
  appId: "1:981225542967:web:1bb78cd325f32ec870f6b2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();

connectFirestoreEmulator(db, "127.0.0.1", 8080);
