// Boilerplate
import Express from "express";
import BP from "body-parser";
const Router = Express.Router();

// Helpers
import { wrapAsync } from "../helpers/routing.js";

// Controller
import {
  addUser,
  getUser,
  updateUser,
  deleteUser,
  getProjects,
} from "../controllers/UsersController.js";

Router.post("/add", BP.json(), (req, res) => {
  res.send(addUser(req.body)).status(200);
});

Router.get(
  "/",
  wrapAsync(async (req, res) => {
    res.send(await getUser(req.query.id)).status(200);
  })
);

Router.put(
  "/",
  BP.json(),
  wrapAsync(async (req, res) => {
    res.send(await updateUser(req.query.id, req.body)).status(200);
  })
);

Router.delete(
  "/",
  wrapAsync(async (req, res) => {
    res.send(await deleteUser(req.query.id)).status(200);
  })
);

Router.get(
  "/projects",
  wrapAsync(async (req, res) => {
    res.send(await getProjects(req.query.id)).status(200);
  })
);

export default Router;
