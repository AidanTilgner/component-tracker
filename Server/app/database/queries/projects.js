import mongoose from "mongoose";

import UserModel from "../models/user.js";

export const getProjectFromDatabase = async (project_id) => {
  try {
    console.log("Getting project from database: ", project_id);
    const project = await ProjectModel.findOne({
      project_id: project_id,
    }).exec();
    console.log("Project: ", project);
    if (!project) {
      return {
        error: "Project not found",
      };
    }
    return project;
  } catch (error) {
    console.log("Error in getProjectFromDatabase: ", error);
  }
};

export const getComponentFromProjectInDatabase = async (project_id, name) => {
  try {
    const project = await ProjectModel.findOne({
      project_id: project_id,
    }).exec();
    return project.components.find((component) => component.name === name);
  } catch (error) {
    console.log("Error in getComponentFromProjectInDatabase: ", error);
  }
};
