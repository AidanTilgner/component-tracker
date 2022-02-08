// Helpers
import {
  saveProjectToDatabase,
  updateProjectInDatabase,
  deleteProjectFromDatabase,
  addComponentToProjectInDatabase,
  updateComponentInProjectInDatabase,
  deleteComponentFromProjectInDatabase,
} from "../database/actions/projects.js";

import {
  getProjectFromDatabase,
  getComponentFromProjectInDatabase,
} from "../database/queries/projects.js";

export const addProject = async (project) => {
  try {
    return await saveProjectToDatabase(project);
  } catch (error) {
    console.log("Error in addProject: ", error);
    return {
      error: "Internal error adding project",
    };
  }
};

export const getProject = async (project_id) => {
  try {
    return await getProjectFromDatabase(project_id);
  } catch (error) {
    console.log("Error in getProject: ", error);
    return {
      error: "Internal error getting project",
    };
  }
};

export const updateProject = async (project_id, update) => {
  try {
    return await updateProjectInDatabase(project_id, update);
  } catch (error) {
    console.log("Error in updateProject: ", error);
    return {
      error: "Internal error updating project",
    };
  }
};

export const deleteProject = async (project_id) => {
  try {
    return await deleteProjectFromDatabase(project_id);
  } catch (error) {
    console.log("Error in deleteProject: ", error);
    return {
      error: "Internal error deleting project",
    };
  }
};

export const addComponent = async (project_id, component) => {
  try {
    return await addComponentToProjectInDatabase(project_id, component);
  } catch (error) {
    console.log("Error in addComponent: ", error);
    return {
      error: "Internal error adding component",
    };
  }
};

export const getComponent = async (project_id, name) => {
  try {
    return await getComponentFromProjectInDatabase(project_id, name);
  } catch (error) {
    console.log("Error in getComponent: ", error);
    return {
      error: "Internal error getting component",
    };
  }
};

export const updateComponent = async (project_id, name, update) => {
  try {
    return await updateComponentInProjectInDatabase(project_id, name, update);
  } catch (error) {
    console.log("Error in updateComponent: ", error);
    return {
      error: "Internal error updating component",
    };
  }
};

export const deleteComponent = async (project_id, name) => {
  try {
    return await deleteComponentFromProjectInDatabase(project_id, name);
  } catch (error) {
    console.log("Error in deleteComponent: ", error);
    return {
      error: "Internal error deleting component",
    };
  }
};
