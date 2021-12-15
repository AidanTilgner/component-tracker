const Router = require("express").Router();

Router.get("/", (req, res) => {
  res.send("Hello from the components route!");
});

module.exports = Router;
