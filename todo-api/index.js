const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

let todos = [
    { id: 1, title: "work", completed: false },
    { id: 2, title: "assignent 1", completed: false }
  ];

  app.get("/todos", (req, res) => {
    res.json(todos);
  });

  app.get("/todos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json(todo);
  });
  
  app.post("/todos", (req, res) => {
    const { title, completed } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    const newTodo = {
      id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
      title,
      completed: completed || false
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
  });

  app.put("/todos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { title, completed } = req.body;
    const todoIndex = todos.findIndex(t => t.id === id);
  
    if (todoIndex === -1) {
      return res.status(404).json({ message: "Todo not found" });
    }
  
    todos[todoIndex] = {
      ...todos[todoIndex],
      title: title || todos[todoIndex].title,
      completed: completed !== undefined ? completed : todos[todoIndex].completed
    };
  
    res.json(todos[todoIndex]);
  });
  
  app.delete("/todos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const todoIndex = todos.findIndex(t => t.id === id);
  
    if (todoIndex === -1) {
      return res.status(404).json({ message: "Not found" });
    }
  
    todos.splice(todoIndex, 1);
    res.status(204).send();
  });
  
