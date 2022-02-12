/** @purpose This file contains functions that fetch data from the server */

import { tokens, user } from "../../data/user";
import { deleteFromLocalStorage, deleteFromSessionStorage } from "./local";
import { goto } from "@roxi/routify";
let accessToken, refreshToken;
let userData = {};
tokens.subscribe((tokens) => {
  accessToken = tokens.access;
  refreshToken = tokens.refresh;
});
user.subscribe((user) => {
  userData = user;
});

// * Global variables
const baseURL = SERVER_URL;
const EP = {
  users: "/users",
  projects: "/projects",
  auth: "/auth",
  organizations: "/organizations",
};

// * Auth Functions
export const login = async (username, password) => {
  try {
    const response = await fetch(`${baseURL}${EP.auth}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("Error in login: ", err);
  }
};

export const signUp = async (username, email, password) => {
  try {
    const response = await fetch(`${baseURL}${EP.auth}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("Error in signUp: ", err);
  }
};

export const logout = async () => {
  try {
    const response = await fetch(`${baseURL}${EP.auth}/logout`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ refreshToken }),
    });
    const data = await response.json();
    deleteFromLocalStorage("refreshToken");
    deleteFromLocalStorage("user");
    deleteFromSessionStorage("accessToken");
    tokens.set({ access: "", refresh: "" });
    return data;
  } catch (err) {
    console.log("Error in logout: ", err);
  }
};

export const refreshAccessToken = async (refreshToken) => {
  try {
    return await fetch(`${baseURL}${EP.auth}/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshToken}`,
      },
      body: JSON.stringify({ refreshToken }),
    }).then((res) => res.json());
  } catch (error) {
    console.error("Error in refreshAccessToken: ", error);
    return false;
  }
};

// * User Functions
export const getUserFromLogin = async (username, password) => {
  try {
    return await fetch(
      `${baseURL}${EP.users}/login?username=${username}&password=${password}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).then((res) => res.json());
  } catch (error) {
    console.error("Error in getUserFromLogin: ", error);
    return false;
  }
};

export const addUserFromSignup = async (username, email, password) => {
  // http://localhost:8080/users/add
  // Needs to match this url
  try {
    return await fetch(`${baseURL}${EP.users}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    }).then((res) => res.json());
  } catch (err) {
    console.error("Error in addUserFromSignup: ", err);
  }
};

export const getUser = async (userID) => {
  try {
    return await fetch(`${baseURL}${EP.users}/?userID=${userID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => res.json());
  } catch (error) {
    console.error("Error in getUser: ", error);
  }
};

export const getUserProjects = async (userID) => {
  try {
    if (accessToken === "") {
      accessToken = sessionStorage.getItem("accessToken");
    }
    return await fetch(`${baseURL}${EP.users}/projects?userID=${userID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => {
      return res.json();
    });
  } catch (error) {
    console.error("Error in getUserProjects: ", error);
  }
};

export const getUserOrganizations = async (userID) => {
  try {
    if (accessToken === "") {
      accessToken = sessionStorage.getItem("accessToken");
    }
    return await fetch(`${baseURL}${EP.users}/organizations?userID=${userID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => res.json());
  } catch (error) {
    console.error("Error in getUserOrganizations: ", error);
  }
};

export const updateUser = async (userID, update) => {
  try {
    return await fetch(`${baseURL}${EP.users}/?userID=${userID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(update),
    }).then((res) => res.json());
  } catch (error) {
    console.error("Error in updateUser: ", error);
  }
};

export const deleteUser = async (userID) => {
  try {
    return await fetch(`${baseURL}${EP.users}/?userID=${userID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => res.json());
  } catch (error) {
    console.error("Error in deleteUser: ", error);
  }
};

// * Project Functions
export const addProject = async (project) => {
  try {
    return await fetch(`${baseURL}${EP.projects}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(project),
    }).then((res) => res.json());
  } catch (error) {
    console.error("Error in addProject: ", error);
  }
};

export const getProject = async (projectID) => {
  try {
    return await fetch(`${baseURL}${EP.projects}/?projectID=${projectID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => {
      return res.json();
    });
  } catch (error) {
    console.error("Error in getProject: ", error);
  }
};

export const updateProject = async (projectID, update) => {
  try {
    return await fetch(`${baseURL}${EP.projects}/?projectID=${projectID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(update),
    }).then((res) => res.json());
  } catch (error) {
    console.error("Error in updateProject: ", error);
  }
};

export const deleteProject = async (projectID) => {
  try {
    return await fetch(`${baseURL}${EP.projects}/?projectID=${projectID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => res.json());
  } catch (error) {
    console.error("Error in deleteProject: ", error);
  }
};

// * Component Functions
export const addComponent = async (projectID, component) => {
  try {
    return await fetch(
      `${baseURL}${EP.projects}/component?projectID=${projectID}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(component),
      }
    ).then((res) => res.json());
  } catch (error) {
    console.error("Error in addComponent: ", error);
    alert("Error in addComponent: ", error);
  }
};

export const getComponent = async (projectID, name) => {
  try {
    return await fetch(
      `${baseURL}${EP.projects}/component?projectID=${projectID}&name=${name}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).then((res) => res.json());
  } catch (error) {
    console.error("Error in getComponent: ", error);
  }
};

export const updateComponent = async (projectID, name, update) => {
  try {
    return await fetch(
      `${baseURL}${EP.projects}/component?projectID=${projectID}&name=${name}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(update),
      }
    ).then((res) => res.json());
  } catch (error) {
    console.error("Error in updateComponent: ", error);
  }
};

export const deleteComponent = async (projectID, name) => {
  try {
    return await fetch(
      `${baseURL}${EP.projects}/component?projectID=${projectID}&name=${name}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).then((res) => res.json());
  } catch (error) {
    console.error("Error in deleteComponent: ", error);
  }
};

// * Organization Functions
export const addOrganization = async (organization) => {
  try {
    return await fetch(`${baseURL}${EP.organizations}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(organization),
    }).then((res) => res.json());
  } catch (error) {
    console.error("Error in addOrganization: ", error);
  }
};

export const getOrganization = async (organizationID) => {
  try {
    return await fetch(
      `${baseURL}${EP.organizations}/?organizationID=${organizationID}&userID=${userData.user_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).then((res) => res.json());
  } catch (error) {
    console.error("Error in getOrganization: ", error);
  }
};

export const updateOrganization = async (organizationID, update) => {
  try {
    return await fetch(
      `${baseURL}${EP.organizations}/?organizationID=${organizationID}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(update),
      }
    ).then((res) => res.json());
  } catch (error) {
    console.error("Error in updateOrganization: ", error);
  }
};

export const deleteOrganization = async (organizationID) => {
  try {
    return await fetch(
      `${baseURL}${EP.organizations}/?organizationID=${organizationID}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).then((res) => res.json());
  } catch (error) {
    console.error("Error in deleteOrganization: ", error);
  }
};

export const addUserToOrganization = async (organizationID, userID) => {
  try {
    return await fetch(
      `${baseURL}${EP.organizations}/user?organizationID=${organizationID}&userID=${userID}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).then((res) => res.json());
  } catch (error) {
    console.error("Error in addUserToOrganization: ", error);
  }
};

export const removeUserFromOrganization = async (organizationID, userID) => {
  try {
    return await fetch(
      `${baseURL}${EP.organizations}/user?organizationID=${organizationID}&userID=${userID}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).then((res) => res.json());
  } catch (error) {
    console.error("Error in removeUserFromOrganization: ", error);
  }
};

export const addProjectToOrganization = async (organizationID, projectID) => {
  try {
    return await fetch(
      `${baseURL}${EP.organizations}/project?organizationID=${organizationID}&projectID=${projectID}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).then((res) => res.json());
  } catch (error) {
    console.error("Error in addProjectToOrganization: ", error);
  }
};

export const removeProjectFromOrganization = async (
  organizationID,
  projectID
) => {
  try {
    return await fetch(
      `${baseURL}${EP.organizations}/project?organizationID=${organizationID}&projectID=${projectID}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).then((res) => res.json());
  } catch (error) {
    console.error("Error in removeProjectFromOrganization: ", error);
  }
};
