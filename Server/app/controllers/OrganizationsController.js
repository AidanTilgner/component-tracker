import {
  saveOrganizationToDatabase,
  getOrganizationFromDatabase,
  updateOrganizationInDatabase,
  deleteOrganizationFromDatabase,
  addUserToOrganizationInDatabase,
  getUsersInOrganizationFromDatabase,
  updateUserInOrganizationInDatabase,
  deleteUserFromOrganizationInDatabase,
  addProjectToOrganizationInDatabase,
  getProjectsFromOrganizationInDatabase,
  updateProjectInOrganizationInDatabase,
  deleteProjectFromOrganizationInDatabase,
} from "../database/actions/organizations.js";

// * Organization
export const createOrganization = async (organization) => {
  try {
    return await saveOrganizationToDatabase(organization);
  } catch (error) {
    console.log("Error in createOrganization: ", error);
  }
};

export const getOrganization = async (organization_id) => {
  try {
    return await getOrganizationFromDatabase(organization_id);
  } catch (error) {
    console.log("Error in getOrganization: ", error);
  }
};

export const updateOrganization = async (organization_id, organization) => {
  try {
    return await updateOrganizationInDatabase(organization_id, organization);
  } catch (error) {
    console.log("Error in updateOrganization: ", error);
  }
};

export const deleteOrganization = async (organization_id) => {
  try {
    return await deleteOrganizationFromDatabase(organization_id);
  } catch (error) {
    console.log("Error in deleteOrganization: ", error);
  }
};

// * User
export const addUserToOrganization = async (organization_id, user) => {
  try {
    return await addUserToOrganizationInDatabase(organization_id, user);
  } catch (error) {
    console.log("Error in addUserToOrganization: ", error);
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
