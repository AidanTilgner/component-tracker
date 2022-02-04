// Boilerplate
import Express from "express";
import BP from "body-parser";
const Router = Express.Router();

// Helpers
import { wrapAsync } from "../helpers/routing.js";

// Controller
import { createOrganization } from "../controllers/OrganizationsController.js";

Router.use(BP.json());

Router.post(
  "/",
  wrapAsync(async (req, res) => {
    console.log("New Organization:", req.body);
    res.send().status(200);
  })
);

export default Router;
