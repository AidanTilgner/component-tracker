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
  try {
    return await saveProjectToDatabase(project);
  } catch (error) {
    console.log("Error in addProject: ", error);
  }
};

export const getProject = async (project_id) => {
  try {
    return await getProjectFromDatabase(project_id);
  } catch (error) {
    console.log("Error in getProject: ", error);
  }
};

export const updateProject = async (project_id, update) => {
  try {
    return await updateProjectInDatabase(project_id, update);
  } catch (error) {
    console.log("Error in updateProject: ", error);
  }
};

export const deleteProject = async (project_id) => {
  try {
    return await deleteProjectFromDatabase(project_id);
  } catch (error) {
    console.log("Error in deleteProject: ", error);
  }
};

export const addComponent = async (project_id, component) => {
  try {
    return await addComponentToProjectInDatabase(project_id, component);
  } catch (error) {
    console.log("Error in addComponent: ", error);
  }
};

export const getComponent = async (project_id, name) => {
  try {
    return await getComponentFromProjectInDatabase(project_id, name);
  } catch (error) {
    console.log("Error in getComponent: ", error);
  }
};

export const updateComponent = async (project_id, name, update) => {
  try {
    return await updateComponentInProjectInDatabase(project_id, name, update);
  } catch (error) {
    console.log("Error in updateComponent: ", error);
  }
};

export const deleteComponent = async (project_id, name) => {
  try {
    return await deleteComponentFromProjectInDatabase(project_id, name);
  } catch (error) {
    console.log("Error in deleteComponent: ", error);
  }
};
