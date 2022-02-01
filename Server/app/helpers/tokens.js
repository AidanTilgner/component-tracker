import JWT from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });
import { getDataByFilepath, writeFileByFilepath } from "../helpers/files.js";

// Generates a JWT token
export const generateAccessToken = (payload, opts) => {
  return JWT.sign(payload, process.env.ACCESS_TOKEN_SECRET, opts);
};

// Generates a refresh token based on the secret in dotenv
export const generateRefreshToken = (payload, opts) => {
  return JWT.sign(payload, process.env.REFRESH_TOKEN_SECRET, opts);
};

// Adds a refresh token to refresh token list
export const addRefreshTokenToDatabase = async (tkn) => {
  try {
    let data = await getDataByFilepath("../data/tokens/refreshTokens.json");
    data.push(tkn);
    writeFileByFilepath(
      "../data/tokens/refreshTokens.json",
      JSON.stringify(data)
    );
    return tkn;
  } catch (err) {
    console.log(err);
  }
};

// Verifies a refresh token and then sends back a new one
export const refreshUserToken = async (tkn) => {
  try {
    let data = await getDataByFilepath("../data/tokens/refreshTokens.json");
    console.log("Data: ", data);
    if (tkn === null) return 401;
    if (!data.includes(tkn)) return 403;
    return JWT.verify(tkn, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return 403;
      console.log("User: ", user);
      return {
        accessToken: generateAccessToken(
          {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            projects: user.projects,
          },
          { expiresIn: "1hr" }
        ),
      };
    });
  } catch (err) {
    console.log(err);
  }
};

// Deletes a refresh token from the database
export const deleteRefreshTokenFromDatabase = async (tkn) => {
  try {
    let data = await getDataByFilepath("../data/tokens/refreshTokens.json");
    data = data.filter((e) => e !== tkn);
    writeFileByFilepath(
      "../data/tokens/refreshTokens.json",
      JSON.stringify(data)
    );
    return { message: "Refresh token deleted" };
  } catch (err) {
    console.log(err);
  }
};
