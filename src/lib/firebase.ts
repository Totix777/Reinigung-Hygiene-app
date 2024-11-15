import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCs0KFKjYNQOSDBIN1-bgnSXlIWzYtCmjo",
  authDomain: "drk-hausreinigung.firebaseapp.com",
  projectId: "drk-hausreinigung",
  storageBucket: "drk-hausreinigung.firebasestorage.app",
  messagingSenderId: "540652505626",
  appId: "1:540652505626:web:1f1515a8128dbb47e2dfa3",
  measurementId: "G-B01VEZGSKD"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);