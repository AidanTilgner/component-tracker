import { randomBytes } from "crypto";

class Project {
  constructor({
    owner,
    contributors,
    name,
    framework,
    description,
    externalLink,
    organization_id,
  }) {
    this.project_id = `${this.randomString(5)}-${this.randomString(
      5
    )}-${this.randomString(5)}-${this.randomString(5)}`;
    this.owner = owner;
    this.contributors = contributors;
    this.organization_id = organization_id;
    this.name = name;
    this.framework = framework.toLowerCase();
    this.description = description;
    this.externalLink = externalLink;
    this.components = [];
  }

  randomString(length) {
    return randomBytes(length).toString("hex");
  }

  validate() {
    if (
      !this.project_id ||
      !this.owner ||
      !this.name ||
      !this.framework ||
      !this.description ||
      !this.externalLink ||
      !this.components
    ) {
      return {
        error: "Invalid project",
      };
    }
    return true;
  }
}

export default Project;
