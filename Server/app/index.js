import Express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = Express();
const PORT = process.env.PORT || 8080 || 3000;

app.use(
  cors({
    origin: "http://localhost:5000",
  })
);

import UsersRouter from "./routes/users.js";
import ProjectsRouter from "./routes/projects.js";
import AuthRouter from "./routes/auth.js";

// Auth
app.use("/auth", AuthRouter);

// Initialize the Users route
app.use("/users", UsersRouter);

// Initialize the Projects route
app.use("/projects", ProjectsRouter);

app.listen(PORT, () => console.log("Listening on port " + PORT));
