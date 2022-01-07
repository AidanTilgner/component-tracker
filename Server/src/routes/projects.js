import { addProject, getProject } from "../controllers/ProjectsController.js";
import Express from "express";
import BP from "body-parser";
import { wrapAsync } from "../helpers/routing.js";
const Router = Express.Router();

Router.post("/add", BP.json(), (req, res) => {
  console.log(req.body);
  res.send(addProject(req.body));
});

Router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    let data = await getProject(req.params.id);
    res.send(data);
  })
);

export default Router;
