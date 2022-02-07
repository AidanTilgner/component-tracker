// * Tokens
import Token from "../models/token.js";

// * Helpers

export const saveRefreshTokenToDatabase = async (refreshToken) => {
  try {
    console.log("Refresh Token: ", refreshToken);
    const refreshTokenModel = new Token({ token: refreshToken });
    await refreshTokenModel.save();
    console.log("Refresh Token Model: ", refreshTokenModel);
  } catch (error) {
    console.log("Error in saveRefreshTokenToDatabase: ", error);
  }
};

export const deleteRefreshTokenFromDatabase = async (refreshToken) => {
  try {
    let token = await Token.findOne({
      token: refreshToken,
    }).exec();
    if (token) {
      await token.remove();
      return true;
    }
    return false;
  } catch (err) {
    console.log("Error deleting refresh token from database: ", err);
  }
};
