import mongoose from "mongoose";
const { Schema, model, SchemaTypes } = mongoose;
import ComponentSchema from "./schemas/component.js";

const ProjectSchema = new Schema({
  id: SchemaTypes.ObjectId,
  project_id: String,
  owner: { user_id: String, username: String },
  contributors: [{ id: String, username: String }],
  name: String,
  edited: String,
  framework: String,
  description: String,
  externalLinks: [{ name: String, url: String }],
  components: [ComponentSchema],
});

export default model("Project", ProjectSchema);
