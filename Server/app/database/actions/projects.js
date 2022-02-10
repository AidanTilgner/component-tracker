import mongoose from "mongoose";

// * User
import UserModel from "../models/user.js";
import UserClass from "../../data/user/user.js";

// * Project
import ProjectModel from "../models/project.js";
import ProjectClass from "../../data/project/project.js";

// * Helpers
import {
  addProjectToOrganizationInDatabase,
  deleteProjectFromOrganizationInDatabase,
  updateProjectInOrganizationInDatabase,
} from "./organizations.js";
import {
  addProjectToUserInDatabase,
  updateProjectInUserInDatabase,
  deleteProjectFromUserInDatabase,
} from "./users.js";

export const saveProjectToDatabase = async (project) => {
  try {
    const newProject = new ProjectClass(project);
    if (!newProject.validate) {
      return newProject.validate();
    }
    const projectModel = await ProjectModel.create(newProject);
    //await projectModel.save();
    if (project.organization_id && project.organization_id !== "") {
      const res = await addProjectToOrganizationInDatabase(
        project.organization_id,
        newProject.project_id
      );
      if (res.error) {
        return res;
      }
    }
    newProject.contributors.forEach(async (contributor) => {
      await addProjectToUserInDatabase(
        contributor.user_id,
        newProject.project_id
      );
    });
    return {
      project_id: newProject.project_id,
      name: newProject.name,
      framework: newProject.framework,
      created: projectModel.created,
      edited: projectModel.edited,
    };
  } catch (error) {
    console.log("Error in saveProjectToDatabase: ", error);
  }
};

export const updateProjectInDatabase = async (project_id, update) => {
  try {
    const project = await ProjectModel.findOneAndUpdate(
      { project_id: project_id },
      update,
      { new: true }
    ).exec();
    if (!project) {
      return {
        error: "Project not found",
      };
    }
    console.log("Updated Project: ", project);
    // For each project contributor, update the project in the project list
    project.contributors.forEach(async (contributor) => {
      const res = await updateProjectInUserInDatabase(
        contributor.user_id,
        project_id
      );
      if (res.error) {
        return res;
      }
    });
    // If there is an organization, update the project in the organization's project list
    if (project.organization_id && project.organization_id !== "") {
      const res = await updateProjectInOrganizationInDatabase(
        project.organization_id,
        project_id
      );
      if (res.error) {
        return res;
      }
    }
    return project;
  } catch (error) {
    console.log("Error in updateProjectInDatabase: ", error);
    return {
      error: "Internal error updating project in database",
    };
  }
};

export const deleteProjectFromDatabase = async (project_id) => {
  try {
    const project = await ProjectModel.findOneAndDelete({
      project_id: project_id,
    }).exec();
    if (!project) {
      return {
        error: "Project not found",
      };
    }
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
    // If there is an organization, find the project and delete it
    if (project.organization && project.organization !== "") {
      const res = await deleteProjectFromOrganizationInDatabase(
        project.organization_id,
        project.project_id
      );
      if (res.error) {
        return res;
      }
    }
    return project;
  } catch (eror) {
    console.log("Error in deleteProjectFromDatabase: ", error);
    return {
      error: "Internal error deleting project from database",
    };
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
    if (!project) {
      return {
        error: "Project not found",
      };
    }
    project.components.push(component);
    await project.save();
    return project;
  } catch (error) {
    console.log("Error in addComponentToProjectInDatabase: ", error);
    return {
      error: "Internal error adding component to project in database",
    };
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
    if (!project) {
      return {
        error: "Project not found",
      };
    }
    const index = project.components.findIndex(
      (component) => component.name === name
    );
    if (index === -1) {
      return {
        error: "Component not found",
      };
    }
    project.components[index] = Object.assign(
      project.components[index],
      update
    );
    await project.save();
    return project.components[index];
  } catch (error) {
    console.log("Error in updateComponentInProjectInDatabase: ", error);
    return {
      error: "Internal error updating component in project in database",
    };
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
    if (!project) {
      return {
        error: "Project not found",
      };
    }
    const index = project.components.findIndex(
      (component) => component.name === name
    );
    if (index === -1) {
      return {
        error: "Component not found",
      };
    }
    project.components.splice(index, 1);
    await project.save();
    return project.components;
  } catch (error) {
    console.log("Error in deleteComponentFromProjectInDatabase: ", error);
    return {
      error: "Internal error deleting component from project in database",
    };
  }
};
