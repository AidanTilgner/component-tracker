// Helpers
import {
  saveProjectToDatabase,
  getProjectFromDatabase,
  updateProjectInDatabase,
  deleteProjectFromDatabase,
  addComponentToProjectInDatabase,
  getComponentFromProjectInDatabase,
  updateComponentInProjectInDatabase,
  deleteComponentFromProjectInDatabase,
} from "../database/actions/projects.js";

export const addProject = async (project) => {
  return await saveProjectToDatabase(project);
};

export const getProject = async (project_id) => {
  return await getProjectFromDatabase(project_id);
};

export const updateProject = async (project_id, update) => {
  return await updateProjectInDatabase(project_id, update);
};

export const deleteProject = async (project_id) => {
  return await deleteProjectFromDatabase(project_id);
};

export const addComponent = async (project_id, component) => {
  return await addComponentToProjectInDatabase(project_id, component);
};

export const getComponent = async (project_id, name) => {
  return await getComponentFromProjectInDatabase(project_id, name);
};

export const updateComponent = async (project_id, name, update) => {
  return await updateComponentInProjectInDatabase(project_id, name, update);
};

export const deleteComponent = async (project_id, name) => {
  return await deleteComponentFromProjectInDatabase(project_id, name);
};
