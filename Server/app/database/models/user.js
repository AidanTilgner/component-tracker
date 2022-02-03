import mongoose from "mongoose";
const { Schema, model, SchemaTypes } = mongoose;

const UserSchema = new Schema({
  id: SchemaTypes.ObjectId,
  user_id: String,
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
