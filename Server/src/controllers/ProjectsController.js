// Classes
import Project from "../data/project/project.js";
import Component from "../data/project/classes/component.js";

// Helpers
import { getDataByFilepath, writeFileByFilepath } from "../helpers/files.js";

// Controllers
import {
  addProjectToUser,
  updateUserProject,
  deleteUserProject,
} from "./UsersController.js";

export const addProject = async (project) => {
  return await addProjectToDatabase(project);
};

export const getProject = async (id) => {
  return await getProjectFromDatabaseByID(id);
};

export const updateProject = async (id, update) => {
  return await updateProjectInDatabase(id, update);
};

export const deleteProject = async (id) => {
  return await deleteProjectFromDatabase(id);
};

export const addComponent = async (projectID, component) => {
  return await addComponentToProject(projectID, component);
};

export const getComponent = async (projectID, name) => {
  return await getComponentFromProject(projectID, name);
};

export const updateComponent = async (projectID, name, update) => {
  return await updateComponentInProject(projectID, name, update);
};

export const deleteComponent = async (projectID, name) => {
  return await deleteComponentFromProject(projectID, name);
};

const addProjectToDatabase = async (project) => {
  //* Add to projects file
  project = new Project(project);
  let data = await getDataByFilepath("../data/project/projects.json");
  // add the current date to the project in the format month/day/year
  project.created = new Date().toLocaleDateString();
  project.edited = new Date().toLocaleDateString();
  data.push(project);
  writeFileByFilepath("../data/project/projects.json", JSON.stringify(data));

  //* Add project id to user with matching username
  project.contributors.forEach((contributer) => {
    addProjectToUser(contributer.id, {
      id: project.id,
      name: project.name,
      edited: project.edited,
      framework: project.framework,
    });
  });
  return project;
};

const getProjectFromDatabaseByID = async (id) => {
  let data = await getDataByFilepath("../data/project/projects.json");
  return data.find((project) => project.id === id);
};

const updateProjectInDatabase = async (id, update) => {
  let data = await getDataByFilepath("../data/project/projects.json");
  let index = data.findIndex((project) => project.id === id);
  // add the current date to the project in the format month/day/year
  update.edited = new Date().toLocaleDateString();
  data[index] = Object.assign(data[index], update);
  writeFileByFilepath("../data/project/projects.json", JSON.stringify(data));

  //* Update project id to user with matching username
  data[index].contributors.forEach((contributer) => {
    updateUserProject(contributer.id, id, {
      id: date[index].id,
      name: data[index].name,
      edited: data[index].edited,
      framework: data[index].framework,
    });
  });
  return data[index];
};

const deleteProjectFromDatabase = async (id) => {
  let data = await getDataByFilepath("../data/project/projects.json");
  let index = data.findIndex((project) => project.id === id);
  let project = data[index];
  data.splice(index, 1);
  writeFileByFilepath("../data/project/projects.json", JSON.stringify(data));

  // Delete project id from user with matching username
  project.contributors.forEach((contributer) => {
    deleteUserProject(contributer.id, id);
  });

  return project;
};

const addComponentToProject = async (projectID, component) => {
  let data = await getDataByFilepath("../data/project/projects.json");
  let index = data.findIndex((project) => project.id === projectID);
  console.log("New component: ", new Component(component));
  data[index].components.push(new Component(component));
  writeFileByFilepath("../data/project/projects.json", JSON.stringify(data));
  return data[index];
};

const getComponentFromProject = async (projectID, name) => {
  let data = await getDataByFilepath("../data/project/projects.json");
  let index = data.findIndex((project) => project.id === projectID);
  return data[index].components.find((component) => component.name === name);
};

const updateComponentInProject = async (projectID, name, update) => {
  let data = await getDataByFilepath("../data/project/projects.json");
  let project = data.find((project) => project.id === projectID);
  let index = project.components.findIndex(
    (component) => component.name === name
  );
  project.components[index] = Object.assign(project.components[index], update);
  writeFileByFilepath("../data/project/projects.json", JSON.stringify(data));
  return data[index];
};

export const deleteComponentFromProject = async (projectID, name) => {
  let data = await getDataByFilepath("../data/project/projects.json");
  let index = data.findIndex((project) => project.id === projectID);
  let project = data[index];
  let componentIndex = project.components.findIndex(
    (component) => component.name === name
  );
  project.components.splice(componentIndex, 1);
  writeFileByFilepath("../data/project/projects.json", JSON.stringify(data));
  return component;
};
