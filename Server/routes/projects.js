import Express from "express";
const Router = Express.Router();

Router.get("/", (req, res) => {
  res.send("Hello from the projects route!");
});

module.exports = Router;
