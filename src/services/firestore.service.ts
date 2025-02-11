import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from 'firebase/firestore';

import { auth, db } from '../firebase';

export const logIn = async (email: string, password: string): Promise<void> => {
  await signInWithEmailAndPassword(auth, email, password);
};

export const logOut = async (): Promise<void> => signOut(auth);

export const registerUser = async (
  email: string,
  password: string
): Promise<string> => {
  const authData = await createUserWithEmailAndPassword(auth, email, password);
  return authData.user.uid;
};

export const getCollectionByPath = async <T>(path: string): Promise<T[]> => {
  const querySnapshot = await getDocs(collection(db, path));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as T[];
};

export const getDocumentByPath = async <T>(
  path: string,
  id: string
): Promise<T | null> => {
  const docRef = doc(db, path, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as T;
  } else {
    console.error('No such document!');
    return null;
  }
};

export const addDocumentByPath = async <T>(
  path: string,
  data: T
): Promise<void> => {
  await addDoc(collection(db, path), data);
};

export const setDocumentByPath = async <T>(
  path: string,
  id: string,
  data: T
): Promise<void> => {
  await setDoc(doc(db, path, id), data);
};

export const updateDocumentByPath = async <T>(
  path: string,
  id: string,
  data: Partial<T>
): Promise<void> => {
  await setDoc(doc(db, path, id), data, { merge: true });
};
