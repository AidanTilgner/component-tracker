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

export const addUser = (user) => {
  addUserToDatabase(user);
  return user;
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

export const addProjectToUser = async (id, project) => {
  let data = await getDataByFilepath("../data/user/users.json");
  let user = data.find((user) => user.id === id);
  user.projects.push({
    id: project.id,
    name: project.name,
    edited: project.edited,
  });
  writeFileByFilepath("../data/user/users.json", JSON.stringify(data));
  return user;
};

export const updateUserProject = async (id, projectID, update) => {
  let data = await getDataByFilepath("../data/user/users.json");
  let user = data.find((user) => user.id === id);
  let project = user.projects.find((project) => project.id === projectID);
  project = Object.assign(project, update);
  writeFileByFilepath("../data/user/users.json", JSON.stringify(data));
  return project;
};

export const deleteUserProject = async (id, projectID) => {
  let data = await getDataByFilepath("../data/user/users.json");
  let user = data.find((user) => user.id === id);
  let project = user.projects.find((project) => project.id === projectID);
  user.projects = user.projects.filter((project) => project.id !== projectID);
  writeFileByFilepath("../data/user/users.json", JSON.stringify(data));
  return project;
};

const deleteUserFromDatabaseByID = async (id) => {
  let data = await getDataByFilepath("../data/user/users.json");
  data = data.filter((user) => user.id !== id);
  writeFileByFilepath("../data/user/users.json", JSON.stringify(data));
  return data;
};

const addUserToDatabase = async (user) => {
  let { id, name, email, password, role, projects } = user;
  user = new User(id, name, email, password, role, projects);
  let data = await getDataByFilepath("../data/user/users.json");
  console.log(data);
  data.push(user);
  writeFileByFilepath("../data/user/users.json", JSON.stringify(data));
  return user;
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
  return data;
};

const getUserProjects = async (id) => {
  let data = await getDataByFilepath("../data/user/users.json");
  let user = data.find((user) => user.id === id);
  return user.projects;
};
