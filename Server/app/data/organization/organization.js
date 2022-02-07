class Organization {
  constructor({ owner, name, users, projects }) {
    this.organization_id = `${this.randomString(4)}-${this.randomString(
      4
    )}-${this.randomString(4)}-${this.randomString(4)}`;
    this.owner = owner;
    this.name = name;
    this.users = users;
    this.projects = projects;
  }

  randomString(length) {
    return Math.random().toString(36).substr(2, length);
  }
}

export default Organization;
