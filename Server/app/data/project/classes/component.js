import { randomBytes } from "crypto";

class Component {
  constructor({
    creator,
    metaData,
    imports,
    exports,
    functions,
    connectedFiles,
  }) {
    this.creator = creator;
    this.metaData = {
      category: metaData.category,
      path: metaData.path,
      example: metaData.example,
      description: metaData.description,
      props: metaData.props,
      state: metaData.state,
      tags: metaData.tags,
    };
    this.component_id = this.randomID(metaData.path);
    this.imports = imports ? imports : [];
    this.exports = exports ? exports : [];
    this.functions = functions ? functions : [];
    this.connectedFiles = connectedFiles
      ? connectedFiles
      : { parents: [], children: [], helpers: [] };
  }

  randomID(path) {
    return path
      .split("/")
      .map((x) => {
        return x + this.randomString(5);
      })
      .join("-");
  }

  randomString(length) {
    return randomBytes(length).toString("hex");
  }
}

export default Component;
