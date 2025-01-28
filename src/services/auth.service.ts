import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import { auth } from '../firebase';

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
