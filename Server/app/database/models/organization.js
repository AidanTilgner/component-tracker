import mongoose from "mongoose";
const { Schema, SchemaTypes, model } = mongoose;
import { ProjectSchema } from "./project.js";
import { UserSchema } from "./user.js";

const OrganizationSchema = new Schema({
  id: SchemaTypes.ObjectId,
  organization_id: String,
  name: {
    type: String,
    required: true,
  },
  owner: { user_id: String, username: String },
  users: [{ user_id: String, username: String }],
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
});

export default model("Organization", OrganizationSchema);
