// Classes
import Project from "../data/project/project.js";

// Path Stuff
import FS, { writeFile, readFile } from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import path from "path";

// Controllers
import { addProjectToUserByID } from "./UsersController.js";

export const addProject = (project) => {
  console.log("New Project: " + project);
  addProjectToDatabase(project);
  return project;
};

export const getProject = async (id) => {
  return await getProjectFromDatabaseByID(id);
};

export const updateProject = async (id, project) => {
  return await updateProjectInDatabase(id, project);
};

const addProjectToDatabase = async (project) => {
  //* Add to projects file
  project = new Project(project);
  let data = FS.readFileSync(
    path.resolve(__dirname, "../data/project/projects.json"),
    "utf8"
  );
  data = !Buffer.isBuffer(data) ? [...JSON.parse(data), project] : [];
  console.log("Writing to file");
  writeFile(
    path.resolve(__dirname, "../data/project/projects.json"),
    JSON.stringify(data),
    (err) => {
      console.error("Error: " + err);
    }
  );

  //* Add project id to user with matching username
  project.contributors.forEach((contributer) => {
    addProjectToUserByID(contributer.id, project);
  });
};

const getProjectFromDatabaseByID = async (id) => {
  let data = FS.readFileSync(
    path.resolve(__dirname, "../data/project/projects.json"),
    "utf8"
  );
  data = !Buffer.isBuffer(data) ? [...JSON.parse(data)] : [];
  return data.find((project) => project.id === id);
};

const updateProjectInDatabase = async (id, project) => {
  let data = FS.readFileSync(
    path.resolve(__dirname, "../data/project/projects.json"),
    "utf8"
  );
  data = !Buffer.isBuffer(data) ? [...JSON.parse(data)] : [];
  let index = data.findIndex((project) => project.id === id);
  data[index] = new Project(project);
  writeFile(
    path.resolve(__dirname, "../data/project/projects.json"),
    JSON.stringify(data),
    (err) => {
      console.error("Error: " + err);
    }
  );
  return data[index];
};
