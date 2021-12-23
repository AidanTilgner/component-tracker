import Express from "express";
const Router = Express.Router();

Router.get("/", (req, res) => {
  res.send("Hello from the components route!");
});

module.exports = Router;
