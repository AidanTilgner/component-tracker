class User {
  id: string;
  name: string;
  email: string;
  private password: string;
  role: string;
  projects: Object[];

  constructor(
    id: string,
    name: string,
    email: string,
    password: string,
    role: string
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.projects = [];
  }
}
