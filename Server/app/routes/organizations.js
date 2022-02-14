// Boilerplate
import Express from "express";
import BP from "body-parser";
const Router = Express.Router();

// Helpers
import { wrapAsync } from "../helpers/routing.js";
import { authenticateUser } from "../helpers/tokens.js";
import { confirmUserOrganizationRights } from "../helpers/authorization.js";

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

Router.post(
  "/",
  wrapAsync(async (req, res) => {
    res.send(await createOrganization(req.body)).status(200);
  })
);

Router.get(
  "/",
  confirmUserOrganizationRights,
  wrapAsync(async (req, res) => {
    res.send(await getOrganization(req.query.organization_id)).status(200);
  })
);

Router.put(
  "/",
  confirmUserOrganizationRights,
  wrapAsync(async (req, res) => {
    console.log("Updating organization: ", req.body);
    res
      .send(await updateOrganization(req.query.organization_id, req.body))
      .status(200);
  })
);

Router.delete(
  "/",
  confirmUserOrganizationRights,
  wrapAsync(async (req, res) => {
    res.send(await deleteOrganization(req.query.organization_id)).status(204);
  })
);

Router.put(
  "/users",
  confirmUserOrganizationRights,
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
  confirmUserOrganizationRights,
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
  confirmUserOrganizationRights,
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
  confirmUserOrganizationRights,
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
