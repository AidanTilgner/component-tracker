// Classes
import Project from "../data/project/project.js";

// Path Stuff
import FS, { writeFile, readFile } from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import path from "path";

export const addProject = (project) => {
  console.log("New Project: " + project);
  addProjectToDatabase(project);
  return project;
};

export const getProject = async (id) => {
  return await getProjectFromDatabaseByID(id);
};

const addProjectToDatabase = async (project) => {
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
};

const getProjectFromDatabaseByID = async (id) => {
  let data = FS.readFileSync(
    path.resolve(__dirname, "../data/project/projects.json"),
    "utf8"
  );
  data = !Buffer.isBuffer(data) ? [...JSON.parse(data)] : [];
  return data.find((project) => project.id === id);
};
