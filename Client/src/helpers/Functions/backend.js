/** @purpose This file contains functions that fetch data from the server */

// * Global variables
const baseURL = SERVER_URL;
const EP = {
  users: "/users",
  projects: "/projects",
};

// * User Functions
export const getUserFromLogin = async (username, password) => {
  try {
    return await fetch(
      `${baseURL}${EP.users}/login?username=${username}&password=${password}`
    ).then((res) => res.json());
  } catch (error) {
    console.error("Error: ", error);
  }
};

export const addUserFromSignup = async (username, email, password) => {
  // http://localhost:8080/users/add
  // Needs to match this url
  const url = `${baseURL}${EP.users}/add`;
  const response = await axios.post(url, {
    username,
    email,
    password,
  });
  return res.data;
};

export const getUser = async (id) => {
  const response = await axios.get(`${baseURL}${EP.users}/?id=${id}`);
  return response.data;
};

export const getUserProjects = async (id) => {
  const response = await axios.get(`${SERVER_URL}${EP.users}projects?id=${id}`);
  return response.data;
};

export const updateUser = async (id, update) => {
  const response = await axios.put(`${baseURL}${EP.users}/?id=${id}`, {
    update,
  });
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await axios.delete(`${baseURL}${EP.users}/?$id={id}`);
  return response.data;
};

// * Project Functions
export const addProject = async (project) => {
  const response = await axios.post(`${baseURL}${EP.projects}`, {
    project,
  });
  return response.data;
};

export const getProject = async (projectID) => {
  const response = await axios.get(
    `${baseURL}${EP.projects}/?projectID=${projectID}`
  );
  return response.data;
};

export const updateProject = async (projectID, update) => {
  const response = await axios.put(
    `${baseURL}${EP.projects}/?projectID=${projectID}`,
    {
      update,
    }
  );
  return response.data;
};

export const deleteProject = async (projectID) => {
  const response = await axios.delete(
    `${baseURL}${EP.projects}/?projectID=${projectID}`
  );
  return response.data;
};

// * Component Functions
export const addComponent = async (projectID, component) => {
  const response = await axios.post(
    `${baseURL}${EP.projects}/component?projectID=${projectID}`,
    {
      component,
    }
  );
  return response.data;
};

export const getComponent = async (projectID, name) => {
  const response = await axios.get(
    `${baseURL}${EP.projects}/component?projectID=${projectID}&name=${name}`
  );
  return response.data;
};

export const updateComponent = async (projectID, name, update) => {
  const response = await axios.put(
    `${baseURL}${EP.projects}/component?projectID=${projectID}&name=${name}`,
    {
      update,
    }
  );
  return response.data;
};

export const deleteComponent = async (projectID, name) => {
  const response = await axios.delete(
    `${baseURL}${EP.projects}/component?projectID=${projectID}&name=${name}`
  );
  return response.data;
};
