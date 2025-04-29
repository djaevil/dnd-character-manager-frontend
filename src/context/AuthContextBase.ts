import { createContext } from "react";
import { AuthModel } from "../models/AuthModel";
import { UserModel } from "../models/UserModel";

interface AuthContextType {
  auth: AuthModel | undefined;
  saveAuth: (auth: AuthModel | undefined) => void;
  currentUser: UserModel | undefined;
  setCurrentUser: (user: UserModel | undefined) => void;
  logout: () => void;
}

const initAuthContextState = {
  auth: undefined,
  saveAuth: () => {},
  currentUser: undefined,
  setCurrentUser: () => {},
  logout: () => {},
};

export const AuthContext = createContext<AuthContextType>(initAuthContextState);
