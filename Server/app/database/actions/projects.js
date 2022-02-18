import mongoose from "mongoose";

// * User
import UserModel from "../models/user.js";
import UserClass from "../../data/user/user.js";

// * Organization
import OrganizationModel from "../models/organization.js";

// * Project
import ProjectModel from "../models/project.js";
import ProjectClass from "../../data/project/project.js";

// * Component
import ComponentModel from "../models/schemas/component.js";
import ComponentClass from "../../data/project/classes/component.js";

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
    if (
      newProject.organization &&
      newProject.organization.organization_id !== ""
    ) {
      const organization = await OrganizationModel.findOne({
        organization_id: newProject.organization.organization_id,
      });
      if (!organization) {
        return {
          error: "Organization not found",
        };
      }
      const projectModel = await ProjectModel.create(newProject);
      await projectModel.save();
      const res = await addProjectToOrganizationInDatabase(
        organization.organization_id,
        newProject.project_id
      );
      if (res.error) {
        return res;
      }
      return {
        project_id: newProject.project_id,
        name: newProject.name,
        framework: newProject.framework,
        created: projectModel.created,
        edited: projectModel.edited,
      };
    }
    const projectModel = await ProjectModel.create(newProject);
    newProject.contributors.forEach(async (contributor) => {
      const res = await addProjectToUserInDatabase(
        contributor.user_id,
        newProject.project_id
      );
      if (res.error) {
        return res;
      }
    });
    await projectModel.save();
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
      await deleteProjectFromUserInDatabase(
        contributor.user_id,
        project.project_id
      );
    });
    // If there is an organization, find the project and delete it
    if (project.organization_id && project.organization_id !== "") {
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

export const addContributorToProjectInDatabase = async (
  project_id,
  user_id
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
    const duplicate = project.contributors.some(
      (con) => con.user_id === user_id
    );
    if (duplicate) {
      return {
        error: "User is already a contributor to this project",
      };
    }
    const user = await UserModel.findOne({
      user_id: user_id,
    }).exec();
    if (!user) {
      return {
        error: "User not found",
      };
    }
    const contributor = {
      user_id: user_id,
      username: user.username,
    };
    project.contributors.push(contributor);
    await project.save();
    await addProjectToUserInDatabase(user_id, project_id);
    return project;
  } catch (error) {
    console.log("Error in addContributorToProjectInDatabase: ", error);
    return {
      error: "Internal error adding contributor to project in database",
    };
  }
};

export const removeContributorFromProjectInDatabase = async (
  project_id,
  user_id
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
    const contributor = project.contributors.find(
      (con) => con.user_id === user_id
    );
    if (!contributor) {
      return {
        error: "User is not a contributor to this project",
      };
    }
    project.contributors = project.contributors.filter(
      (con) => con.user_id !== user_id
    );
    await project.save();
    await deleteProjectFromUserInDatabase(user_id, project_id);
    return project;
  } catch (error) {
    console.log("Error in removeContributorFromProjectInDatabase: ", error);
    return {
      error: "Internal error removing contributor from project in database",
    };
  }
};

export const addComponentToProjectInDatabase = async (
  project_id,
  component
) => {
  try {
    const newComponent = new ComponentClass(component);
    const project = await ProjectModel.findOneAndUpdate(
      { project_id: project_id },
      { $push: { components: newComponent } },
      { new: true }
    ).exec();
    if (!project) {
      return {
        error: "Project not found",
      };
    }
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
      (component) => component.metaData.path === name
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
      (component) => component.metaData.path === name
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
