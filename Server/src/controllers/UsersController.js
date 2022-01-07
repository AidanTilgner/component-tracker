// Classes
import User from "../data/user/user.js";

// Path Stuff
import FS, { writeFile, readFile } from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import path from "path";

export const addUser = (user) => {
  addUserToDatabase(user);
  return user;
};

export const getUser = async (id) => {
  let data = await getUserFromDatabaseByID(parseInt(id));
  return data;
};

const addUserToDatabase = async (user) => {
  let { id, name, email, password, role, projects } = user;
  user = new User(id, name, email, password, role, projects);
  let data = FS.readFileSync(
    path.resolve(__dirname, "../data/user/users.json"),
    "utf8"
  );
  data = !Buffer.isBuffer(data) ? [...JSON.parse(data), user] : [];
  writeFile(
    path.resolve(__dirname, "../data/user/users.json"),
    JSON.stringify(data),
    (err) => {
      console.error("Error: " + err);
    }
  );
};

const getUserFromDatabaseByID = async (id) => {
  let data = FS.readFileSync(
    path.resolve(__dirname, "../data/user/users.json"),
    "utf8"
  );
  data = !Buffer.isBuffer(data) ? [...JSON.parse(data)] : [];
  return data.find((user) => user.id === id);
};
