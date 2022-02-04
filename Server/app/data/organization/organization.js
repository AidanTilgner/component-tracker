class Organization {
  constructor(organization) {
    this.organization_id = organization.organization_id;
    this.name = organization.name;
    this.created = organization.created;
    this.edited = organization.edited;
    this.users = organization.users;
    this.projects = organization.projects;
  }
}

export default Organization;
