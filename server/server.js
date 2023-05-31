import express from "express";
import cors from "cors";
import { todos, addTodo, updateTodo, deleteTodo } from "./model/TodoModel.js";

const app = express()

const PORT = process.env.Port || 3001;

app.use(express.json())
app.use(express.static('../frontend/build'))
app.use(cors())


app.get("/todos", (req, res)=> {
    res.send(todos);
})

app.post("/todos", async (req, res) => {
    const todo = req.body
    const newTodo = await addTodo(todo)
    res.send(newTodo)
})

app.put("/todos/:id", async (req, res) => {
    const { id } = req.params;
    const todo = req.body;
    const updatedTodo = await updateTodo(id, todo)
    res.send(updatedTodo);
})

app.delete("/todos/:id", (req, res) => {
    const { id } = req.params;
    deleteTodo(id);
    res.send("it has deleted")
})


app.listen(PORT, () => console.log(`Server ist am laufen mit diesem Port ${PORT}`))