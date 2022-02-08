import JWT from "jsonwebtoken";
import { getProjectFromDatabase } from "../database/queries/projects.js";

export const getUserRoleFromToken = (token) => {
  const user = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET);
  return user.role;
};

export const confirmUserOrganizationRights = (req, res, next) => {
  console.log("Req: ", req);
  const token = req.headers.authorization?.split(" ")[1];
  const user = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET);
  if (user.role === "admin") return next();
  if (user.role === "user") {
    console.log("User: ", user);
    console.log("Organization ID: ", req.query.organizationID);
    if (
      user.organizations.some(
        (or) => or.organization_id === req.query.organizationID
      )
    ) {
      console.log("User has rights to this organization");
      return next();
    }
    console.log("User does not have rights to this organization");
    return res.sendStatus(403);
  }
  return res.sendStatus(403);
};

export const confirmUserProjectRights = (req, res, next) => {
  console.log("Req: ", req);
  const token = req.headers.authorization?.split(" ")[1];
  const user = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET);
  if (user.role === "admin") return next();
  if (user.role === "user") {
    console.log("User: ", user);
    console.log("Project ID: ", req.query.projectID);
    // If one of the contributors to the project is the user, then the user has rights to the project
    const project = getProjectFromDatabase(req.query.projectID);
    if (
      project.contributors.some(
        (contributor) => contributor.user_id === user.user_id
      )
    ) {
      console.log("User has rights to this project");
      return next();
    }
    console.log("User does not have rights to this project");
    return res.sendStatus(403);
  }
  return res.sendStatus(403);
};
