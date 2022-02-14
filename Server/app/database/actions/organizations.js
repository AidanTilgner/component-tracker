import mongoose from "mongoose";
import OrganizationClass from "../../data/organization/organization.js";
import OrganizationModel from "../models/organization.js";
import UserModel from "../models/user.js";
import ProjectModel from "../models/project.js";

// * Organization
export const saveOrganizationToDatabase = async (organization) => {
  try {
    const newOrganization = new OrganizationClass(organization);
    if (!newOrganization.validate) {
      return newOrganization.validate();
    }
    const organizationModel = await OrganizationModel.create(newOrganization);
    await organizationModel.save();
    newOrganization.users.forEach(async (user) => {
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
    return newOrganization;
  } catch (error) {
    console.log("Error in saveOrganizationToDatabase: ", error);
    return {
      error: "Internal error saving organization to database",
    };
  }
};

export const updateOrganizationInDatabase = async (organization_id, update) => {
  try {
    const organizationModel = await OrganizationModel.findOneAndUpdate(
      { organization_id: organization_id },
      update,
      { new: true }
    ).exec();
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
    };
  } catch (error) {
    console.log("Error in updateOrganizationInDatabase: ", error);
    return {
      error: "Internal error updating organization in database",
    };
  }
};

export const deleteOrganizationFromDatabase = async (organization_id) => {
  try {
    const organizationModel = await OrganizationModel.findOneAndDelete({
      organization_id,
    }).exec();
    if (!organizationModel) {
      return {
        error: "Organization not found",
      };
    }
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
      projects: organizationModel.projects,
      users: organizationModel.users,
      created: organizationModel.created,
      edited: organizationModel.edited,
    };
  } catch (error) {
    console.log("Error in deleteOrganizationFromDatabase: ", error);
    return {
      error: "Internal error deleting organization from database",
    };
  }
};

// * Users
export const addUserToOrganizationInDatabase = async (
  organization_id,
  user_id
) => {
  try {
    const { username } = await UserModel.findOne({ user_id }).exec();
    if (!username) {
      return {
        error: "User not found",
      };
    }
    const organizationModel = await OrganizationModel.findOneAndUpdate(
      { organization_id },
      {
        $push: {
          users: {
            user_id,
            username,
          },
        },
      },
      { new: true }
    ).exec();
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
    };
  } catch (error) {
    console.log("Error in addUserToOrganizationInDatabase: ", error);
    return {
      error: "Internal error adding user to organization in database",
    };
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
    if (!organizationModel) {
      return {
        error: "Organization not found",
      };
    }
    return {
      organization_id: organizationModel.organization_id,
      name: organizationModel.name,
      users: organizationModel.users,
      created: organizationModel.created,
      edited: organizationModel.edited,
    };
  } catch (error) {
    console.log("Error in updateUserInOrganizationInDatabase: ", error);
    return {
      error: "Internal error updating user in organization in database",
    };
  }
};

export const deleteUserFromOrganizationInDatabase = async (
  organization_id,
  user_id
) => {
  try {
    const organizationModel = await OrganizationModel.findOneAndUpdate(
      { organization_id },
      { $pull: { users: { user_id } } },
      { new: true }
    ).exec();
    if (!organizationModel) {
      return {
        error: "Organization not found",
      };
    }
    return {
      organization_id: organizationModel.organization_id,
      name: organizationModel.name,
      users: organizationModel.users,
      created: organizationModel.created,
      edited: organizationModel.edited,
    };
  } catch (error) {
    console.log("Error in deleteUserFromOrganizationInDatabase: ", error);
    return {
      error: "Internal error deleting user from organization in database",
    };
  }
};

// * Projects
export const addProjectToOrganizationInDatabase = async (
  organization_id,
  project_id
) => {
  try {
    const project = await ProjectModel.findOne({
      project_id: project_id,
    }).exec();
    if (!project) {
      return {
        error: "Project not found with id: " + project_id,
      };
    }
    const organizationModel = await OrganizationModel.findOneAndUpdate(
      { organization_id },
      {
        $push: {
          projects: {
            project_id: project_id,
            name: project.name,
            framework: project.framework,
            created: project.created,
            edited: project.edited,
          },
        },
      },
      { new: true }
    ).exec();
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
    };
  } catch (error) {
    console.log("Error in addProjectToOrganizationInDatabase: ", error);
    return {
      error: "Internal error adding project to organization in database",
    };
  }
};

export const updateProjectInOrganizationInDatabase = async (
  organization_id,
  project_id
) => {
  try {
    console.log("Updating project in organization");
    // Find a project in the organization with the smae project_id and update it
    const project = await ProjectModel.findOne({
      project_id: project_id,
    }).exec();
    const organizationModel = await OrganizationModel.findOneAndUpdate(
      {
        organization_id: organization_id,
        "projects.project_id": project.project_id,
      },
      {
        $set: {
          "projects.$.project_id": project.project_id,
          "projects.$.name": project.name,
          "projects.$.framework": project.framework,
          "projects.$.created": project.created,
          "projects.$.edited": project.edited,
        },
      },
      { new: true }
    ).exec();

    await organizationModel.save();
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
    };
  } catch (error) {
    console.log("Error in updateProjectInOrganizationInDatabase: ", error);
    return {
      error: "Internal error updating project in organization in database",
    };
  }
};

export const deleteProjectFromOrganizationInDatabase = async (
  organization_id,
  project_id
) => {
  try {
    const organizationModel = await OrganizationModel.findOneAndUpdate(
      { organization_id },
      { $pull: { projects: { project_id: project_id } } },
      { new: true }
    ).exec();
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
    };
  } catch (error) {
    console.log("Error in deleteProjectFromOrganizationInDatabase: ", error);
    return {
      error: "Internal error deleting project from organization in database",
    };
  }
};
