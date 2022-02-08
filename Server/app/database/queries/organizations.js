import OrganizationModel from "../models/organization.js";

export const getProjectsFromOrganizationInDatabase = async (
  organization_id
) => {
  try {
    const organizationModel = await OrganizationModel.findOne({
      organization_id,
    }).exec();
    if (!organizationModel) {
      return {
        error: "Organization not found",
      };
    }
    return {
      projects: organizationModel.projects,
      message: "Projects successfully retrieved",
    };
  } catch (error) {
    console.log("Error in getProjectsFromOrganizationInDatabase: ", error);
    return {
      error: "Internal error getting projects from organization in database",
    };
  }
};

export const getUsersInOrganizationFromDatabase = async (organization_id) => {
  try {
    const organizationModel = await OrganizationModel.findOne({
      organization_id,
    }).exec();
    return {
      users: organizationModel.users,
      message: "Users successfully retrieved",
    };
  } catch (error) {
    console.log("Error in getUsersInOrganizationFromDatabase: ", error);
    return {
      error: "Internal error getting users in organization from database",
    };
  }
};

export const getOrganizationFromDatabase = async (organization_id) => {
  try {
    const organizationModel = await OrganizationModel.findOne({
      organization_id,
    }).exec();
    if (!organizationModel) {
      return {
        error: "Organization not found",
      };
    }
    return {
      organization_id: organizationModel.organization_id,
      name: organizationModel.name,
      projects: organizationModel.projects,
      users: organizationModel.users,
      created: organizationModel.created,
      edited: organizationModel.edited,
      message: "Organization successfully retrieved",
    };
  } catch (error) {
    console.log("Error in getOrganizationFromDatabase: ", error);
    return {
      error: "Internal error getting organization from database",
    };
  }
};
