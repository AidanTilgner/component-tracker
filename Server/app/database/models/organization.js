import mongoose from "mongoose";
const { Schema, SchemaTypes, model } = mongoose;
import { ProjectSchema } from "./project.js";
import { UserSchema } from "./user.js";

const OrganizationSchema = new Schema(
  {
    id: SchemaTypes.ObjectId,
    organization_id: { type: String, required: true },
    name: {
      type: String,
      required: true,
    },
    description: String,
    owner: { type: { user_id: String, username: String }, required: true },
    users: { type: [{ user_id: String, username: String }], required: true },
    projects: [
      {
        id: SchemaTypes.ObjectId,
        project_id: String,
        name: String,
        edited: String,
        created: String,
        framework: String,
      },
    ],
  },
  {
    timestamps: { createdAt: "created", updatedAt: "edited" },
  }
);

export default model("Organization", OrganizationSchema);
