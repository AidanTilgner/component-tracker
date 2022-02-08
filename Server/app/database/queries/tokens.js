import mongoose from "mongoose";
import Token from "../models/token.js";

export const checkRefreshTokenInDatabase = async () => {
  try {
    let token = await Token.findOne({
      type: "refresh",
    });
    if (token) {
      return true;
    }
    return false;
  } catch (err) {
    console.log("Error getting refresh tokens from database: " + err);
  }
};
