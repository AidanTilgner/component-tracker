import mongoose from "mongoose";
import OrganizationClass from "../../data/organization/organization.js";
import OrganizationModel from "../models/organization.js";

export const saveOrganizationToDatabase = async (organization) => {
  console.log("Raw Organization: ", organization);
  const newOrganization = new OrganizationClass(organization);
  console.log("New Organization: ", newOrganization);
  const organizationModel = await OrganizationModel.create(newOrganization);
  await organizationModel.save();
  console.log("Organization Model: ", organizationModel);
  newOrganization.users.forEach(async (user) => {
    console.log("Adding organization to user: ", {
      organization_id: newOrganization.organization_id,
      name: newOrganization.name,
      created: organizationModel.created,
      edited: organizationModel.edited,
    });
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
    id: newOrganization.organization_id,
    name: newOrganization.name,
    created: newOrganization.created,
    edited: newOrganization.edited,
  };
};
