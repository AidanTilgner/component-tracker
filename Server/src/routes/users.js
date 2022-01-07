import Express from "express";
import BP from "body-parser";
const Router = Express.Router();
import { addUser, getUser } from "../controllers/UsersController.js";
import { wrapAsync } from "../helpers/routing.js";

Router.post("/add", BP.json(), (req, res) => {
  console.log(req.body);
  res.send(addUser(req.body));
});

Router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    let data = await getUser(req.params.id);
    res.send(data);
  })
);

export default Router;
