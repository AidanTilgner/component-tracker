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

// Classes
import User from "../data/user/user.js";

export const loginUser = async (username, password) => {
  try {
    const user = await getUserByLogin(username, password);
    if (user.error) {
      return {
        error: user.error,
      };
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
    if (user.error) {
      return {
        error: user.error,
      };
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
    return await refreshUserToken(refreshToken);
  } catch (error) {
    console.log("Error in refreshUser: ", error);
    return {
      error: "Internal error refreshing user",
    };
  }
};

export const logoutUser = async (refreshToken) => {
  try {
    return await deleteRefreshTokenFromDatabase(refreshToken);
  } catch (error) {
    console.log("Error in logoutUser: ", error);
    return {
      error: "Internal error logging out user",
    };
  }
};
