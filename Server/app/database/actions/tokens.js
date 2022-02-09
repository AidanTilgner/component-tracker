// * Tokens
import Token from "../models/token.js";

// * Helpers

export const saveRefreshTokenToDatabase = async (refreshToken) => {
  try {
    const refreshTokenModel = new Token({ token: refreshToken });
    await refreshTokenModel.save();
    return refreshTokenModel;
  } catch (error) {
    console.log("Error in saveRefreshTokenToDatabase: ", error);
    return {
      error: "Internal error saving refresh token to database",
    };
  }
};

export const deleteRefreshTokenFromDatabase = async (refreshToken) => {
  try {
    let token = await Token.findOne({
      token: refreshToken,
    }).exec();
    if (!token) {
      return {
        error: "Refresh token not found",
      };
    }
    if (token) {
      await token.remove();
      return {
        message: "Refresh token deleted from database",
      };
    }
    return {
      error: "Refresh token not found",
    };
  } catch (err) {
    console.log("Error deleting refresh token from database: ", err);
    return {
      error: "Internal error deleting refresh token from database",
    };
  }
};
