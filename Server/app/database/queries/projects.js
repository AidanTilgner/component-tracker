import mongoose from "mongoose";

import UserModel from "../models/user.js";
import ProjectModel from "../models/project.js";

export const getProjectFromDatabase = async (project_id) => {
  try {
    const project = await ProjectModel.findOne({
      project_id: project_id,
    }).exec();
    if (!project) {
      return {
        error: "Project not found",
      };
    }
    return project;
  } catch (error) {
    console.log("Error in getProjectFromDatabase: ", error);
    return {
      error: "Internal error getting project from database",
    };
  }
};

export const getComponentFromProjectInDatabase = async (project_id, name) => {
  try {
    const project = await ProjectModel.findOne({
      project_id: project_id,
    }).exec();
    if (!project) {
      return {
        error: "Project not found",
      };
    }
    return project.components.find((component) => component.name === name);
  } catch (error) {
    console.log("Error in getComponentFromProjectInDatabase: ", error);
    return {
      error: "Internal error getting component from project in database",
    };
  }
};
