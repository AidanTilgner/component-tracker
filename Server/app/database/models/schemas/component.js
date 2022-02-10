import mongoose from "mongoose";
const { Schema, model, SchemaTypes } = mongoose;

export const ComponentSchema = new Schema({
  id: SchemaTypes.ObjectId,
  creator: { username: String, user_id: String },
  description: String,
  metaData: {
    category: String,
    path: String,
    example: String,
    description: String,
    props: [{ name: String, description: String, pill_type: String }],
    state: [{ name: String, description: String, pill_type: String }],
    tags: [{ name: String, description: String, pill_type: String }],
  },
  imports: [
    {
      name: String,
      from: String,
      data_type: String,
      description: String,
      notes: String,
    },
  ],
  exports: [
    {
      name: String,
      from: String,
      data_type: String,
      description: String,
      notes: String,
    },
  ],
  functions: [
    {
      name: String,
      description: String,
      externalLocation: String,
      parameters: String,
      lifeCycle: String,
      returns: String,
      notes: String,
    },
  ],
  connectedFiles: {
    parents: [
      {
        name: String,
        path: String,
        file_type: String,
      },
    ],
    children: [
      {
        name: String,
        path: String,
        file_type: String,
      },
    ],
    helpers: [
      {
        name: String,
        path: String,
        file_type: String,
      },
    ],
  },
});

export default model("Component", ComponentSchema);
