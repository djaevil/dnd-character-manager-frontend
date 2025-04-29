import axiosClient from "./axiosClient";
import { UserModel } from "../models/UserModel";

export const login = async (username: string, password: string) => {
  const response = await axiosClient.post("/auth/login", {
    username,
    password,
  });
  return response.data;
};

export const register = async (
  username: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  const response = await axiosClient.post("/auth/register", {
    username,
    email,
    password,
    confirmPassword,
  });
  return response.data;
};

export const getUserByToken = async () => {
  const response = await axiosClient.get<UserModel>("/auth/verify-token");
  return response;
};
