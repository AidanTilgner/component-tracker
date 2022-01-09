import {
  addProject,
  getProject,
  updateProject,
} from "../controllers/ProjectsController.js";
import Express from "express";
import BP from "body-parser";
import { wrapAsync } from "../helpers/routing.js";
const Router = Express.Router();

Router.post("/add", BP.json(), (req, res) => {
  console.log(req.body);
  res.send(addProject(req.body));
});

Router.get(
  "/",
  wrapAsync(async (req, res) => {
    let data = await getProject(req.query.projectID);
    res.send(data);
  })
);

Router.put(
  "/component",
  BP.json(),
  wrapAsync(async (req, res) => {
    console.log(
      "Adding component to project: " + req.query.projectID + " with data: ",
      req.body
    );
    let data = await getProject(req.query.projectID);
    data.components.push(req.body);
    updateProject(req.query.projectID, data);
    res.send(data);
  })
);

Router.get(
  "/component",
  wrapAsync(async (req, res) => {
    let data = await getProject(req.query.projectID);
    data = data.components.find(
      (component) => component.id === req.query.componentID
    );
    res.send(data);
  })
);

export default Router;
