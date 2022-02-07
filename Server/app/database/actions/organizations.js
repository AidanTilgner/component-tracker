import mongoose from "mongoose";
import OrganizationClass from "../../data/organization/organization.js";
import OrganizationModel from "../models/organization.js";
import UserModel from "../models/user.js";

// * Organization
export const saveOrganizationToDatabase = async (organization) => {
  try {
    const newOrganization = new OrganizationClass(organization);
    const organizationModel = await OrganizationModel.create(newOrganization);
    await organizationModel.save();
    newOrganization.users.forEach(async (user) => {
      console.log("Adding organization to user: ", user.user_id);
      UserModel.findOneAndUpdate(
        { user_id: user.user_id },
        {
          $push: {
            organizations: {
              organization_id: newOrganization.organization_id,
              name: newOrganization.name,
              created: organizationModel.created,
              edited: organizationModel.edited,
            },
          },
        },
        { new: true }
      ).exec();
    });
    return {
      organization_id: newOrganization.organization_id,
      name: newOrganization.name,
      created: newOrganization.created,
      edited: newOrganization.edited,
    };
  } catch (error) {
    console.log("Error in saveOrganizationToDatabase: ", error);
  }
};

export const getOrganizationFromDatabase = async (organization_id) => {
  try {
    const organizationModel = await OrganizationModel.findOne({
      organization_id,
    }).exec();
    return {
      organization_id: organizationModel.organization_id,
      name: organizationModel.name,
      created: organizationModel.created,
      edited: organizationModel.edited,
    };
  } catch (error) {
    console.log("Error in getOrganizationFromDatabase: ", error);
  }
};

export const updateOrganizationInDatabase = async (organization_id, update) => {
  try {
    const organizationModel = await OrganizationModel.findOneAndUpdate(
      { organization_id },
      update,
      { new: true }
    ).exec();
    return {
      organization_id: organizationModel.organization_id,
      name: organizationModel.name,
      created: organizationModel.created,
      edited: organizationModel.edited,
    };
  } catch (error) {
    console.log("Error in updateOrganizationInDatabase: ", error);
  }
};

export const deleteOrganizationFromDatabase = async (organization_id) => {
  try {
    const organizationModel = await OrganizationModel.findOneAndDelete({
      organization_id,
    }).exec();
    UserModel.findOneAndUpdate(
      {},
      {
        $pull: {
          organizations: {
            organization_id,
          },
        },
      },
      { multi: true }
    ).exec();
    return {
      organization_id: organizationModel.organization_id,
      name: organizationModel.name,
      created: organizationModel.created,
      edited: organizationModel.edited,
    };
  } catch (error) {
    console.log("Error in deleteOrganizationFromDatabase: ", error);
  }
};

// * Users
export const addUserToOrganizationInDatabase = async (
  organization_id,
  user
) => {
  try {
    const organizationModel = await OrganizationModel.findOneAndUpdate(
      { organization_id },
      { $push: { users: user } },
      { new: true }
    ).exec();
    return {
      organization_id: organizationModel.organization_id,
      name: organizationModel.name,
      created: organizationModel.created,
      edited: organizationModel.edited,
    };
  } catch (error) {
    console.log("Error in addUserToOrganizationInDatabase: ", error);
  }
};

export const getUsersInOrganizationFromDatabase = async (organization_id) => {
  try {
    const organizationModel = await OrganizationModel.findOne({
      organization_id,
    }).exec();
    return organizationModel.users;
  } catch (error) {
    console.log("Error in getUsersInOrganizationFromDatabase: ", error);
  }
};

export const updateUserInOrganizationInDatabase = async (
  organization_id,
  user
) => {
  try {
    // Find a user in the organization with the smae user_id and update it
    const organizationModel = await OrganizationModel.findOneAndUpdate(
      { organization_id },
      { $pull: { users: { user_id: user.user_id } } },
      { $push: { users: user } },
      { new: true }
    ).exec();
    return {
      organization_id: organizationModel.organization_id,
    };
  } catch (error) {
    console.log("Error in updateUserInOrganizationInDatabase: ", error);
  }
};

export const deleteUserFromOrganizationInDatabase = async (
  organization_id,
  user
) => {
  try {
    const organizationModel = await OrganizationModel.findOneAndUpdate(
      { organization_id },
      { $pull: { users: { user_id: user.user_id } } },
      { new: true }
    ).exec();
    return {
      organization_id: organizationModel.organization_id,
      name: organizationModel.name,
      created: organizationModel.created,
      edited: organizationModel.edited,
    };
  } catch (error) {
    console.log("Error in deleteUserFromOrganizationInDatabase: ", error);
  }
};

// * Projects
export const addProjectToOrganizationInDatabase = async (
  organization_id,
  project
) => {
  try {
    const organizationModel = await OrganizationModel.findOneAndUpdate(
      { organization_id },
      { $push: { projects: project } },
      { new: true }
    ).exec();
    return {
      organization_id: organizationModel.organization_id,
      name: organizationModel.name,
      created: organizationModel.created,
      edited: organizationModel.edited,
    };
  } catch (error) {
    console.log("Error in addProjectToOrganizationInDatabase: ", error);
  }
};

export const getProjectsFromOrganizationInDatabase = async (
  organization_id
) => {
  try {
    const organizationModel = await OrganizationModel.findOne({
      organization_id,
    }).exec();
    return organizationModel.projects;
  } catch (error) {
    console.log("Error in getProjectsFromOrganizationInDatabase: ", error);
  }
};

export const updateProjectInOrganizationInDatabase = async (
  organization_id,
  project
) => {
  try {
    // Find a project in the organization with the smae project_id and update it
    const organizationModel = await OrganizationModel.findOneAndUpdate(
      { organization_id },
      { $pull: { projects: { project_id: project.project_id } } },
      { $push: { projects: project } },
      { new: true }
    ).exec();
  } catch (error) {
    console.log("Error in updateProjectInOrganizationInDatabase: ", error);
  }
};

export const deleteProjectFromOrganizationInDatabase = async (
  organization_id,
  project
) => {
  try {
    const organizationModel = await OrganizationModel.findOneAndUpdate(
      { organization_id },
      { $pull: { projects: { project_id: project.project_id } } },
      { new: true }
    ).exec();
    return {
      organization_id: organizationModel.organization_id,
      name: organizationModel.name,
      created: organizationModel.created,
      edited: organizationModel.edited,
    };
  } catch (error) {
    console.log("Error in deleteProjectFromOrganizationInDatabase: ", error);
  }
};
