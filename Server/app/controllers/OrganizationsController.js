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
} from "../database/actions/organizations.js";

import {
  getOrganizationFromDatabase,
  getUsersInOrganizationFromDatabase,
  getProjectsFromOrganizationInDatabase,
} from "../database/queries/organizations.js";

// * Organization
export const createOrganization = async (organization) => {
  try {
    return await saveOrganizationToDatabase(organization);
  } catch (error) {
    console.log("Error in createOrganization: ", error);
    return {
      error: "Internal error creating organization",
    };
  }
};

export const getOrganization = async (organization_id) => {
  try {
    return await getOrganizationFromDatabase(organization_id);
  } catch (error) {
    console.log("Error in getOrganization: ", error);
    return {
      error: "Internal error getting organization",
    };
  }
};

export const updateOrganization = async (organization_id, organization) => {
  try {
    return await updateOrganizationInDatabase(organization_id, organization);
  } catch (error) {
    console.log("Error in updateOrganization: ", error);
    return {
      error: "Internal error updating organization",
    };
  }
};

export const deleteOrganization = async (organization_id) => {
  try {
    return await deleteOrganizationFromDatabase(organization_id);
  } catch (error) {
    console.log("Error in deleteOrganization: ", error);
    return {
      error: "Internal error deleting organization",
    };
  }
};

// * User
export const addUserToOrganization = async (organization_id, user) => {
  try {
    return await addUserToOrganizationInDatabase(organization_id, user);
  } catch (error) {
    console.log("Error in addUserToOrganization: ", error);
    return {
      error: "Internal error adding user to organization",
    };
  }
};

export const getUsersFromOrganization = async (organization_id) => {
  try {
    return await getUsersInOrganizationFromDatabase(organization_id);
  } catch (error) {
    console.log("Error in getUsersFromOrganization: ", error);
  }
};

export const updateUserInOrganization = async (organization_id, user) => {
  try {
    return await updateUserInOrganizationInDatabase(organization_id, user);
  } catch (error) {
    console.log("Error in updateUserInOrganization: ", error);
  }
};

export const removeUserFromOrganization = async (organization_id, user) => {
  try {
    return await deleteUserFromOrganizationInDatabase(organization_id, user);
  } catch (error) {
    console.log("Error in removeUserFromOrganization: ", error);
  }
};

// * Projects
export const addProjectToOrganization = async (organization_id, project) => {
  try {
    return await addProjectToOrganizationInDatabase(organization_id, project);
  } catch (error) {
    console.log("Error in addProjectToOrganization: ", error);
  }
};

export const getProjectsFromOrganization = async (organization_id) => {
  try {
    return await getProjectsFromOrganizationInDatabase(organization_id);
  } catch (error) {
    console.log("Error in getProjectsFromOrganization: ", error);
  }
};

export const updateProjectInOrganization = async (organization_id, project) => {
  try {
    return await updateProjectInOrganizationInDatabase(
      organization_id,
      project
    );
  } catch (error) {
    console.log("Error in updateProjectInOrganization: ", error);
  }
};

export const deleteProjectFromOrganization = async (
  organization_id,
  project
) => {
  try {
    return await deleteProjectFromOrganizationInDatabase(
      organization_id,
      project
    );
  } catch (error) {
    console.log("Error in deleteProjectFromOrganization: ", error);
  }
};
