// import fs from "node:fs/promises";
import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema({
  todo: {
    type: String,
    required: [true, "todo is required!"],
  },
});

export const TodoModel = mongoose.model("TodoModel", todoSchema);
