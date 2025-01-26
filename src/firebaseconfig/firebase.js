import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAN1JZr9ZrZtWV6_R5jsnUiIoShPV426yk",
  authDomain: "uci-hack25.firebaseapp.com",
  projectId: "uci-hack25",
  storageBucket: "uci-hack25.firebasestorage.app",
  messagingSenderId: "507537724384",
  appId: "1:507537724384:web:406121b9b685ffe7f59185",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);