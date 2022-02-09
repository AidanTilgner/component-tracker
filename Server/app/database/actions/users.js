import mongoose from "mongoose";

// * User
import UserModel from "../models/user.js";
import UserClass from "../../data/user/user.js";

// * Project
import ProjectModel from "../models/project.js";
import ProjectClass from "../../data/project/project.js";

// * Tokens
import Token from "../models/token.js";
import Project from "../../data/project/project.js";

// * Organization
import OrganizationModel from "../models/organization.js";
import OrganizationClass from "../../data/organization/organization.js";

export const saveUserToDatabase = async (user) => {
  try {
    const newUser = new UserClass(user);
    if (!newUser.validate) {
      return newUser.validate();
    }
    const userModel = await UserModel.create(newUser);
    await userModel.save();
    if (!userModel) {
      return {
        error: "Error saving user to database",
      };
    }
    return {
      user_id: userModel.user_id,
      username: userModel.username,
      email: userModel.email,
      role: userModel.role,
      projects: userModel.projects,
      organizations: userModel.organizations,
    };
  } catch (error) {
    console.log("Error in saveUserToDatabase: ", error);
    return {
      error: "Internal error saving user to database",
    };
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

export const updateUserInDatabase = async (user_id, update) => {
  try {
    const user = await UserModel.findOneAndUpdate(
      { user_id: user_id },
      update,
      {
        new: true,
      }
    ).exec();
    if (!user) {
      return {
        error: "User not found",
      };
    }
    const organizations = user.organizations;
    organizations.forEach(async (organization) => {
      OrganizationModel.findOneAndUpdate(
        { organization_id: organization.organization_id },
        { $pull: { users: { user_id: user_id } } },
        { $push: { users: { user_id: user_id, username: user.username } } },
        {
          new: true,
        }
      ).exec();
    });
    return user;
  } catch (error) {
    console.log("Error in updateUserInDatabase: ", error);
    return {
      error: "Internal error updating user in database",
    };
  }
};

export const deleteUserFromDatabase = async (user_id) => {
  try {
    const user = await UserModel.findOneAndDelete({ user_id: user_id }).exec();
    if (!user) {
      return {
        error: "User not found",
      };
    }
    return user;
  } catch (error) {
    console.log("Error in deleteUserFromDatabase: ", error);
    return {
      error: "Internal error deleting user from database",
    };
  }
};
