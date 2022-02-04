import mongoose from "mongoose";
const { Schema, model, SchemaTypes } = mongoose;

const ComponentSchema = new Schema({
  creator: { username: String, id: String },
  description: String,
  type: String,
  metaData: {
    category: String,
    path: String,
    example: String,
    description: String,
    props: [{ name: String, description: String, type: String }],
    state: [{ name: String, description: String, type: String }],
    tags: [{ name: String, type: String }],
  },
  imports: [
    {
      name: String,
      from: String,
      type: String,
      description: String,
      notes: String,
    },
  ],
  exports: [
    {
      name: String,
      from: String,
      type: String,
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
        type: String,
      },
    ],
    children: [
      {
        name: String,
        path: String,
        type: String,
      },
    ],
    helpers: [
      {
        name: String,
        path: String,
        type: String,
      },
    ],
  },
});

export default ComponentSchema;
