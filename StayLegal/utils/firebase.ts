// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmduvBtbGCTkhtL7i-APqgPZ8KoZf-Nto",
  authDomain: "staylegal-1234.firebaseapp.com",
  projectId: "staylegal-1234",
  storageBucket: "staylegal-1234.firebasestorage.app",
  messagingSenderId: "934187101967",
  appId: "1:934187101967:web:c715844185a0ca0c84587a",
  measurementId: "G-CMZES9T4TL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ✅ Initialise l'authentification
export const auth = getAuth(app);