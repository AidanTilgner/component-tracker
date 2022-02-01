import JWT from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });
import { getDataByFilepath, writeFileByFilepath } from "../helpers/files.js";

// Generates a JWT token
export const generateAccessToken = (user) => {
  return JWT.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
};

// Generates a refresh token based on the secret in dotenv
export const generateRefreshToken = (user) => {
  return JWT.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

// Adds a refresh token to refresh token list
export const addRefreshTokenToDatabase = async (tkn) => {
  let data = await getDataByFilepath("../data/user/tokens.json");
  data.push(tkn);
  writeFileByFilepath("../data/user/tokens.json", JSON.stringify(data));
  return tkn;
};

// Verifies a refresh token and then sends back a new one
export const verifyRefreshToken = async (tkn) => {
  let data = await getDataByFilepath("../data/user/tokens.json");
  if (tkn === null) return 401;
  if (!data.includes(tkn)) return 403;
  return JWT.verify(tkn, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) return 403;
    return { accessToken: generateAccessToken(decoded) };
  });
};
