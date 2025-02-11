import { UserData } from '@models';
import { setDocumentByPath } from '@services';

export const createUserById = async (userId: string, data: UserData) => {
  await setDocumentByPath('users', userId, {
    displayName: data.displayName,
    email: data.email,
    createdAt: new Date(),
  });
};
