import { createContext } from 'react';

type AuthContextType = {
  signIn: (token: string, type: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (token: string, type: string) => Promise<void>;
  userToken: string | null;
  userType: string | null;
  isLoading: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  signIn: async () => {},
  signOut: async () => {},
  signUp: async () => {},
  userToken: null,
  userType: null,
  isLoading: true
});
