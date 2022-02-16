import mongoose from "mongoose";

// * User
import UserModel from "../models/user.js";
import UserClass from "../../data/user/user.js";

// * Project
import ProjectModel from "../models/project.js";
import ProjectClass from "../../data/project/project.js";

// * Tokens
import Token from "../models/token.js";
import Project from "../../data/project/project.js";

// * Organization
import OrganizationModel from "../models/organization.js";
import OrganizationClass from "../../data/organization/organization.js";

export const saveUserToDatabase = async (user) => {
  try {
    const newUser = new UserClass(user);
    if (!newUser.validate) {
      return newUser.validate();
    }
    const userModel = await UserModel.create(newUser);
    await userModel.save();
    if (!userModel) {
      return {
        error: "Error saving user to database",
      };
    }
    return {
      user_id: userModel.user_id,
      username: userModel.username,
      email: userModel.email,
      role: userModel.role,
      projects: userModel.projects,
      organizations: userModel.organizations,
    };
  } catch (error) {
    console.log("Error in saveUserToDatabase: ", error);
    return {
      error: "Internal error saving user to database",
    };
  }
};

export const getUserFromDatabase = async (user_id) => {
  try {
    const user = await UserModel.findOne({ user_id: user_id }).exec();
    if (!user) {
      return {
        error: "User not found",
      };
    }
    return user;
  } catch (error) {
    console.log("Error in getUserFromDatabase: ", error);
    return {
      error: "Internal error getting user from database",
    };
  }
};

export const updateUserInDatabase = async (user_id, update) => {
  try {
    const user = await UserModel.findOneAndUpdate(
      { user_id: user_id },
      update,
      {
        new: true,
      }
    ).exec();
    if (!user) {
      return {
        error: "User not found",
      };
    }
    const organizations = user.organizations;
    organizations.forEach(async (organization) => {
      OrganizationModel.findOneAndUpdate(
        { organization_id: organization.organization_id },
        { $pull: { users: { user_id: user_id } } },
        { $push: { users: { user_id: user_id, username: user.username } } },
        {
          new: true,
        }
      ).exec();
    });
    return user;
  } catch (error) {
    console.log("Error in updateUserInDatabase: ", error);
    return {
      error: "Internal error updating user in database",
    };
  }
};

export const deleteUserFromDatabase = async (user_id) => {
  try {
    const user = await UserModel.findOneAndDelete({ user_id: user_id }).exec();
    if (!user) {
      return {
        error: "User not found",
      };
    }
    return user;
  } catch (error) {
    console.log("Error in deleteUserFromDatabase: ", error);
    return {
      error: "Internal error deleting user from database",
    };
  }
};

export const addProjectToUserInDatabase = async (user_id, project_id) => {
  try {
    console.log("User_id: ", user_id);
    console.log("Project_id: ", project_id);
    const project = await ProjectModel.findOne({
      project_id: project_id,
    }).exec();
    const user = await UserModel.findOneAndUpdate(
      { user_id: user_id },
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
      {
        new: true,
      }
    ).exec();
    if (!user) {
      return {
        error: "User not found",
      };
    }
    return user;
  } catch (error) {
    console.log("Error in addProjectToUserInDatabase: ", error);
    return {
      error: "Internal error adding project to user in database",
    };
  }
};

export const updateProjectInUserInDatabase = async (user_id, project_id) => {
  try {
    console.log("Updating project in user in database");
    const project = await ProjectModel.findOne({
      project_id: project_id,
    }).exec();
    const user = await UserModel.findOneAndUpdate(
      { user_id: user_id, "projects.project_id": project_id },
      {
        $set: {
          "projects.$.name": project.name,
          "projects.$.framework": project.framework,
          "projects.$.created": project.created,
          "projects.$.edited": project.edited,
        },
      },
      {
        new: true,
      }
    ).exec();
    if (!user) {
      return {
        error: "User not found",
      };
    }
    return user;
  } catch (error) {
    console.log("Error in updateProjectInUserInDatabase: ", error);
    return {
      error: "Internal error updating project in user in database",
    };
  }
};

export const deleteProjectFromUserInDatabase = async (user_id, project_id) => {
  try {
    const user = await UserModel.findOneAndUpdate(
      { user_id: user_id },
      {
        $pull: {
          projects: {
            project_id: project_id,
          },
        },
      },
      {
        new: true,
      }
    ).exec();
    if (!user) {
      return {
        error: "User not found",
      };
    }
    return user;
  } catch (error) {
    console.log("Error in deleteProjectFromUserInDatabase: ", error);
    return {
      error: "Internal error deleting project from user in database",
    };
  }
};

export const addFriendRequestInDatabase = async (user_id, friend_id) => {
  try {
    const user = await UserModel.findOne({ user_id: user_id }).exec();
    const friend = await UserModel.findOne({ user_id: friend_id }).exec();
    if (!user) {
      return {
        error: "User not found",
      };
    }
    if (!friend) {
      return {
        error: "Friend not found",
      };
    }
    user.friend_requests.sent.push({
      user_id: friend_id,
      username: friend.username,
    });
    friend.friend_requests.received.push({
      user_id: user_id,
      username: user.username,
    });
    await user.save();
    await friend.save();
    return {
      message: "Friend request successfully sent",
    };
  } catch (err) {
    console.log("Error adding friend request to user in database: " + err);
    return {
      error: "Internal error adding friend request to user in database",
    };
  }
};

export const acceptFriendRequestInDatabase = async (user_id, friend_id) => {
  try {
    const friend = await UserModel.findOne({ user_id: friend_id });
    if (!friend) {
      return {
        error: "User not found",
      };
    }
    const user = await UserModel.findOne({ user_id: user_id }).exec();
    if (!user) {
      return {
        error: "User not found",
      };
    }
    friend.friends.push({
      user_id: user_id,
      username: user.username,
    });
    friend.friend_requests.sent = friend.friend_requests.sent.filter(
      (friend_request) => friend_request.user_id !== user_id
    );
    user.friends.push({
      user_id: friend_id,
      username: friend.username,
    });
    user.friend_requests.received = user.friend_requests.received.filter(
      (friend_request) => friend_request.user_id !== friend_id
    );
    await friend.save();
    await user.save();
    return user;
  } catch (error) {
    console.log("Error in acceptFriendRequestInDatabase: ", error);
    return {
      error: "Internal error accepting friend request in database",
    };
  }
};

export const rejectFriendRequestInDatabase = async (user_id, friend_id) => {
  try {
    const user = await UserModel.findOne({ user_id: user_id }).exec();
    if (!user) {
      return {
        error: "User not found",
      };
    }
    const friend = await UserModel.findOne({ user_id: friend_id });
    if (!friend) {
      return {
        error: "User not found",
      };
    }
    user.friend_requests.received = user.friend_requests.received.filter(
      (friend_request) => {
        return friend_request.user_id !== friend_id;
      }
    );
    friend.friend_requests.sent = friend.friend_requests.sent.filter(
      (friend_request) => {
        return friend_request.user_id !== user_id;
      }
    );
    await user.save();
    await friend.save();
    return user;
  } catch (error) {
    console.log("Error in rejectFriendRequestInDatabase: ", error);
    return {
      error: "Internal error rejecting friend request in database",
    };
  }
};

export const removeFriendInDatabase = async (user_id, friend_id) => {
  try {
    const user = await UserModel.findOne({ user_id: user_id }).exec();
    if (!user) {
      return {
        error: "User not found",
      };
    }
    const friend = await UserModel.findOne({ user_id: friend_id });
    if (!friend) {
      return {
        error: "User not found",
      };
    }
    user.friends = user.friends.filter((friend) => {
      return friend.user_id !== friend_id;
    });
    friend.friends = friend.friends.filter((friend) => {
      return friend.user_id !== user_id;
    });
    await user.save();
    await friend.save();
    return user;
  } catch (error) {
    console.log("Error in removeFriendInDatabase: ", error);
    return {
      error: "Internal error removing friend in database",
    };
  }
};
