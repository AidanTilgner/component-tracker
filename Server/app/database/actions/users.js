import mongoose from "mongoose";

// * User
import UserModel from "../models/user.js";
import UserClass from "../../data/user/user.js";

// * Project
import ProjectModel from "../models/project.js";
import ProjectClass from "../../data/project/project.js";

// * Tokens
import Token from "../models/token.js";

export const saveUserToDatabase = async (user) => {
  const newUser = new UserClass(user);
  console.log("New User: ", newUser);
  const userModel = new UserModel(newUser);
  await userModel.save();
  console.log("User Model: ", userModel);
  return {
    user_id: newUser.user_id,
    username: newUser.username,
    email: newUser.email,
    role: newUser.role,
    projects: newUser.projects,
  };
};
