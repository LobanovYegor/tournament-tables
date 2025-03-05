import { UserData } from '@models';

import {
  authRegisterUser,
  authSignIn,
  authSignOut,
  getDocumentByPath,
  setDocumentByPath,
} from './firestore.service';

export const logIn = async (credentials: {
  email: string;
  password: string;
}): Promise<UserData | null> => {
  const userId = await authSignIn(credentials.email, credentials.password);
  return getDocumentByPath('users', userId);
};

export const logOut = async (): Promise<void> => {
  await authSignOut();
};

export const registerUser = async (
  credentials: { email: string; password: string },
  userData: UserData
): Promise<UserData | null> => {
  const userId = await authRegisterUser(
    credentials.email,
    credentials.password
  );
  await setDocumentByPath('users', userId, userData);
  return userData;
};
