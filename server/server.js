import express from "express";
import mongoose from "mongoose";
import "dotenv/config.js";
import { TodoModel } from "./model/TodoModel.js";

mongoose.connect(process.env.DB);

const app = express();
const PORT = process.env.PORT || 3008;

app.use(express.json());
app.use(express.static("../frontend/build"));

app.get("/todos", async (req, res) => {
  const todos = await TodoModel.find();
  res.send(todos);
});

app.post("/todos", async (req, res) => {
  try {
    const todo = req.body;
    const newTodo = await TodoModel.create(todo);
    console.log(todo, newTodo);
    res.send({ newEntry: newTodo, errors: null });
  } catch (e) {
    res.send({ newEntry: null, errors: e.errors });
  }
});

app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const todo = req.body;
  const updatedTodo = await TodoModel.findByIdAndUpdate(id, todo);
  res.send(updatedTodo);
});

app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  await TodoModel.findByIdAndDelete(id);
  res.send("it has deleted");
});

app.listen(PORT, () =>
  console.log(`Server ist am laufen mit diesem Port ${PORT}`)
);
