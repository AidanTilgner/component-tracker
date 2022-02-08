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
    return { project: project, message: "Project found" };
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
    return {
      component: project.components.find(
        (component) => component.name === name
      ),
      message: "Component found",
    };
  } catch (error) {
    console.log("Error in getComponentFromProjectInDatabase: ", error);
    return {
      error: "Internal error getting component from project in database",
    };
  }
};
