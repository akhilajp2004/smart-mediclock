import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD3YyvJ1CsgHQJ-h6s9F08cjrHA4lRH8bs",
  authDomain: "smart-mediclock.firebaseapp.com",
  projectId: "smart-mediclock",
  storageBucket: "smart-mediclock.firebasestorage.app",
  messagingSenderId: "323854227735",
  appId: "1:323854227735:web:ebfc932242a31249dbbf52"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);