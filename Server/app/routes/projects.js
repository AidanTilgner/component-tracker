// Boilerplate
import Express from "express";
import BP from "body-parser";
const Router = Express.Router();

// Middleware
import { authenticateUser } from "../helpers/tokens.js";
import { confirmUserProjectRights } from "../helpers/authorization.js";

// Helpers
import { wrapAsync } from "../helpers/routing.js";

// Controller
import {
  addProject,
  getProject,
  updateProject,
  deleteProject,
  addComponent,
  getComponent,
  updateComponent,
  deleteComponent,
} from "../controllers/ProjectsController.js";

Router.use(BP.json());
Router.use(authenticateUser);

Router.post(
  "/",
  wrapAsync(async (req, res) => {
    res.send(await addProject(req.body)).status(200);
  })
);

Router.get(
  "/",
  confirmUserProjectRights,
  wrapAsync(async (req, res) => {
    res.send(await getProject(req.query.project_id)).status(200);
  })
);

Router.put(
  "/",
  confirmUserProjectRights,
  wrapAsync(async (req, res) => {
    res.send(await updateProject(req.query.project_id, req.body)).status(200);
  })
);

Router.delete(
  "/",
  confirmUserProjectRights,
  wrapAsync(async (req, res) => {
    res.send(await deleteProject(req.query.project_id)).status(200);
  })
);

Router.put(
  "/component",
  confirmUserProjectRights,
  wrapAsync(async (req, res) => {
    res.send(await addComponent(req.query.project_id, req.body)).status(200);
  })
);

Router.get(
  "/component",
  confirmUserProjectRights,
  wrapAsync(async (req, res) => {
    res
      .send(await getComponent(req.query.project_id, req.query.name))
      .status(200);
  })
);

Router.patch(
  "/component",
  confirmUserProjectRights,
  wrapAsync(async (req, res) => {
    res
      .send(
        await updateComponent(req.query.project_id, req.query.name, req.body)
      )
      .status(200);
  })
);

Router.delete(
  "/component",
  confirmUserProjectRights,
  wrapAsync(async (req, res) => {
    res
      .send(await deleteComponent(req.query.project_id, req.query.name))
      .status(200);
  })
);

export default Router;
