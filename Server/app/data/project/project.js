import { randomBytes } from "crypto";

class Project {
  constructor({
    owner,
    contributors,
    name,
    framework,
    description,
    externalLinks,
    organization,
  }) {
    console.log("Organization: ", organization);
    this.project_id = `${this.randomString(5)}-${this.randomString(
      5
    )}-${this.randomString(5)}-${this.randomString(5)}`;
    this.owner = owner;
    this.organization = organization;
    console.log("This Organization: ", this.organization);
    this.contributors = contributors;
    this.name = name;
    this.framework = framework.toLowerCase();
    this.description = description;
    this.externalLinks = externalLinks || [];
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
