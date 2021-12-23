import Express from "express";
const app = Express();
const PORT = process.env.PORT || 8080;

// Initialize the Users route
app.use("/users", require("./routes/users.js"));

// Initialize the Projects route
app.use("/projects", require("./routes/projects.js"));

// Initialize the Components route
app.use("/components", require("./routes/components.js"));

app.listen(PORT, () => console.log("Listening on port " + PORT));
