// * Dependencies
import Express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

// * Routes
import UsersRouter from "./routes/users.js";
import ProjectsRouter from "./routes/projects.js";
import AuthRouter from "./routes/auth.js";

// * Config
dotenv.config();
const app = Express();
const PORT = process.env.PORT || 8080 || 3000;
mongoose.connect(
  process.env.MONGODB_URI,
  () => {
    console.log("Connected to MongoDB");
  },
  (err) => {
    console.log("Error connecting to MongoDB", err);
  }
);

app.use(
  cors({
    origin: "http://localhost:5000",
  })
);

// Auth
app.use("/auth", AuthRouter);

// Initialize the Users route
app.use("/users", UsersRouter);

// Initialize the Projects route
app.use("/projects", ProjectsRouter);

app.listen(PORT, () => console.log("Listening on port " + PORT));
