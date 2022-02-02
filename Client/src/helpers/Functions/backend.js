/** @purpose This file contains functions that fetch data from the server */

import { tokens } from "../../data/user";
let accessToken, refreshToken;
tokens.subscribe((tokens) => {
  accessToken = tokens.access;
  refreshToken = tokens.refresh;
});

// * Global variables
const baseURL = SERVER_URL;
const EP = {
  users: "/users",
  projects: "/projects",
  auth: "/auth",
};

// * Auth Functions
export const login = async (username, password) => {
  const response = await fetch(`${baseURL}${EP.auth}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  const data = await response.json();
  return data;
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

export const getUser = async (id) => {
  try {
    return await fetch(`${baseURL}${EP.users}/?id=${id}`, {
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

export const getUserProjects = async (id) => {
  try {
    return await fetch(`${baseURL}${EP.users}/?id=${id}/projects`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => res.json());
  } catch (error) {
    console.error("Error in getUserProjects: ", error);
  }
};

export const updateUser = async (id, update) => {
  try {
    return await fetch(`${baseURL}${EP.users}/?id=${id}`, {
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

export const deleteUser = async (id) => {
  try {
    return await fetch(`${baseURL}${EP.users}/?id=${id}`, {
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
    return await fetch(`${baseURL}${EP.projects}/add`, {
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
    }).then((res) => res.json());
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
    ).then((res) => console.log("Response: ", res.json()));
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
