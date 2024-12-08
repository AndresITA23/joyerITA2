import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCHzZQ2SmPzu19OCK_kdP1JvodXKvVWx7Q",
  authDomain: "joyerita-5319e.firebaseapp.com",
  projectId: "joyerita-5319e",
  storageBucket: "joyerita-5319e.firebasestorage.app",
  messagingSenderId: "965239048987",
  appId: "1:965239048987:web:b78b0d1c10aff088d021be",
  measurementId: "G-VBVF1W6P0H"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app); 

export const storage = getStorage(app);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});