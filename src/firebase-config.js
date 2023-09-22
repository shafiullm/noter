// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALssnoPeveE7TbTMrlxCTdB86UYtuWMug",
  authDomain: "noter-deb3b.firebaseapp.com",
  projectId: "noter-deb3b",
  storageBucket: "noter-deb3b.appspot.com",
  messagingSenderId: "45855403130",
  appId: "1:45855403130:web:a57e6b9615f2f59f02dfc3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Authentication and Export
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
