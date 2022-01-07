class Project {
  constructor(data) {
    this.id = data.id;
    this.owner = data.owner;
    this.contributors = data.contributors;
    this.name = data.name;
    this.description = data.description;
    this.framework = data.framework;
    this.languages = data.languages;
    this.externalLinks = data.externalLinks;
    this.components = data.components;
  }
}

export default Project;
