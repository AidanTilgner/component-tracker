// Boilerplate
import Express from "express";
import BP from "body-parser";
const Router = Express.Router();

// Helpers
import { wrapAsync } from "../helpers/routing.js";

// Middleware
import { authenticateUser } from "../helpers/tokens.js";

// Controller
import {
  addUser,
  getUser,
  updateUser,
  deleteUser,
  getProjects,
} from "../controllers/UsersController.js";

Router.use(BP.json());

// ! DEPRECATED
Router.post(
  "/add",
  authenticateUser,
  wrapAsync(async (req, res) => {
    res.send(await addUser(req.body)).status(200);
  })
);

Router.get(
  "/",
  authenticateUser,
  wrapAsync(async (req, res) => {
    console.log("Getting user");
    res.send(await getUser(req.query.id)).status(200);
  })
);

Router.put(
  "/",
  authenticateUser,
  wrapAsync(async (req, res) => {
    res.send(await updateUser(req.query.id, req.body)).status(200);
  })
);

Router.delete(
  "/",
  authenticateUser,
  wrapAsync(async (req, res) => {
    res.send(await deleteUser(req.query.id)).status(200);
  })
);

Router.get(
  "/projects",
  authenticateUser,
  wrapAsync(async (req, res) => {
    res.send(await getProjects(req.query.id)).status(200);
  })
);

export default Router;
