import { getApp, getApps, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAiBWiE63-pMVDlTZv8WGi5Hy3rS87dp4M",
  authDomain: "interviewcoach-e4139.firebaseapp.com",
  projectId: "interviewcoach-e4139",
  storageBucket: "interviewcoach-e4139.firebasestorage.app",
  messagingSenderId: "516811478349",
  appId: "1:516811478349:web:96a74be0d7e9ea0acc9304",
  measurementId: "G-E4MWGZ0T5P"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);