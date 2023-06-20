import { TodoModel } from "./model/TodoModel.js";
import mongoose from "mongoose";
import "dotenv/config.js";

await mongoose.connect(process.env.DB);

const todo = new TodoModel();
todo.todo = "einkaufen gehen";
await todo.save();

const todo2 = new TodoModel({
  todo: "mit dem Hund gassy gehen.",
});
await todo2.save();

await TodoModel.create({
  todo: "shoppen gehen.",
});

mongoose.disconnect();
