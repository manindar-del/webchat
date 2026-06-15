// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyAXa0R0_N4n_ObMlFjgueT7mcup-1Sqh20",
  authDomain: "kolkata-ai.firebaseapp.com",
  databaseURL: "https://kolkata-ai-default-rtdb.firebaseio.com",
  projectId: "kolkata-ai",
  storageBucket: "kolkata-ai.firebasestorage.app",
  messagingSenderId: "930150133754",
  appId: "1:930150133754:web:62cba971feae2c4e85fe43",
  measurementId: "G-YDFYCVZQ4N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
