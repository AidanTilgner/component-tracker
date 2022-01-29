import Express from "express";
import cors from "cors";
import dotenv from 'dotenv'
dotenv.config()
const app = Express();
const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: "http://localhost:5000",
  })
);

import UsersRouter from "./routes/users.js";
import ProjectsRouter from "./routes/projects.js";

// Initialize the Users route
app.use("/users", UsersRouter);

// Initialize the Projects route
app.use("/projects", ProjectsRouter);

app.listen(PORT, () => console.log("Listening on port " + PORT));
