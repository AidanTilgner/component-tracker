// Helpers
import { getDataByFilepath, writeFileByFilepath } from "../helpers/files.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../helpers/tokens.js";

// Classes
import User from "../data/user/user.js";

export const loginUser = async (username, password) => {
  const user = await getUserFromDatabaseByLogin(username, password);
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  return {
    accessToken,
    refreshToken,
  };
};

export const registerUser = async (user) => {
  user = await addUserToDatabase(user);
  console.log("New user registered: ", user);
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  return {
    accessToken,
    refreshToken,
  };
};

const addUserToDatabase = async (user) => {
  user = new User(user);
  let data = await getDataByFilepath("../data/user/users.json");
  data.push(user);
  writeFileByFilepath("../data/user/users.json", JSON.stringify(data));
  return user;
};

const getUserFromDatabaseByLogin = async (username, password) => {
  let data = await getDataByFilepath("../data/user/users.json");
  return data.find(
    (user) => user.username === username && user.password === password
  );
};
