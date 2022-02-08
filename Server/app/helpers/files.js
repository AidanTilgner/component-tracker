// Path Stuff
import FS, { writeFile, readFile } from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import path from "path";

export const getDataByFilepath = async (filepath) => {
  try {
    let data = FS.readFileSync(path.resolve(__dirname, filepath), "utf8");
    data = !Buffer.isBuffer(data) ? [...JSON.parse(data)] : [];
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const writeFileByFilepath = async (filepath, data) => {
  try {
    FS.writeFileSync(path.resolve(__dirname, filepath), data, "utf8");
    return data;
  } catch (err) {
    console.log(err);
  }
};
