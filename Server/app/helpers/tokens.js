import JWT from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });
import { getDataByFilepath, writeFileByFilepath } from "../helpers/files.js";
import { checkRefreshTokenInDatabase } from "../database/queries/tokens.js";
import { getUserFromDatabase } from "../database/queries/users.js";
import { wrapAsync } from "./routing.js";

// Generates a JWT token
export const generateAccessToken = (payload, opts) => {
  return JWT.sign(payload, process.env.ACCESS_TOKEN_SECRET, opts);
};

// Generates a refresh token based on the secret in dotenv
export const generateRefreshToken = (payload, opts) => {
  return JWT.sign(payload, process.env.REFRESH_TOKEN_SECRET, opts);
};

// Generates a join token based on the secret in dotenv
export const generateJoinToken = (payload, opts) => {
  return JWT.sign(payload, process.env.ORGANIZATION_JOIN_SECRET, opts);
};

// Verifies a refresh token and then sends back a new one
export const refreshUserToken = async (tkn) => {
  try {
    if (tkn === null)
      return { error: "No refresh token provided", status: 401 };
    if (!checkRefreshTokenInDatabase(tkn))
      return { error: "Invalid token", status: 403 };
    return await JWT.verify(
      tkn,
      process.env.REFRESH_TOKEN_SECRET,
      wrapAsync(async (err, user) => {
        if (err) return 403;
        const updatedUser = await getUserFromDatabase(user.user_id);
        if (updatedUser.error) {
          return updatedUser;
        }
        const newToken = await generateAccessToken(
          {
            user_id: updatedUser.user_id,
            username: updatedUser.username,
            role: updatedUser.role,
            organizations: updatedUser.organizations,
            projects: updatedUser.projects,
          },
          {
            expiresIn: "1hr",
          }
        );
        return newToken;
      })
    );
  } catch (err) {
    console.log(err);
  }
};

// * Helper functions
export const authenticateUser = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

export const authenticateJoinToken = (req, res, next) => {
  const token = req.query.token;
  if (token == null) return res.sendStatus(401);
  JWT.verify(token, process.env.ORGANIZATION_JOIN_SECRET, (err, verfied) => {
    if (err) return res.sendStatus(403);
    req.decoded = verfied;
    next();
  });
};
