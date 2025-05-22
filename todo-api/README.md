# TODO API

A simple RESTful API built with Express.js for managing todo items.

### Get a specific todo
GET /todos/:id

### Create a new todo
POST /todos
{
    "title": "New Task",
    "completed": false
}

### Update a todo
PUT /todos/:id
{
    "title": "Updated Task",
    "completed": true
}

### Delete a todo
DELETE /todos/:id


