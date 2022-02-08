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
    console.log("New User: ", newUser);
    const userModel = await UserModel.create(newUser);
    await userModel.save();
    if (!userModel) {
      return {
        error: "Error saving user to database",
      };
    }
    console.log("User Model: ", userModel);
    return {
      user: {
        user_id: newUser.user_id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        projects: newUser.projects,
        organizations: newUser.organizations,
        created: userModel.created,
        edited: userModel.edited,
      },
      message: "User saved to database",
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
    return { user: user, message: "User found" };
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
    return { user: user, message: "User updated" };
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
    return { user: user, message: "User deleted" };
  } catch (error) {
    console.log("Error in deleteUserFromDatabase: ", error);
    return {
      error: "Internal error deleting user from database",
    };
  }
};
