import { useEffect, useState, ReactNode, useRef } from "react";
import { AuthModel } from "../models/AuthModel";
import { UserModel } from "../models/UserModel";
import * as authHelper from "../helpers/AuthHelpers";
import { getUserByToken } from "../api/auth.api";
import { useAuth } from "../hooks/useAuth";
import { AuthContext } from "./AuthContextBase";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<AuthModel | undefined>(authHelper.getAuth());
  const [currentUser, setCurrentUser] = useState<UserModel | undefined>();

  const saveAuth = (auth: AuthModel | undefined) => {
    setAuth(auth);
    if (auth) {
      authHelper.setAuth(auth);
    } else {
      authHelper.removeAuth();
    }
  };

  const logout = () => {
    saveAuth(undefined);
    setCurrentUser(undefined);
  };

  return (
    <AuthContext.Provider
      value={{ auth, saveAuth, currentUser, setCurrentUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const AuthInit = ({ children }: { children: ReactNode }) => {
  const { auth, logout, setCurrentUser } = useAuth();
  const didRequest = useRef(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const requestUser = async () => {
      if (!auth?.token) {
        logout();
        setLoading(false);
        return;
      }

      try {
        if (!didRequest.current) {
          const { data } = await getUserByToken();
          setCurrentUser(data);
        }
      } catch (err) {
        console.error(err);
        logout();
      } finally {
        setLoading(false);
        didRequest.current = true;
      }
    };

    requestUser();
  }, []);

  return loading ? <div>Loading...</div> : <>{children}</>;
};
