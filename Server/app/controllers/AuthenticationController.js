// Helpers
import { getDataByFilepath, writeFileByFilepath } from "../helpers/files.js";
import {
  generateAccessToken,
  generateRefreshToken,
  addRefreshTokenToDatabase,
  refreshUserToken,
  deleteRefreshTokenFromDatabase,
} from "../helpers/tokens.js";

// Classes
import User from "../data/user/user.js";

export const loginUser = async (username, password) => {
  const user = await getUserFromDatabaseByLogin(username, password);
  console.log("Logging in user", user);
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  addRefreshTokenToDatabase(refreshToken);
  return {
    accessToken,
    refreshToken,
  };
};

export const registerUser = async (user) => {
  user = await addUserToDatabase(user);
  console.log("New user registered: ", user);
  const accessToken = generateAccessToken(user, { expiresIn: "1h" });
  const refreshToken = generateRefreshToken(user, { expiresIn: "1d" });
  addRefreshTokenToDatabase(refreshToken);
  return {
    accessToken,
    refreshToken,
  };
};

export const refreshUser = async (refreshToken) => {
  console.log("Returns: ", await refreshUserToken(refreshToken));
  return await refreshUserToken(refreshToken);
};

export const logoutUser = async (refreshToken) => {
  return await deleteRefreshTokenFromDatabase(refreshToken);
};

const addUserToDatabase = async (user) => {
  user = new User(user);
  let data = await getDataByFilepath("../data/user/users.json");
  data.push(user);
  writeFileByFilepath("../data/user/users.json", JSON.stringify(data));
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
    projects: user.projects,
  };
};

const getUserFromDatabaseByLogin = async (username, password) => {
  let data = await getDataByFilepath("../data/user/users.json");
  return data.find(
    (user) => user.username === username && user.password === password
  );
};
