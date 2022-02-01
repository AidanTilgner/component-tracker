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
} from "../controllers/AuthenticationController.js";

Router.post(
  "/login",
  BP.json(),
  wrapAsync(async (req, res) => {
    console.log("Getting tokens");
    res.send(await loginUser(req.body.username, req.body.password)).status(200);
  })
);

Router.post(
  "/register",
  BP.json(),
  wrapAsync(async (req, res) => {
    res.send(await registerUser(req.body)).status(200);
  })
);

export default Router;
