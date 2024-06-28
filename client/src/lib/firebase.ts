import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB19OdlJyEpyijrIUj5HXam3OvO5f-OGOU",
  authDomain: "supergear-977db.firebaseapp.com",
  projectId: "supergear-977db",
  storageBucket: "supergear-977db.appspot.com",
  messagingSenderId: "526716172346",
  appId: "1:526716172346:web:9772a672fde98644a15d03",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
