// Helpers
import {
  updateUserInDatabase,
  deleteUserFromDatabase,
} from "../database/actions/users.js";
import {
  getUserFromDatabase,
  getUserProjectsFromDatabase,
  getUserOrganizationsFromDatabase,
} from "../database/queries/users.js";

export const getUser = async (user_id) => {
  try {
    return await getUserFromDatabase(user_id);
  } catch (error) {
    console.log("Error in getUser: ", error);
  }
};

export const updateUser = async (user_id, update) => {
  try {
    return await updateUserInDatabase(user_id, update);
  } catch (error) {
    console.log("Error in updateUser: ", error);
  }
};

export const deleteUser = async (user_id) => {
  try {
    return await deleteUserFromDatabase(user_id);
  } catch (error) {
    console.log("Error in deleteUser: ", error);
  }
};

export const getProjects = async (user_id) => {
  try {
    return await getUserProjectsFromDatabase(user_id);
  } catch (error) {
    console.log("Error in getProjects: ", error);
  }
};

export const getOrganizations = async (user_id) => {
  try {
    return await getUserOrganizationsFromDatabase(user_id);
  } catch (error) {
    console.log("Error in getOrganizations: ", error);
  }
};
