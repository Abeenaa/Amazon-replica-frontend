// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// ←←← YOUR CONFIG (already correct)
const firebaseConfig = {
  apiKey: "AIzaSyAjn6DjEJAxLiHIrGkoDjjiYz1nr9qRe-o",
  authDomain: "clone-a11e1.firebaseapp.com",
  projectId: "clone-a11e1",
  storageBucket: "clone-a11e1.firebasestorage.app",
  messagingSenderId: "870885626044",
  appId: "1:870885626044:web:d79741e938e698a3fbc0b9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ←←← THIS FIXES "api-key-not-valid" during development
// Remove or comment out this line when you deploy to production
if (window.location.hostname === "localhost") {
  window.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
}

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
