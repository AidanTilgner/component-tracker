import mongoose from "mongoose";
const { Schema, model, SchemaTypes } = mongoose;
import ComponentSchema from "./schemas/component";

const ProjectSchema = new Schema({
  id: SchemaTypes.ObjectId,
  owner: { id: String, username: String },
  contributors: [{ id: String, username: String }],
  name: String,
  edited: String,
  framework: String,
  description: String,
  externalLinks: [{ name: String, url: String }],
  components: [ComponentSchema],
});
