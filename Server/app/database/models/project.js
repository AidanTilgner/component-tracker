import mongoose from "mongoose";
const { Schema, model, SchemaTypes } = mongoose;
import ComponentSchema from "./schemas/component.js";

const ProjectSchema = new Schema(
  {
    id: SchemaTypes.ObjectId,
    project_id: String,
    owner: { user_id: String, username: String },
    contributors: [{ user_id: String, username: String }],
    name: String,
    edited: String,
    framework: String,
    description: String,
    externalLink: String,
    components: [ComponentSchema],
  },
  // Add created at and updated at timestamps with the names "created" and "edited"
  { timestamps: { createdAt: "created", updatedAt: "edited" } }
);

export default model("Project", ProjectSchema);
