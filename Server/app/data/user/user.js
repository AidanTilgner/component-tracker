class User {
  constructor({ username, email, password, role }) {
    this.id = `${this.randomString(5)}-${this.randomString(
      5
    )}-${this.randomString(5)}-${this.randomString(5)}`;
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = role;
    this.projects = [];
  }

  randomString(length) {
    return Math.random().toString(36).substr(2, length);
  }

  addProject(project) {
    this.projects.push({
      id: project.id,
      name: project.name,
      edited: project.edited,
      framework: project.framework,
    });
  }

  updateProject(projectID, update) {
    let project = this.projects.find((project) => project.id === projectID);
    project = Object.assign(project, update);
    return project;
  }

  deleteProject(projectID) {
    this.projects = this.projects.filter((project) => project.id !== projectID);
  }
}

export default User;
