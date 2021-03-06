// Boilerplate
import Express from "express";
import BP from "body-parser";
const Router = Express.Router();

// Helpers
import { wrapAsync } from "../helpers/routing.js";

// Controller
import {
  loginUser,
  registerUser,
  refreshUser,
  logoutUser,
} from "../controllers/AuthenticationController.js";

Router.post(
  "/login",
  BP.json(),
  wrapAsync(async (req, res) => {
    res.send(await loginUser(req.body.username, req.body.password)).status(200);
  })
);

Router.post(
  "/refresh",
  BP.json(),
  wrapAsync(async (req, res) => {
    res.send(await refreshUser(req.body.refreshToken)).status(200);
  })
);

Router.post(
  "/register",
  BP.json(),
  wrapAsync(async (req, res) => {
    res.send(await registerUser(req.body)).status(200);
  })
);

Router.delete(
  "/logout",
  BP.json(),
  wrapAsync(async (req, res) => {
    res.send(await logoutUser(req.body.refreshToken)).status(204);
  })
);

export default Router;
