import axiosClient from "./axiosClient";
import { Character } from "../models/CharacterModel";

export const getAllCharacters = async () => {
  const response = await axiosClient.get<Character[]>("/characters");
  return response;
};
