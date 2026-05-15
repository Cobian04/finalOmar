import { initializeApp, getApps } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInAnonymously,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import {
  addDoc,
  collection,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID
};

export const firebaseReady = Object.values(firebaseConfig).every(Boolean);

const app = firebaseReady ? getApps()[0] || initializeApp(firebaseConfig) : null;

export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;

export function onAuthChange(callback) {
  if (!auth) return () => {};
  return onAuthStateChanged(auth, callback);
}

export function loginAnonymous() {
  return signInAnonymously(auth);
}

export function loginWithEmail(email, password) {
  return signInWithEmailAndPassword(auth, email.trim(), password);
}

export function registerWithEmail(email, password) {
  return createUserWithEmailAndPassword(auth, email.trim(), password);
}

export function logout() {
  return signOut(auth);
}

export function subscribeOrderedCollection(collectionName, fallback, callback) {
  if (!db) {
    callback(fallback);
    return () => {};
  }

  const q = query(collection(db, collectionName), orderBy("createdAt", "desc"), limit(30));
  return onSnapshot(
    q,
    (snapshot) => {
      const rows = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      callback(rows.length ? rows : fallback);
    },
    () => callback(fallback)
  );
}

export async function createReport(report) {
  if (!db) {
    return { id: `local-${Date.now()}`, ...report };
  }

  const doc = await addDoc(collection(db, "reports"), {
    ...report,
    createdAt: serverTimestamp(),
    status: "Recibido"
  });
  return { id: doc.id, ...report, status: "Recibido" };
}
