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

export const getUserFromDatabase = async (user_id) => {
  const user = await UserModel.findOne({ user_id: user_id }).exec();
  return user;
};

export const updateUserInDatabase = async (user_id, update) => {
  const user = await UserModel.findOneAndUpdate({ user_id: user_id }, update, {
    new: true,
  }).exec();
  return user;
};

export const deleteUserFromDatabase = async (user_id) => {
  const user = await UserModel.findOneAndDelete({ user_id: user_id }).exec();
  return user;
};

export const getUserProjectsFromDatabase = async (user_id) => {
  const user = await UserModel.findOne({ user_id: user_id }).exec();
  return user.projects;
};
