class Organization {
  constructor({ owner, name, description, users, projects }) {
    this.organization_id = `${this.randomString(4)}-${this.randomString(
      4
    )}-${this.randomString(4)}-${this.randomString(4)}`;
    this.owner = owner;
    this.name = name;
    this.description = description;
    this.users = users;
    this.projects = projects;
  }

  randomString(length) {
    return Math.random().toString(36).substr(2, length);
  }

  validate() {
    if (
      !this.organization_id ||
      !this.owner ||
      !this.name ||
      !this.description ||
      !this.users ||
      !this.projects
    ) {
      return {
        error: "Invalid organization",
      };
    }
    return {
      organization_id: this.organization_id,
      owner: this.owner,
      name: this.name,
      description: this.description,
      users: this.users,
      projects: this.projects,
    };
  }
}

export default Organization;
