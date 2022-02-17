import {
  saveOrganizationToDatabase,
  updateOrganizationInDatabase,
  deleteOrganizationFromDatabase,
  addUserToOrganizationInDatabase,
  updateUserInOrganizationInDatabase,
  deleteUserFromOrganizationInDatabase,
  addProjectToOrganizationInDatabase,
  updateProjectInOrganizationInDatabase,
  deleteProjectFromOrganizationInDatabase,
  createJoinCodeInDatabase,
} from "../database/actions/organizations.js";

import {
  getOrganizationFromDatabase,
  getUsersInOrganizationFromDatabase,
  getProjectsFromOrganizationInDatabase,
} from "../database/queries/organizations.js";

import { filterForMessages } from "../helpers/routing.js";

// * Organization
export const createOrganization = async (organization) => {
  try {
    const newOrganization = await saveOrganizationToDatabase(organization);
    if (filterForMessages(newOrganization)) {
      return newOrganization;
    }
    return {
      organization: newOrganization,
      message: "Organization successfully created",
    };
  } catch (error) {
    console.log("Error in createOrganization: ", error);
    return {
      error: "Internal error creating organization",
    };
  }
};

export const getOrganization = async (organization_id) => {
  try {
    const organization = await getOrganizationFromDatabase(organization_id);
    if (filterForMessages(organization)) {
      return filterForMessages(organization);
    }
    return {
      organization,
      message: "Organization successfully retrieved",
    };
  } catch (error) {
    console.log("Error in getOrganization: ", error);
    return {
      error: "Internal error getting organization",
    };
  }
};

export const updateOrganization = async (organization_id, organization) => {
  try {
    console.log("Organization: ", organization_id);
    const updatedOrganization = await updateOrganizationInDatabase(
      organization_id,
      organization
    );
    if (filterForMessages(updatedOrganization)) {
      return filterForMessages(updatedOrganization);
    }
    return {
      organization: updatedOrganization,
      message: "Organization successfully updated",
    };
  } catch (error) {
    console.log("Error in updateOrganization: ", error);
    return {
      error: "Internal error updating organization",
    };
  }
};

export const deleteOrganization = async (organization_id) => {
  try {
    const deletedOrganization = await deleteOrganizationFromDatabase(
      organization_id
    );
    if (filterForMessages(deletedOrganization)) {
      return filterForMessages(deletedOrganization);
    }
    return {
      organization: deletedOrganization,
      message: "Organization successfully deleted",
    };
  } catch (error) {
    console.log("Error in deleteOrganization: ", error);
    return {
      error: "Internal error deleting organization",
    };
  }
};

// * User
export const addUserToOrganization = async (organization_id, user_id) => {
  try {
    console.log("Adding user to organization: ", organization_id, user_id);
    const addedUser = await addUserToOrganizationInDatabase(
      organization_id,
      user_id
    );
    if (filterForMessages(addedUser)) {
      return filterForMessages(addedUser);
    }
    return {
      user: addedUser,
      message: "User successfully added to organization",
    };
  } catch (error) {
    console.log("Error in addUserToOrganization: ", error);
    return {
      error: "Internal error adding user to organization",
    };
  }
};

export const getUsersFromOrganization = async (organization_id) => {
  try {
    const users = await getUsersInOrganizationFromDatabase(organization_id);
    if (filterForMessages(users)) {
      return filterForMessages(users);
    }
    return {
      users,
      message: "Users successfully retrieved from organization",
    };
  } catch (error) {
    console.log("Error in getUsersFromOrganization: ", error);
  }
};

export const updateUserInOrganization = async (organization_id, user) => {
  try {
    const updatedUser = await updateUserInOrganizationInDatabase(
      organization_id,
      user
    );
    if (filterForMessages(updatedUser)) {
      return filterForMessages(updatedUser);
    }
    return {
      user: updatedUser,
      message: "User successfully updated in organization",
    };
  } catch (error) {
    console.log("Error in updateUserInOrganization: ", error);
    return {
      error: "Internal error updating user in organization",
    };
  }
};

export const removeUserFromOrganization = async (organization_id, user) => {
  try {
    const removedUser = await deleteUserFromOrganizationInDatabase(
      organization_id,
      user
    );
    if (filterForMessages(removedUser)) {
      return filterForMessages(removedUser);
    }
    return {
      user: removedUser,
      message: "User successfully removed from organization",
    };
  } catch (error) {
    console.log("Error in removeUserFromOrganization: ", error);
    return {
      error: "Internal error removing user from organization",
    };
  }
};

// * Projects
export const addProjectToOrganization = async (organization_id, project) => {
  try {
    const addedProject = await addProjectToOrganizationInDatabase(
      organization_id,
      project
    );
    if (filterForMessages(addedProject)) {
      return filterForMessages(addedProject);
    }
    return {
      project: addedProject,
      message: "Project successfully added to organization",
    };
  } catch (error) {
    console.log("Error in addProjectToOrganization: ", error);
    return {
      error: "Internal error adding project to organization",
    };
  }
};

export const getProjectsFromOrganization = async (organization_id) => {
  try {
    const projects = await getProjectsFromOrganizationInDatabase(
      organization_id
    );
    if (filterForMessages(projects)) {
      return filterForMessages(projects);
    }
    return {
      projects,
      message: "Projects successfully retrieved from organization",
    };
  } catch (error) {
    console.log("Error in getProjectsFromOrganization: ", error);
    return {
      error: "Internal error getting projects from organization",
    };
  }
};

export const updateProjectInOrganization = async (organization_id, project) => {
  try {
    const updatedProject = await updateProjectInOrganizationInDatabase(
      organization_id,
      project
    );
    if (filterForMessages(updatedProject)) {
      return filterForMessages(updatedProject);
    }
    return {
      project: updatedProject,
      message: "Project successfully updated in organization",
    };
  } catch (error) {
    console.log("Error in updateProjectInOrganization: ", error);
    return {
      error: "Internal error updating project in organization",
    };
  }
};

export const deleteProjectFromOrganization = async (
  organization_id,
  project
) => {
  try {
    const deletedProject = await deleteProjectFromOrganizationInDatabase(
      organization_id,
      project
    );
    if (filterForMessages(deletedProject)) {
      return filterForMessages(deletedProject);
    }
    return {
      project: deletedProject,
      message: "Project successfully deleted from organization",
    };
  } catch (error) {
    console.log("Error in deleteProjectFromOrganization: ", error);
    return {
      error: "Internal error deleting project from organization",
    };
  }
};

// * Links
export const createJoinCode = async (organization_id, join_code) => {
  try {
    const code = await createJoinCodeInDatabase(organization_id);
    if (filterForMessages(code)) {
      return filterForMessages(code);
    }
    return {
      code,
      message: "Join code successfully created",
    };
  } catch (error) {
    console.log("Error in createJoinLink: ", error);
    return {
      error: "Internal error creating join code",
    };
  }
};
