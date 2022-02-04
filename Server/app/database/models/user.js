import mongoose from "mongoose";
const { Schema, model, SchemaTypes } = mongoose;

export const UserSchema = new Schema(
  {
    id: SchemaTypes.ObjectId,
    user_id: String,
    username: String,
    email: String,
    password: String,
    role: String,
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

export default model("User", UserSchema);
