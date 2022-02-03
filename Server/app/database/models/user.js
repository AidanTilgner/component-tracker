import { Schema, model, SchemaTypes } from "mongoose";

const UserSchema = new Schema({
  id: SchemaTypes.ObjectId,
  username: String,
  email: String,
  password: String,
  role: String,
  projects: [
    {
      id: SchemaTypes.ObjectId,
      name: String,
      edited: String,
      framework: String,
    },
  ],
});

export default model("User", UserSchema);
