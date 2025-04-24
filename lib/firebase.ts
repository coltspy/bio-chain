import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

/*
// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};
*/
const firebaseConfig = {
  apiKey: "AIzaSyDD2hqPNFJ7duzBLw-Ea0d-JLgGwOqo08s",
  authDomain: "bio-chain.firebaseapp.com",
  projectId: "bio-chain",
  storageBucket: "bio-chain.firebasestorage.app",
  messagingSenderId: "260700679379",
  appId: "1:260700679379:web:f60dcf4026059e66ef3826",
  measurementId: "G-WK82TZT5QS"
};
let app;
let db;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

db = getFirestore(app);

export { db };