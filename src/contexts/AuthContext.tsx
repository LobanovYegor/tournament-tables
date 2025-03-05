import { UserData } from '@models';
import { createContext } from 'react';

interface AuthContextProps {
  user: UserData | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);
