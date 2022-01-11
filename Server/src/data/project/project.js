class Project {
  constructor({
    owner,
    contributors,
    name,
    edited,
    framework,
    description,
    externalLinks,
  }) {
    this.id = `${this.randomString(5)}-${this.randomString(
      5
    )}-${this.randomString(5)}-${this.randomString(5)}`;
    this.owner = owner;
    this.contributors = contributors;
    this.name = name;
    this.edited = edited;
    this.framework = framework;
    this.description = description;
    this.externalLinks = externalLinks;
    this.components = [];
  }

  randomString(length) {
    return Math.random().toString(36).substr(2, length);
  }

  addComponent(component) {
    this.components.push(component);
  }

  getComponent(name) {
    return this.components.find((component) => component.name === name);
  }

  updateComponent(name, update) {
    let component = this.components.find(
      (component) => component.name === name
    );
    component = Object.assign(component, update);
    return component;
  }

  deleteComponent(component) {
    this.components = this.components.filter(
      (comp) => comp.name !== component.name
    );
  }
}

export default Project;
