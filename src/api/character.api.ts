import axiosClient from "./axiosClient";
import { Character } from "../models/CharacterModel";

export const getAllCharacters = async () => {
  const response = await axiosClient.get<Character[]>("/characters");
  return response;
};

export const getCharacterById = async (id: string) => {
  const response = await axiosClient.get<Character>(`/characters/${id}`);
  return response;
};

export const createCharacter = async (character: Character) => {
  const response = await axiosClient.post<Character>("/characters", character);
  return response;
};

export const updateCharacter = async (id: string, character: Character) => {
  const response = await axiosClient.put<Character>(
    `/characters/${id}`,
    character
  );
  return response;
};

export const deleteCharacterById = async (id: string) => {
  const response = await axiosClient.delete(`/characters/${id}`);
  return response;
};
