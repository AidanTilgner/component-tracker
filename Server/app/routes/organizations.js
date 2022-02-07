// Boilerplate
import Express from "express";
import BP from "body-parser";
const Router = Express.Router();

// Helpers
import { wrapAsync } from "../helpers/routing.js";

// Controller
import {
  createOrganization,
  getOrganization,
  updateOrganization,
  deleteOrganization,
  addUserToOrganization,
  addProjectToOrganization,
} from "../controllers/OrganizationsController.js";

Router.use(BP.json());

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
    res.send(await getOrganization(req.query.organization_id)).status(200);
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
      .send(await addUserToOrganization(req.query.organization_id, req.body))
      .status(200);
  })
);

export default Router;
