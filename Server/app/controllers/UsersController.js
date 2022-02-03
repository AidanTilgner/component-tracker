// Classes
import User from "../data/user/user.js";

// Path Stuff
import FS, { writeFile, readFile } from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import path from "path";

// Helpers
import { getDataByFilepath, writeFileByFilepath } from "../helpers/files.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../helpers/tokens.js";

export const addUser = async (user) => {
  return await addUserToDatabase(user);
};

export const getUser = async (id) => {
  return await getUserFromDatabaseByID(id);
};

export const updateUser = async (id, update) => {
  return await updateUserInDatabase(id, update);
};

export const deleteUser = async (id) => {
  return await deleteUserFromDatabaseByID(id);
};

export const getProjects = async (id) => {
  return await getUserProjects(id);
};

export const getUserFromLogin = async (username, password) => {
  return await getUserFromDatabaseByLogin(username, password);
};

export const addProjectToUser = async (id, project) => {
  let data = await getDataByFilepath("../data/user/users.json");
  let user = data.find((user) => user.id === id);
  user.projects.push(project);
  writeFileByFilepath("../data/user/users.json", JSON.stringify(data));
  return user;
};

export const updateUserProject = async (id, projectID, update) => {
  let data = await getDataByFilepath("../data/user/users.json");
  let user = data.find((user) => user.id === id);
  let projectIndex = user.projects.findIndex(
    (project) => project.id === projectID
  );
  user.projects[projectIndex] = Object.assign(
    user.projects[projectIndex],
    update
  );
  writeFileByFilepath("../data/user/users.json", JSON.stringify(data));
  return user;
};

export const deleteUserProject = async (id, projectID) => {
  let data = await getDataByFilepath("../data/user/users.json");
  let user = data.find((user) => user.id === id);
  let projectIndex = user.projects.findIndex(
    (project) => project.id === projectID
  );
  user.projects.splice(projectIndex, 1);
  writeFileByFilepath("../data/user/users.json", JSON.stringify(data));
  return user;
};

const deleteUserFromDatabaseByID = async (id) => {
  let data = await getDataByFilepath("../data/user/users.json");
  data = data.filter((user) => user.id !== id);
  writeFileByFilepath("../data/user/users.json", JSON.stringify(data));
  return data;
};

const addUserToDatabase = async (user) => {
  user = new User(user);
  let data = await getDataByFilepath("../data/user/users.json");
  data.push(user);
  writeFileByFilepath("../data/user/users.json", JSON.stringify(data));
  return {
    id: user.id,
    username: user.username,
    email: user.email,
  };
};

const getUserFromDatabaseByID = async (id) => {
  let data = await getDataByFilepath("../data/user/users.json");
  return data.find((user) => user.id === id);
};

const updateUserInDatabase = async (id, update) => {
  let data = await getDataByFilepath("../data/user/users.json");
  let index = data.findIndex((u) => u.id === id);
  data[index] = Object.assign(data[index], update);
  writeFileByFilepath("../data/user/users.json", JSON.stringify(data));
  return data[index];
};

const getUserProjects = async (id) => {
  let data = await getDataByFilepath("../data/user/users.json");
  let user = data.find((user) => user.id === id.toString());
  return user.projects;
};

const getUserFromDatabaseByLogin = async (username, password) => {
  let data = await getDataByFilepath("../data/user/users.json");
  return data.find(
    (user) => user.username === username && user.password === password
  );
};
