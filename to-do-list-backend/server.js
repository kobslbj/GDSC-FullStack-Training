const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let todos = [];

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.get("/todos/:id", (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  res.json(todo);
});

app.post("/todos", (req, res) => {
  const { title, completed } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });

  const newTodo = { id: todos.length + 1, title, completed: completed || false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.put("/todos/:id", (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ error: "Todo not found" });

  const { title, completed } = req.body;
  if (title !== undefined) todo.title = title;
  if (completed !== undefined) todo.completed = completed;

  res.json(todo);
});

app.delete("/todos/:id", (req, res) => {
  const index = todos.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Todo not found" });

  todos.splice(index, 1);
  res.json({ message: `Todo ${req.params.id} deleted` });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
