import { saveOrganizationToDatabase } from "../database/actions/organizations.js";

export const createOrganization = async (organization) => {
  return await saveOrganizationToDatabase(organization);
};
