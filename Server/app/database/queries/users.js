import mongoose from "mongoose";
import User from "../models/user.js";
import { comparePassword } from "../../helpers/crypto.js";

export const getUserByLogin = async (username, password) => {
  try {
    let user = await User.findOne({ username: username });
    if (user) {
      const matches = comparePassword(password, user.password);
      if (matches) {
        return {
          user_id: user.user_id,
          username: user.username,
          email: user.email,
          role: user.role,
          projects: user.projects,
        };
      }
      return {
        error: "Invalid password",
      };
    }
  } catch (err) {
    console.log("Error getting user by login: " + err);
  }
};
