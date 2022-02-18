import mongoose from "mongoose";
import UserModel from "../models/user.js";
import OrganizationModel from "../models/organization.js";
import { comparePassword } from "../../helpers/crypto.js";

export const getUserByLogin = async (username, password) => {
  try {
    let user = await UserModel.findOne({ username: username });
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
    return user;
  } catch (error) {
    console.log("Error in getUserFromDatabase: ", error);
    return {
      error: "Internal error getting user from database",
    };
  }
};

export const getUserProjectsFromDatabase = async (user_id) => {
  try {
    let user = await UserModel.findOne({ user_id: user_id }).exec();
    if (!user) {
      return {
        error: "User not found",
      };
    }
    let projects = [...user.projects];
    for (let i = 0; i < user.organizations.length; i++) {
      let organization = await OrganizationModel.findOne({
        organization_id: user.organizations[i].organization_id,
      }).exec();
      projects = [...projects, ...organization.projects];
    }
    return projects;
  } catch (err) {
    console.log("Error getting user projects from database: " + err);
    return {
      error: "Internal error getting user projects from database",
    };
  }
};

export const getUserOrganizationsFromDatabase = async (user_id) => {
  try {
    let user = await UserModel.findOne({ user_id: user_id }).exec();
    if (user) {
      return user.organizations;
    }
    console.log("Error finding user with id: ", user_id);
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

export const getUsersFromDatabaseBySearch = async (search) => {
  try {
    const users = await UserModel.find({
      username: { $regex: search, $options: "i" },
    }).exec();
    if (users.length === 0) {
      return {
        error: "No users found",
      };
    }
    return users;
  } catch (err) {
    console.log("Error getting users from database by search: " + err);
    return {
      error: "Internal error getting users from database by search",
    };
  }
};
