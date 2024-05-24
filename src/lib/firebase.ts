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
  apiKey: "AIzaSyA4SMyUbkaNgwr_fVF9feI-R9Io8ej-LwA",
  authDomain: "guitar-tabs-library.firebaseapp.com",
  databaseURL: "https://guitar-tabs-library-default-rtdb.firebaseio.com",
  projectId: "guitar-tabs-library",
  storageBucket: "guitar-tabs-library.appspot.com",
  messagingSenderId: "610707297219",
  appId: "1:610707297219:web:fb02464ab36b470b20e376",
  measurementId: "G-ZP6MDLXMWK"
};

initializeApp(firebaseConfig);
const db = getFirestore()

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

export const editLinkedTab = async (id: string, payload: any) => {
  updateDoc(doc(db, 'linked-tabs', id), payload)
}

export const deleteLinkedTab = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'linked-tabs', id))

    return { success: true }
  } catch(err) {
    return { success: false, err }
  }
}