import Project from "../project/project.js";

class User {
  constructor(
    private id: string,
    public name: string,
    public email: string,
    private password: string,
    public role: string,
    public projects: Project[]
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.projects = projects;
  }

  get _password() {
    return this.password;
  }
}
