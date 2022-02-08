import JWT from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });
import { getDataByFilepath, writeFileByFilepath } from "../helpers/files.js";
import { checkRefreshTokenInDatabase } from "../database/queries/tokens.js";

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
    if (tkn === null) return 401;
    if (!checkRefreshTokenInDatabase(tkn)) return 403;
    return await JWT.verify(
      tkn,
      process.env.REFRESH_TOKEN_SECRET,
      (err, user) => {
        if (err) return 403;
        return {
          accessToken: generateAccessToken(
            {
              id: user.id,
              username: user.username,
              email: user.email,
              role: user.role,
              projects: user.projects,
              organizations: user.organizations,
            },
            { expiresIn: "1hr" }
          ),
        };
      }
    );
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

export const getUserRoleFromToken = (token) => {
  const user = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET);
  return user.role;
};

export const confirmUserOrganizationRights = (req, res, next) => {
  console.log("Req: ", req);
  const token = req.headers.authorization?.split(" ")[1];
  const user = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET);
  if (user.role === "admin") return next();
  if (user.role === "user") {
    console.log("User: ", user);
    console.log("Organization ID: ", req.query.organizationID);
    if (
      user.organizations.some(
        (or) => or.organization_id === req.query.organizationID
      )
    ) {
      console.log("User has rights to this organization");
      return next();
    }
    console.log("User does not have rights to this organization");
    return res.sendStatus(403);
  }
  return res.sendStatus(403);
};
