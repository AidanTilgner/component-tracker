/** @purpose This file contains functions that fetch data from the server */
import axios from "axios";

// * Global variables
const baseURL = process.env.SERVER_URL;
const EP = {
  users: "/users",
  projects: "/projects",
};

// * User Functions
export const getUserFromLogin = async (username, password) => {
  // http://localhost:8080/users/login?username=Aidan.Tilgner&password=password
  // Needs to match this url
  const url = `${baseURL}${EP.users}/login?username=${username}&password=${password}`;
  const response = await axios.get(url);
  return res.data;
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
  const response = await axios.get(`/api/users/${id}/projects`);
  return response.data;
};
