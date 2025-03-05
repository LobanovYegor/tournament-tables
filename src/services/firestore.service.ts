import { deleteDoc, DocumentData } from '@firebase/firestore';
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

export const authSignIn = async (
  email: string,
  password: string
): Promise<string> => {
  const authData = await signInWithEmailAndPassword(auth, email, password);
  return authData.user.uid;
};

export const authSignOut = async (): Promise<void> => signOut(auth);

export const authRegisterUser = async (
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
    return {
      ...docSnap.data(),
      id: docSnap.id,
      createdAt: docSnap.data().createdAt?.toDate().toISOString(),
    } as T;
  } else {
    console.error('No such document!');
    return null;
  }
};

export const addDocumentByPath = async <T extends DocumentData>(
  path: string,
  data: T
): Promise<string> => {
  const newDocRef = await addDoc(collection(db, path), data);
  return newDocRef.id;
};

export const setDocumentByPath = async <T extends DocumentData>(
  path: string,
  id: string,
  data: T
): Promise<void> => {
  await setDoc(doc(db, path, id), data);
};

export const updateDocumentByPath = async <T extends DocumentData>(
  path: string,
  id: string,
  data: Partial<T>
): Promise<void> => {
  await setDoc(doc(db, path, id), data, { merge: true });
};

export const deleteDocumentByPath = async (path: string, id: string) => {
  await deleteDoc(doc(db, path, id));
};
