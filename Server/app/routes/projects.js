// Boilerplate
import Express from "express";
import BP from "body-parser";
const Router = Express.Router();

// Middleware
import { authenticateUser } from "../helpers/tokens.js";

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

Router.get(
  "/",
  authenticateUser,
  wrapAsync(async (req, res) => {
    res.send(await getProject(req.query.projectID)).status(200);
  })
);

Router.post(
  "/add",
  authenticateUser,
  wrapAsync(async (req, res) => {
    res.send(await addProject(req.body)).status(200);
  })
);

Router.put(
  "/",
  authenticateUser,
  wrapAsync(async (req, res) => {
    res.send(await updateProject(req.query.projectID, req.body)).status(200);
  })
);

Router.delete(
  "/",
  authenticateUser,
  wrapAsync(async (req, res) => {
    res.send(await deleteProject(req.query.projectID)).status(200);
  })
);

Router.put(
  "/component",
  authenticateUser,
  wrapAsync(async (req, res) => {
    res.send(await addComponent(req.query.projectID, req.body)).status(200);
  })
);

Router.get(
  "/component",
  authenticateUser,
  wrapAsync(async (req, res) => {
    res
      .send(await getComponent(req.query.projectID, req.query.name))
      .status(200);
  })
);

Router.patch(
  "/component",
  authenticateUser,
  wrapAsync(async (req, res) => {
    res
      .send(
        await updateComponent(req.query.projectID, req.query.name, req.body)
      )
      .status(200);
  })
);

Router.delete(
  "/component",
  authenticateUser,
  wrapAsync(async (req, res) => {
    res
      .send(await deleteComponent(req.query.projectID, req.query.name))
      .status(200);
  })
);

export default Router;
