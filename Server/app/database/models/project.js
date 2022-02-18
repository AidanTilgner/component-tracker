import mongoose from "mongoose";
const { Schema, model, SchemaTypes } = mongoose;
import { ComponentSchema } from "./schemas/component.js";

export const ProjectSchema = new Schema(
  {
    id: SchemaTypes.ObjectId,
    project_id: String,
    owner: { user_id: String, username: String },
    organization: { organization_id: String, name: String },
    contributors: [{ user_id: String, username: String }],
    name: String,
    framework: String,
    description: String,
    externalLink: String,
    components: [ComponentSchema],
  },
  {
    timestamps: { createdAt: "created", updatedAt: "edited" },
  }
);

export default model("Project", ProjectSchema);
