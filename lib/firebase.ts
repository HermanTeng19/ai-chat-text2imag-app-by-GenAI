import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

/**
 * Firebase configuration, loaded from environment variables.
 */
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

/**
 * Initialize Firebase app (singleton).
 */
const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

/**
 * Firebase Auth instance.
 */
export const auth = getAuth(firebaseApp);

/**
 * Firestore database instance.
 */
export const db = getFirestore(firebaseApp);

/**
 * Firebase Storage instance.
 */
export const storage = getStorage(firebaseApp);

export default firebaseApp; 