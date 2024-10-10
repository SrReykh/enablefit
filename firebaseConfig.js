import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth/web-extension";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "enablefit.firebaseapp.com",
  projectId: "enablefit",
  storageBucket: "enablefit.appspot.com",
  messagingSenderId: "963348939326",
  appId: "1:963348939326:web:1cc4a52a72b926e20ec76f",
  measurementId: "G-7Y7GM6TDHN",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const db = getFirestore(FIREBASE_APP);
