import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAqY7v9nFTTjGtwmwWmqspFnZuu94E0Gsk",
  authDomain: "react-todo-auth-601c0.firebaseapp.com",
  databaseURL: "https://react-todo-auth-601c0-default-rtdb.firebaseio.com/",
  projectId: "react-todo-auth-601c0",
  storageBucket: "react-todo-auth-601c0.appspot.com",
  messagingSenderId: "962297568186",
  appId: "1:962297568186:web:089b558b0e726406ff1b83",
  measurementId: "G-8LF8K52SNH"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth();
export const google = new GoogleAuthProvider();


