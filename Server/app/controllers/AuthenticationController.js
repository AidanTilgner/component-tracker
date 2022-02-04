// Helpers
import { getDataByFilepath, writeFileByFilepath } from "../helpers/files.js";
import {
  generateAccessToken,
  generateRefreshToken,
  addRefreshTokenToDatabase,
  refreshUserToken,
} from "../helpers/tokens.js";
import { saveUserToDatabase } from "../database/actions/users.js";
import {
  saveRefreshTokenToDatabase,
  deleteRefreshTokenFromDatabase,
} from "../database/actions/tokens.js";
import { getUserByLogin } from "../database/queries/users.js";

// Classes
import User from "../data/user/user.js";

export const loginUser = async (username, password) => {
  const user = await getUserByLogin(username, password);
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  saveRefreshTokenToDatabase(refreshToken);
  return {
    tokens: {
      access: accessToken,
      refresh: refreshToken,
    },
    user: user,
  };
};

export const registerUser = async (user) => {
  user = await saveUserToDatabase(user);
  const accessToken = generateAccessToken(user, { expiresIn: "1h" });
  const refreshToken = generateRefreshToken(user, { expiresIn: "1d" });
  addRefreshTokenToDatabase(refreshToken);
  return {
    tokens: {
      access: accessToken,
      refresh: refreshToken,
    },
    user: user,
  };
};

export const refreshUser = async (refreshToken) => {
  return await refreshUserToken(refreshToken);
};

export const logoutUser = async (refreshToken) => {
  return await deleteRefreshTokenFromDatabase(refreshToken);
};
