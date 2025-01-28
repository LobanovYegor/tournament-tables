import { setDocumentByPath } from './firestore.service';

// TODO: fix any type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createUserById = async (userId: string, data: any) => {
  await setDocumentByPath('users', userId, {
    displayName: data.displayName,
    email: data.email,
    createdAt: new Date(), // TODO: use database Timestamp to avoid timezones issues
  });
};
