import mongoose from "mongoose";

// * User
import UserModel from "../models/user.js";
import UserClass from "../../data/user/user.js";

// * Project
import ProjectModel from "../models/project.js";
import ProjectClass from "../../data/project/project.js";

export const saveProjectToDatabase = async (project) => {
  try {
    console.log("Raw Project: ", project);
    const newProject = new ProjectClass(project);
    console.log("New Project: ", newProject);
    const projectModel = await ProjectModel.create(newProject);
    await projectModel.save();
    console.log("Project Model: ", projectModel);
    newProject.contributors.forEach(async (contributor) => {
      console.log("Adding project to contributor: ", {
        project_id: newProject.project_id,
        name: newProject.name,
        framework: newProject.framework,
        created: projectModel.created,
        edited: projectModel.edited,
      });
      UserModel.findOneAndUpdate(
        { user_id: contributor.user_id },
        {
          $push: {
            projects: {
              project_id: newProject.project_id,
              name: newProject.name,
              framework: newProject.framework,
              created: projectModel.created,
              edited: projectModel.edited,
            },
          },
        },
        { new: true }
      ).exec();
    });
    return {
      id: newProject.project_id,
      name: newProject.name,
      edited: newProject.edited,
      framework: newProject.framework,
    };
  } catch (error) {
    console.log("Error in saveProjectToDatabase: ", error);
  }
};

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

export const updateProjectInDatabase = async (project_id, update) => {
  try {
    const project = await ProjectModel.findOneAndUpdate(
      { project_id: project_id },
      update,
      { new: true }
    ).exec();
    return project;
  } catch (error) {
    console.log("Error in updateProjectInDatabase: ", error);
  }
};

export const deleteProjectFromDatabase = async (project_id) => {
  try {
    const project = await ProjectModel.findOneAndDelete({
      project_id: project_id,
    }).exec();
    // For each project contributor, find the project and delete it
    project.contributors.forEach(async (contributor) => {
      await UserModel.findOneAndUpdate(
        { user_id: contributor.user_id },
        {
          $pull: {
            projects: {
              project_id: project_id,
            },
          },
        },
        { new: true }
      ).exec();
    });
    return project;
  } catch (eror) {
    console.log("Error in deleteProjectFromDatabase: ", error);
  }
};

export const addComponentToProjectInDatabase = async (
  project_id,
  component
) => {
  try {
    const project = await ProjectModel.findOne({
      project_id: project_id,
    }).exec();
    project.components.push(component);
    await project.save();
    return project;
  } catch (error) {
    console.log("Error in addComponentToProjectInDatabase: ", error);
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

export const updateComponentInProjectInDatabase = async (
  project_id,
  name,
  update
) => {
  try {
    const project = await ProjectModel.findOne({
      project_id: project_id,
    }).exec();
    const index = project.components.findIndex(
      (component) => component.name === name
    );
    project.components[index] = Object.assign(
      project.components[index],
      update
    );
    await project.save();
    return project.components[index];
  } catch (error) {
    console.log("Error in updateComponentInProjectInDatabase: ", error);
  }
};

export const deleteComponentFromProjectInDatabase = async (
  project_id,
  name
) => {
  try {
    const project = await ProjectModel.findOne({
      project_id: project_id,
    }).exec();
    const index = project.components.findIndex(
      (component) => component.name === name
    );
    project.components.splice(index, 1);
    await project.save();
    return project.components;
  } catch (error) {
    console.log("Error in deleteComponentFromProjectInDatabase: ", error);
  }
};
