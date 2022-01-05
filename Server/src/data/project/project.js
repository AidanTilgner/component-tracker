class Project {
  constructor(
    id,
    owner,
    contributors,
    name,
    description,
    framework,
    languages,
    externalLinks,
    components
  ) {
    this.id = id;
    this.owner = owner;
    this.contributors = contributors;
    this.name = name;
    this.description = description;
    this.framework = framework;
    this.languages = languages;
    this.externalLinks = externalLinks;
    this.components = components;
  }
}

export default Project;
