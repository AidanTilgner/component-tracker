// Boilerplate
import Express from "express";
import BP from "body-parser";
const Router = Express.Router();

// Helpers
import { wrapAsync } from "../helpers/routing.js";
import {
  authenticateUser,
  confirmUserOrganizationRights,
} from "../helpers/tokens.js";

// Controller
import {
  createOrganization,
  getOrganization,
  updateOrganization,
  deleteOrganization,
  addUserToOrganization,
  removeUserFromOrganization,
  addProjectToOrganization,
  deleteProjectFromOrganization,
} from "../controllers/OrganizationsController.js";

Router.use(BP.json());
Router.use(authenticateUser);
Router.use(confirmUserOrganizationRights);

Router.post(
  "/",
  wrapAsync(async (req, res) => {
    console.log("New Organization:", req.body);
    res.send(await createOrganization(req.body)).status(200);
  })
);

Router.get(
  "/",
  wrapAsync(async (req, res) => {
    res.send(await getOrganization(req.query.organizationID)).status(200);
  })
);

Router.put(
  "/",
  wrapAsync(async (req, res) => {
    res
      .send(await updateOrganization(req.query.organization_id, req.body))
      .status(200);
  })
);

Router.delete(
  wrapAsync(async (req, res) => {
    res.send(await deleteOrganization(req.query.organization_id)).status(204);
  })
);

Router.put(
  "/users",
  wrapAsync(async (req, res) => {
    res
      .send(
        await addUserToOrganization(
          req.query.organization_id,
          req.query.user_id
        )
      )
      .status(200);
  })
);

Router.delete(
  "/users",
  wrapAsync(async (req, res) => {
    res
      .send(
        await removeUserFromOrganization(
          req.query.organization_id,
          req.query.user_id
        )
      )
      .status(200);
  })
);

Router.put(
  "/projects",
  wrapAsync(async (req, res) => {
    res.send(
      await addProjectToOrganization(
        req.query.organization_id,
        req.query.project_id
      )
    );
  })
);

Router.delete(
  "/projects",
  wrapAsync(async (req, res) => {
    res.send(
      await removeProjectFromOrganization(
        req.query.organization_id,
        req.query.project_id
      )
    );
  })
);

export default Router;
