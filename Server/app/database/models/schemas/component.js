import mongoose from "mongoose";
const { Schema, model, SchemaTypes } = mongoose;

export const ComponentSchema = new Schema({
  id: SchemaTypes.ObjectId,
  component_id: String,
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
      path: String,
      data_type: String,
      description: String,
      notes: String,
    },
  ],
  exports: [
    {
      name: String,
      path: String,
      data_type: String,
      description: String,
      notes: String,
    },
  ],
  functions: [
    {
      name: String,
      parameters: String,
      returns: String,
      path: String,
      description: String,
      lifecycle: String,
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
