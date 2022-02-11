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

import { filterForMessages } from "../helpers/routing.js";

export const addProject = async (project) => {
  try {
    const newProject = await saveProjectToDatabase(project);
    if (filterForMessages(newProject)) {
      return newProject;
    }
    return {
      project: newProject,
      message: "Project successfully created",
    };
  } catch (error) {
    console.log("Error in addProject: ", error);
    return {
      error: "Internal error adding project",
    };
  }
};

export const getProject = async (project_id) => {
  try {
    const project = await getProjectFromDatabase(project_id);
    if (filterForMessages(project)) {
      return filterForMessages(project);
    }
    return {
      project,
      message: "Project successfully retrieved",
    };
  } catch (error) {
    console.log("Error in getProject: ", error);
    return {
      error: "Internal error getting project",
    };
  }
};

export const updateProject = async (project_id, update) => {
  try {
    const updatedProject = await updateProjectInDatabase(project_id, update);
    if (filterForMessages(updatedProject)) {
      return filterForMessages(updatedProject);
    }
    return {
      project: updatedProject,
      message: "Project successfully updated",
    };
  } catch (error) {
    console.log("Error in updateProject: ", error);
    return {
      error: "Internal error updating project",
    };
  }
};

export const deleteProject = async (project_id) => {
  try {
    const deletedProject = await deleteProjectFromDatabase(project_id);
    if (filterForMessages(deletedProject)) {
      return filterForMessages(deletedProject);
    }
    return {
      project: deletedProject,
      message: "Project successfully deleted",
    };
  } catch (error) {
    console.log("Error in deleteProject: ", error);
    return {
      error: "Internal error deleting project",
    };
  }
};

export const addComponent = async (project_id, component) => {
  try {
    const project = await addComponentToProjectInDatabase(
      project_id,
      component
    );
    if (filterForMessages(project)) {
      return project;
    }
    console.log("Returning: ", {
      project,
      message: "Component successfully added",
    });
    return {
      project: project,
      message: "Component successfully added to project",
    };
  } catch (error) {
    console.log("Error in addComponent: ", error);
    return {
      error: "Internal error adding component",
    };
  }
};

export const getComponent = async (project_id, name) => {
  try {
    const component = await getComponentFromProjectInDatabase(project_id, name);
    if (filterForMessages(component)) {
      return filterForMessages(component);
    }
    return {
      component,
      message: "Component successfully retrieved",
    };
  } catch (error) {
    console.log("Error in getComponent: ", error);
    return {
      error: "Internal error getting component",
    };
  }
};

export const updateComponent = async (project_id, name, update) => {
  try {
    const updatedComponent = await updateComponentInProjectInDatabase(
      project_id,
      name,
      update
    );
    if (filterForMessages(updatedComponent)) {
      return filterForMessages(updatedComponent);
    }
    return {
      component: updatedComponent,
      message: "Component successfully updated",
    };
  } catch (error) {
    console.log("Error in updateComponent: ", error);
    return {
      error: "Internal error updating component",
    };
  }
};

export const deleteComponent = async (project_id, name) => {
  try {
    const deletedComponent = await deleteComponentFromProjectInDatabase(
      project_id,
      name
    );
    if (filterForMessages(deletedComponent)) {
      return filterForMessages(deletedComponent);
    }
    return {
      component: deletedComponent,
      message: "Component successfully deleted",
    };
  } catch (error) {
    console.log("Error in deleteComponent: ", error);
    return {
      error: "Internal error deleting component",
    };
  }
};
