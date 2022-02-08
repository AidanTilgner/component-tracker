// Helpers
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
import { filterForMessages } from "../helpers/routing.js";

// Classes
import User from "../data/user/user.js";

export const loginUser = async (username, password) => {
  try {
    const user = await getUserByLogin(username, password);
    if (filterForMessages(user)) {
      return filterForMessages(user);
    }
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    saveRefreshTokenToDatabase(refreshToken);
    return {
      tokens: {
        access: accessToken,
        refresh: refreshToken,
      },
      user: user,
      message: "User logged in successfully",
    };
  } catch (error) {
    console.log("Error in loginUser: ", error);
    return {
      error: "Internal error logging in user",
    };
  }
};

export const registerUser = async (user) => {
  try {
    user = await saveUserToDatabase(user);
    if (filterForMessages(user)) {
      return filterForMessages(user);
    }
    const accessToken = generateAccessToken(user, { expiresIn: "1h" });
    const refreshToken = generateRefreshToken(user, { expiresIn: "1d" });
    addRefreshTokenToDatabase(refreshToken);
    return {
      tokens: {
        access: accessToken,
        refresh: refreshToken,
      },
      user: user,
      message: "User registered successfully",
    };
  } catch (error) {
    console.log("Error in registerUser: ", error);
    return {
      error: "Internal error registering user",
    };
  }
};

export const refreshUser = async (refreshToken) => {
  try {
    const token = await refreshUserToken(refreshToken);
    if (filterForMessages(token)) {
      return filterForMessages(token);
    }
    return {
      token: token,
      message: "User refreshed successfully",
    };
  } catch (error) {
    console.log("Error in refreshUser: ", error);
    return {
      error: "Internal error refreshing user",
    };
  }
};

export const logoutUser = async (refreshToken) => {
  try {
    const token = await deleteRefreshTokenFromDatabase(refreshToken);
    return token;
  } catch (error) {
    console.log("Error in logoutUser: ", error);
    return {
      error: "Internal error logging out user",
    };
  }
};
