// Import Firebase SDK
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5mQxIHNn9k3GwQZjz1x2ByXvfSe057tA",
  authDomain: "aiims01.firebaseapp.com",
  projectId: "aiims01",
  storageBucket: "aiims01.firebasestorage.app",
  messagingSenderId: "717625305470",
  appId: "1:717625305470:web:c51a122901881af91feb2f",
  measurementId: "G-JVEGM2KPXQ",
};

// Initialize Firebase
const FIREBASE_APP = initializeApp(firebaseConfig);
const FIREBASE_AUTH = getAuth(FIREBASE_APP);
const FIREBASE_DB = getFirestore(FIREBASE_APP);

// Export everything needed for authentication
export {
  FIREBASE_APP,
  FIREBASE_AUTH,
  FIREBASE_DB,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
};
