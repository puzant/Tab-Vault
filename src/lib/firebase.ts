import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  collection, 
  doc 
} from 'firebase/firestore';

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

initializeApp(firebaseConfig);

export const db = getFirestore()

export const getLinkedTabs = async () => {
  const colRef = collection(db, 'linked-tabs');
  const snapshot = await getDocs(colRef);

  return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
}

export const addLinkedTab = async (tabName: string, tabUrl: string) => {
  try {
    await addDoc(collection(db, 'linked-tabs'), {
      name: tabName,
      url: tabUrl
    })

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