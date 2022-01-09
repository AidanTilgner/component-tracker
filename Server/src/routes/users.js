import Express from "express";
import BP from "body-parser";
import { addUser, getUser } from "../controllers/UsersController.js";
import { wrapAsync } from "../helpers/routing.js";

const Router = Express.Router();

Router.post("/add", BP.json(), (req, res) => {
  console.log(req.body);
  res.send(addUser(req.body));
});

Router.get(
  "/",
  wrapAsync(async (req, res) => {
    let data = await getUser(req.query.id);
    res.send(data);
  })
);

export default Router;
