class Project {
  constructor({
    owner,
    contributors,
    name,
    framework,
    description,
    externalLink,
  }) {
    this.project_id = `${this.randomString(5)}-${this.randomString(
      5
    )}-${this.randomString(5)}-${this.randomString(5)}`;
    this.owner = owner;
    this.contributors = contributors;
    this.name = name;
    this.framework = framework.toLowerCase();
    this.description = description;
    this.externalLink = externalLink;
    this.components = [];
  }

  randomString(length) {
    return Math.random().toString(36).substr(2, length);
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
    return {
      project_id: this.project_id,
      owner: this.owner,
      contributors: this.contributors,
      name: this.name,
      framework: this.framework,
      description: this.description,
      externalLink: this.externalLink,
      components: this.components,
      message: "Project added successfully",
    };
  }
}

export default Project;
