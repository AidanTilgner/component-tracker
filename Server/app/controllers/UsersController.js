// Helpers
import {
  updateUserInDatabase,
  deleteUserFromDatabase,
} from "../database/actions/users.js";
import {
  getUserFromDatabase,
  getUserProjectsFromDatabase,
  getUserOrganizationsFromDatabase,
  getUsersFromDatabaseBySearch,
  addFriendRequestInDatabase,
} from "../database/queries/users.js";
import { filterForMessages } from "../helpers/routing.js";

export const getUser = async (user_id) => {
  try {
    const user = await getUserFromDatabase(user_id);
    if (filterForMessages(user)) {
      return filterForMessages(user);
    }
    return {
      user,
      message: "User successfully retrieved",
    };
  } catch (error) {
    console.log("Error in getUser: ", error);
    return {
      error: "Internal error getting user",
    };
  }
};

export const updateUser = async (user_id, update) => {
  try {
    const updatedUser = await updateUserInDatabase(user_id, update);
    if (filterForMessages(updatedUser)) {
      return filterForMessages(updatedUser);
    }
    return {
      user: updatedUser,
      message: "User successfully updated",
    };
  } catch (error) {
    console.log("Error in updateUser: ", error);
    return {
      error: "Internal error updating user",
    };
  }
};

export const deleteUser = async (user_id) => {
  try {
    const deletedUser = await deleteUserFromDatabase(user_id);
    if (filterForMessages(deletedUser)) {
      return filterForMessages(deletedUser);
    }
    return {
      user: deletedUser,
      message: "User successfully deleted",
    };
  } catch (error) {
    console.log("Error in deleteUser: ", error);
    return {
      error: "Internal error deleting user",
    };
  }
};

export const getProjects = async (user_id) => {
  try {
    const projects = await getUserProjectsFromDatabase(user_id);
    if (filterForMessages(projects)) {
      return filterForMessages(projects);
    }
    return {
      projects,
      message: "Projects successfully retrieved",
    };
  } catch (error) {
    console.log("Error in getProjects: ", error);
    return {
      error: "Internal error getting projects",
    };
  }
};

export const getOrganizations = async (user_id) => {
  try {
    const organizations = await getUserOrganizationsFromDatabase(user_id);
    if (filterForMessages(organizations)) {
      return filterForMessages(organizations);
    }
    return {
      organizations,
      message: "Organizations successfully retrieved",
    };
  } catch (error) {
    console.log("Error in getOrganizations: ", error);
    return {
      error: "Internal error getting organizations",
    };
  }
};

export const getUsersFromSearch = async (search) => {
  try {
    const users = await getUsersFromDatabaseBySearch(search);
    if (filterForMessages(users)) {
      return filterForMessages(users);
    }
    return {
      users,
      message: "Users successfully retrieved",
    };
  } catch (error) {
    console.log("Error in getUsersFromSearch: ", error);
    return {
      error: "Internal error getting users",
    };
  }
};

export const sendFriendRequest = async (user_id, friend_id) => {
  try {
    const friendRequest = await addFriendRequestInDatabase(user_id, friend_id);
    if (filterForMessages(friendRequest)) {
      return filterForMessages(friendRequest);
    }
    return {
      friendRequest,
    };
  } catch (error) {
    console.log("Error in sendFriendRequest: ", error);
    return {
      error: "Internal error sending friend request",
    };
  }
};
