// * Tokens
import Token from "../models/token.js";

// * Helpers

export const saveRefreshTokenToDatabase = async (refreshToken) => {
  console.log("Refresh Token: ", refreshToken);
  const refreshTokenModel = new Token(refreshToken);
  await refreshTokenModel.save();
  console.log("Refresh Token Model: ", refreshTokenModel);
};

export const deleteRefreshTokenFromDatabase = async (refreshToken) => {
  try {
    let token = await Token.findOne({
      type: "refresh",
      token: refreshToken,
    });
    if (token) {
      await token.remove();
      return true;
    }
    return false;
  } catch (err) {
    console.log("Error deleting refresh token from database: ", err);
  }
};
