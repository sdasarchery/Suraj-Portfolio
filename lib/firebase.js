import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyAiLKOQjF_rEgZO53HuBl9lF932VjoNtk0",
  authDomain: "surajnalamblog.firebaseapp.com",
  projectId: "surajnalamblog",
  storageBucket: "surajnalamblog.firebasestorage.app",
  messagingSenderId: "621053916534",
  appId: "1:621053916534:web:50fe3b0041da9a75c47657",
    //measurementId: "G-SX2J4MZENK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
export const storage = getStorage(app);

// Initialize Firestore
export const firestore = getFirestore(app);

export default app;