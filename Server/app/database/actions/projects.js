import mongoose from "mongoose";

// * User
import UserModel from "../models/user.js";
import UserClass from "../../data/user/user.js";

// * Project
import ProjectModel from "../models/project.js";
import ProjectClass from "../../data/project/project.js";

export const saveProjectToDatabase = async (project) => {
  const newProject = new ProjectClass(project);
  console.log("New Project: ", newProject);
  const projectModel = new ProjectModel(newProject);
  await projectModel.save();
  console.log("Project Model: ", projectModel);
  newProject.contributors.forEach(async (contributor) => {
    UserModel.findOneAndUpdate(
      { user_id: contributor.user_id },
      {
        $push: {
          projects: {
            id: newProject.id,
            name: newProject.name,
            edited: newProject.edited,
            framework: newProject.framework,
          },
        },
      },
      { new: true }
    ).exec();
  });
  return {
    id: newProject.id,
    name: newProject.name,
    edited: newProject.edited,
    framework: newProject.framework,
  };
};

export const getProjectFromDatabase = async (project_id) => {
  const project = await ProjectModel.findOne({ project_id: project_id }).exec();
  return project;
};

export const updateProjectInDatabase = async (project_id, update) => {
  const project = await ProjectModel.findOneAndUpdate(
    { project_id: project_id },
    update,
    { new: true }
  ).exec();
  return project;
};

export const deleteProjectFromDatabase = async (project_id) => {
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
            id: project_id,
          },
        },
      },
      { new: true }
    ).exec();
  });
  return project;
};

export const addComponentToProjectInDatabase = async (
  project_id,
  component
) => {
  const project = await ProjectModel.findOne({ project_id: project_id }).exec();
  project.components.push(component);
  await project.save();
  return project;
};

export const getComponentFromProjectInDatabase = async (project_id, name) => {
  const project = await ProjectModel.findOne({ project_id: project_id }).exec();
  return project.components.find((component) => component.name === name);
};

export const updateComponentInProjectInDatabase = async (
  project_id,
  name,
  update
) => {
  const project = await ProjectModel.findOne({ project_id: project_id }).exec();
  const index = project.components.findIndex(
    (component) => component.name === name
  );
  project.components[index] = Object.assign(project.components[index], update);
  await project.save();
  return project.components[index];
};

export const deleteComponentFromProjectInDatabase = async (
  project_id,
  name
) => {
  const project = await ProjectModel.findOne({ project_id: project_id }).exec();
  const index = project.components.findIndex(
    (component) => component.name === name
  );
  project.components.splice(index, 1);
  await project.save();
  return project.components;
};
