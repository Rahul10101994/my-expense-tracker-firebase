// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyIrC1zZx716NGAQxrqRyY_inbNA2XD-M",
  authDomain: "studio-1297545116-fb1b2.firebaseapp.com",
  projectId: "studio-1297545116-fb1b2",
  storageBucket: "studio-1297545116-fb1b2.firebasestorage.app",
  messagingSenderId: "448796633714",
  appId: "1:448796633714:web:cfc521239077757d1f30eb"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };
