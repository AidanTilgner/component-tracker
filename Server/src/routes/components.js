import Express from "express";
const Router = Express.Router();

Router.get("/", (req, res) => {
  res.send("Hello from the components route!");
});

export default Router;
