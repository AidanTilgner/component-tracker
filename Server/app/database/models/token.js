import mongoose from "mongoose";
const { Schema, model, SchemaTypes } = mongoose;

const TokenSchema = new Schema({
  token: String,
});

export default model("Token", TokenSchema);
