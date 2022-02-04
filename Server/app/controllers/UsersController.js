// Helpers
import {
  getUserFromDatabase,
  updateUserInDatabase,
  deleteUserFromDatabase,
} from "../database/actions/users.js";
import { getUserProjectsFromDatabase } from "../database/queries/users.js";

export const getUser = async (user_id) => {
  return await getUserFromDatabase(user_id);
};

export const updateUser = async (user_id, update) => {
  return await updateUserInDatabase(user_id, update);
};

export const deleteUser = async (user_id) => {
  return await deleteUserFromDatabase(user_id);
};

export const getProjects = async (user_id) => {
  return await getUserProjectsFromDatabase(user_id);
};
