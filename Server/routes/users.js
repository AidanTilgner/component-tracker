const Router = require("express").Router();

Router.get("/", (req, res) => {
  res.send("Hello from the users route!");
});

module.exports = Router;
