import Express from "express";
const Router = Express.Router();

Router.get("/", (req, res) => {
  res.send("Hello from the users route!");
});

module.exports = Router;
