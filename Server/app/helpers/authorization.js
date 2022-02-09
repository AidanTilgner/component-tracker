import JWT from "jsonwebtoken";
import { getProjectFromDatabase } from "../database/queries/projects.js";
import { wrapAsync } from "../helpers/routing.js";

export const getUserRoleFromToken = (token) => {
  const user = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET);
  return user.role;
};

export const confirmUserOrganizationRights = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  const user = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET);
  if (user.role === "admin") return next();
  if (user.role === "user") {
    if (
      user.organizations.some(
        (or) => or.organization_id === req.query.organizationID
      )
    ) {
      return next();
    }
    return res
      .send({
        error: "Error 403, User does not have rights to this organization",
      })
      .status(403);
  }
  return res.send({
    error: "Error 403, User does not have rights to this organization",
  });
};

export const confirmUserProjectRights = wrapAsync(async (req, res, next) => {
  // Deserialize the token, if the token is valid, and the user projects include the project_id, then the user has rights to the project
  const token = req.headers.authorization?.split(" ")[1];
  const user = JWT.decode(token);
  console.log("User: ", user);
  console.log("Project ID: ", req.query.projectID);
  if (user.role === "admin") return next();
  if (user.role === "user") {
    //const project = await getProjectFromDatabase(req.params.projectID);
    if (user.projects.some((pr) => pr.project_id === req.query.projectID)) {
      console.log("User has rights to this project");
      return next();
    }
    console.log("User does not have rights to this project");
    return res
      .send({
        error: "Error 403, User does not have rights to this project",
      })
      .status(403);
  }
});
