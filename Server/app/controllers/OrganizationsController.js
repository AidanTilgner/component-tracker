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
  return await saveOrganizationToDatabase(organization);
};

export const getOrganization = async (organization_id) => {
  return await getOrganizationFromDatabase(organization_id);
};

export const updateOrganization = async (organization_id, organization) => {
  return await updateOrganizationInDatabase(organization_id, organization);
};

export const deleteOrganization = async (organization_id) => {
  return await deleteOrganizationFromDatabase(organization_id);
};

// * User
export const addUserToOrganization = async (organization_id, user) => {
  return await addUserToOrganizationInDatabase(organization_id, user);
};

export const getUsersFromOrganization = async (organization_id) => {
  return await getUsersInOrganizationFromDatabase(organization_id);
};

export const updateUserInOrganization = async (organization_id, user) => {
  return await updateUserInOrganizationInDatabase(organization_id, user);
};

export const removeUserFromOrganization = async (organization_id, user) => {
  return await deleteUserFromOrganizationInDatabase(organization_id, user);
};

// * Projects
export const addProjectToOrganization = async (organization_id, project) => {
  return await addProjectToOrganizationInDatabase(organization_id, project);
};

export const getProjectsFromOrganization = async (organization_id) => {
  return await getProjectsFromOrganizationInDatabase(organization_id);
};

export const updateProjectInOrganization = async (organization_id, project) => {
  return await updateProjectInOrganizationInDatabase(organization_id, project);
};

export const deleteProjectFromOrganization = async (
  organization_id,
  project
) => {
  return await deleteProjectFromOrganizationInDatabase(
    organization_id,
    project
  );
};
