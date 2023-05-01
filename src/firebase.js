// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyD1Q9Pr61pvg3lXZZA9atuNlC3z2xI2Hl8",
    authDomain: "chatbox-9ae4f.firebaseapp.com",
    projectId: "chatbox-9ae4f",
    storageBucket: "chatbox-9ae4f.appspot.com",
    messagingSenderId: "733837034096",
    appId: "1:733837034096:web:6b1502a77e509f55902ab5",
    measurementId: "G-HBCHEN7C7P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);