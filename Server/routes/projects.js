import ProjectsController from "../controllers/ProjectsController";
import Express from "express";
const Router = Express.Router();
const propCon = new ProjectsController();

Router.get("/", (req, res) => {
  if (true) {
  }
});

module.exports = Router;
