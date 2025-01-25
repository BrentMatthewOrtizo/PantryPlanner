// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Optional if you need Firestore later

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAN1JZr9ZrZtWV6_R5jsnUiIoShPV426yk",
  authDomain: "uci-hack25.firebaseapp.com",
  projectId: "uci-hack25",
  storageBucket: "uci-hack25.firebasestorage.app",
  messagingSenderId: "507537724384",
  appId: "1:507537724384:web:406121b9b685ffe7f59185",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app); // Optional