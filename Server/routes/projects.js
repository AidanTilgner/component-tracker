const Router = require("express").Router();

Router.get("/", (req, res) => {
  res.send("Hello from the projects route!");
});

module.exports = Router;
