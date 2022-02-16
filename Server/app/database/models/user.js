import mongoose from "mongoose";
const { Schema, model, SchemaTypes } = mongoose;

export const UserSchema = new Schema(
  {
    id: SchemaTypes.ObjectId,
    user_id: { type: String, required: true },
    username: { type: String, required: true },
    email: String,
    password: { type: String, required: true },
    role: { type: String, required: true },
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
    organizations: [
      {
        id: SchemaTypes.ObjectId,
        organization_id: String,
        name: String,
        created: String,
        edited: String,
      },
    ],
    friends: [{ user_id: String, username: String }],
    friend_requests: {
      sent: [
        {
          id: SchemaTypes.ObjectId,
          user_id: String,
          username: String,
        },
      ],
      received: [
        {
          id: SchemaTypes.ObjectId,
          user_id: String,
          username: String,
        },
      ],
    },
  },
  {
    timestamps: { createdAt: "created", updatedAt: "edited" },
  }
);

export default model("User", UserSchema);
