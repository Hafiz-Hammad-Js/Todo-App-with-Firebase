import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,onAuthStateChanged,signOut,GoogleAuthProvider,signInWithPopup    } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getFirestore, doc, setDoc, addDoc, collection ,getDocs,query,where,updateDoc,deleteDoc} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js"

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAnFVyqpkv9WsMdOoVSVq1sF5Z-aa1zPE0",
  authDomain: "todo-app-4984f.firebaseapp.com",
  projectId: "todo-app-4984f",
  storageBucket: "todo-app-4984f.firebasestorage.app",
  messagingSenderId: "351218491379",
  appId: "1:351218491379:web:5084b28e29a7c917e67c86",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export {
  createUserWithEmailAndPassword,
  auth,
  doc,
  setDoc,
  db,
  signInWithEmailAndPassword,
  addDoc, 
  collection,
  getDocs,
  query,
  where,
  onAuthStateChanged,
  signOut,
  updateDoc,
  deleteDoc,
  GoogleAuthProvider,
  provider,
  signInWithPopup
};
