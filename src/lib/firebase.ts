import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, getDocs, addDoc, updateDoc, deleteDoc,collection, doc, query,where} from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { filtersStore } from './filtersStore';
import { get } from 'svelte/store';

const AuthErrorMessages = {
 TOO_MANY_REQUESTS: 'Access to this account has been temporarily disabled due to many failed login attempts.', 
 INVALID_CREDENTIALS: 'Email or Password is incorrect',
 DEFAULT: 'An unknown error occurred. Please try again.'
}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore()

export const signUp = async (email: string, passwrod: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, passwrod)
    return userCredential.user
  } catch (err) {
    throw err
  }
}

export const login = async (email: string, passwrod: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, passwrod)
    return userCredential.user
  } catch (err) {
    const errorCode = err.code

    switch (errorCode) {
      case 'auth/too-many-requests':
        return AuthErrorMessages.TOO_MANY_REQUESTS
      case 'auth/invalid-credential':
        return AuthErrorMessages.INVALID_CREDENTIALS
      default: 
        return AuthErrorMessages.DEFAULT
    }
  }
}

export const logout = async () => {
  try {
    await signOut(auth)
  } catch (err) {
    throw err
  } 
}

export const queryBuilder = () => {
  const colRef = collection(db, 'linked-tabs')
  const filters = get(filtersStore)
  let q = query(colRef)

  if (filters.withCapo) q = query(q, where('with_capo', '==', filters.withCapo))
  if (filters.difficulty) q = query(q, where('difficulty', '==', filters.difficulty))
  if (filters.styles && filters.styles.length > 0) q = query(q, where('style', '==', filters.styles))

  return q
}

export const getLinkedTabs = async () => {
  const q = queryBuilder()
  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
}

export const addLinkedTab = async (payload) => {
  try {
    await addDoc(collection(db, 'linked-tabs'), payload)

    return { success: true }
  } catch(err) {
    return { success: false, err }
  }
}

export const editLinkedTab = async (payload: any) => {
  try {
    await updateDoc(doc(db, 'linked-tabs', payload.id), payload)
    return { success: true }
  } catch(err) {
    return { success: false }
  }
}

export const deleteLinkedTab = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'linked-tabs', id))
    return { success: true }
  } catch(err) {
    return { success: false, err }
  }
}
