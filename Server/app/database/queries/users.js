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
          organizations: user.organizations,
          message: "User found",
        };
      }
      return {
        error: "Invalid password",
      };
    }
    return {
      error: "User not found",
    };
  } catch (err) {
    console.log("Error getting user by login: " + err);
  }
};

export const getUserFromDatabase = async (user_id) => {
  try {
    const user = await UserModel.findOne({ user_id: user_id }).exec();
    if (!user) {
      return {
        error: "User not found",
      };
    }
    return {
      user: user,
      message: "User found",
    };
  } catch (error) {
    console.log("Error in getUserFromDatabase: ", error);
    return {
      error: "Internal error getting user from database",
    };
  }
};

export const getUserProjectsFromDatabase = async (user_id) => {
  try {
    let user = await User.findOne({ user_id: user_id }).exec();
    if (user) {
      console.log("Returning user projects, ", user.projects);
      return { projects: user.projects, message: "User projects found" };
    }
    console.log("Did not find user with id: ", user_id);
    return {
      error: "User not found",
    };
  } catch (err) {
    console.log("Error getting user projects from database: " + err);
    return {
      error: "Internal error getting user projects from database",
    };
  }
};

export const getUserOrganizationsFromDatabase = async (user_id) => {
  try {
    let user = await User.findOne({ user_id: user_id }).exec();
    if (user) {
      console.log("Returning user organizations, ", user.organizations);
      return {
        organizations: user.organizations,
        message: "User organizations found",
      };
    }
    console.log("Did not find user with id: ", user_id);
    return {
      error: "User not found",
    };
  } catch (err) {
    console.log("Error getting user organizations from database: " + err);
    return {
      error: "Internal error getting user organizations from database",
    };
  }
};
