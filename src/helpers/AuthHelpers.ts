import Cookies from "js-cookie";
import { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { AuthModel } from "../models/AuthModel";

const AUTH_COOKIE_KEY = "dnd_auth";

const getAuth = (): AuthModel | undefined => {
  const cookie = Cookies.get(AUTH_COOKIE_KEY);
  if (!cookie) {
    return;
  }

  try {
    const auth: AuthModel = JSON.parse(cookie) as AuthModel;
    if (auth) {
      return auth;
    }
  } catch (error) {
    console.error("AUTH COOKIE PARSE ERROR", error);
  }
};

const setAuth = (auth: AuthModel) => {
  try {
    const cookie = JSON.stringify(auth);
    Cookies.set(AUTH_COOKIE_KEY, cookie /*{ secure: true }*/);
  } catch (error) {
    console.error("AUTH COOKIE SAVE ERROR", error);
  }
};

const removeAuth = () => {
  try {
    Cookies.remove(AUTH_COOKIE_KEY);
  } catch (error) {
    console.error("AUTH COOKIE REMOVE ERROR", error);
  }
};

export function setupAxios(axios: AxiosInstance): void {
  axios.defaults.headers.Accept = "application/json";

  axios.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
      const auth = getAuth();
      if (auth?.token && config.headers) {
        config.headers.Authorization = `Bearer ${auth.token}`;
      }
      return config;
    },
    (error: unknown) => Promise.reject(error)
  );
}

export { getAuth, setAuth, removeAuth, AUTH_COOKIE_KEY };
