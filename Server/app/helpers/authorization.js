import JWT from "jsonwebtoken";
import { getOrganizationFromDatabase } from "../database/queries/organizations.js";
import { getProjectFromDatabase } from "../database/queries/projects.js";
import { wrapAsync } from "../helpers/routing.js";

export const getUserRoleFromToken = (token) => {
  const user = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET);
  return user.role;
};

export const confirmUserOrganizationRights = wrapAsync(
  async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    const user = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (user.role === "admin") return next();
    if (user.role === "user") {
      const organization = await getOrganizationFromDatabase(
        req.query.organization_id
      );
      if (organization.error) {
        return res.send({ error: organization.error });
      }
      if (organization.users.some((u) => u.user_id === user.user_id)) {
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
  }
);

export const confirmUserProjectRights = wrapAsync(async (req, res, next) => {
  // Deserialize the token, if the token is valid, and the user projects include the project_id, then the user has rights to the project
  const token = req.headers.authorization?.split(" ")[1];
  const user = JWT.decode(token);
  if (user.role === "admin") return next();
  if (user.role === "user") {
    const project = await getProjectFromDatabase(req.query.project_id);
    if (project.error) {
      return res.send({ error: project.error });
    }
    if (project.owner?.user_id === user.user_id) {
      return next();
    }
    if (
      project.contributors?.length > 0 &&
      project.contributors.some((con) => con.user_id === user.user_id)
    ) {
      console.log("User has rights to this project");
      return next();
    }
    const projOrg = await getOrganizationFromDatabase(
      project.organization.organization_id
    );
    if (projOrg.error) {
      return res.send({ error: projOrg.error });
    }
    if (projOrg.users.some((u) => u.user_id === user.user_id)) {
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

export const confirmOrganizationJoinCodeValidity = wrapAsync(
  async (req, res, next) => {
    try {
      console.log("Checking join code validity");
      JWT.verify(
        req.query.join_code,
        process.env.ORGANIZATION_JOIN_SECRET,
        wrapAsync(async (err, decoded) => {
          if (err) {
            return res
              .send({ error: "Error 403, Invalid join code" })
              .status(403);
          }
          req.query.organization_id = decoded.organization_id;
          console.log("Organization join code is valid");
          next();
        })
      );
    } catch (err) {
      console.log("Error in confirmOrganizationJoinCodeValidity: ", err);
      return {
        error: "Error in confirmOrganizationJoinCodeValidity: ",
        err,
      };
    }
  }
);
