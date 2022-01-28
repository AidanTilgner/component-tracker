// Boilerplate
import Express from "express";
import BP from "body-parser";
const Router = Express.Router();

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

Router.get(
  "/",
  wrapAsync(async (req, res) => {
    res.send(await getProject(req.query.projectID)).status(200);
  })
);

Router.post(
  "/add",
  BP.json(),
  wrapAsync(async (req, res) => {
    res.send(await addProject(req.body)).status(200);
  })
);

Router.put(
  "/",
  BP.json(),
  wrapAsync(async (req, res) => {
    res.send(await updateProject(req.query.projectID, req.body)).status(200);
  })
);

Router.delete(
  "/",
  wrapAsync(async (req, res) => {
    res.send(await deleteProject(req.query.projectID)).status(200);
  })
);

Router.put(
  "/component",
  BP.json(),
  wrapAsync(async (req, res) => {
    console.log("req.body: ", req.body);
    res.send(await addComponent(req.query.projectID, req.body)).status(200);
  })
);

Router.get(
  "/component",
  wrapAsync(async (req, res) => {
    console.log(
      "Component: ",
      await getComponent(req.query.projectID, req.query.name)
    );
    res
      .send(await getComponent(req.query.projectID, req.query.name))
      .status(200);
  })
);

Router.patch(
  "/component",
  BP.json(),
  wrapAsync(async (req, res) => {
    console.log("Project: ", req.query.projectID);
    console.log("Component: ", req.query.name);
    console.log("Req Body: ", req.body);
    res
      .send(
        await updateComponent(req.query.projectID, req.query.name, req.body)
      )
      .status(200);
  })
);

Router.delete(
  "/component",
  wrapAsync(async (req, res) => {
    res
      .send(await deleteComponent(req.query.projectID, req.query.name))
      .status(200);
  })
);

export default Router;
