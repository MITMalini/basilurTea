// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLtxYFv2JiL4Grh2Nk1O3stxeUO1-11rU",
  authDomain: "basilur-tea.firebaseapp.com",
  projectId: "basilur-tea",
  storageBucket: "basilur-tea.appspot.com",
  messagingSenderId: "298107594097",
  appId: "1:298107594097:web:72d343757d12f4e38c42d0",
  measurementId: "G-T84WZCFZZV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export {
    auth,
    db,
    analytics
  };