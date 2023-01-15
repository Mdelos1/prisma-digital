import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDRcRYFpwWHG2aJBzI2umXngWFYnsxFu5w",
  authDomain: "prisma-dig.firebaseapp.com",
  projectId: "prisma-dig",
  storageBucket: "prisma-dig.appspot.com",
  messagingSenderId: "923215150647",
  appId: "1:923215150647:web:a3dd09bccca8e12116c9b2",
  measurementId: "G-7911T0ER8J"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getFirestore(app);
export const google = new GoogleAuthProvider();