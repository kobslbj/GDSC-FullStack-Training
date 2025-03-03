## **Authentication**

All task-related endpoints require JWT authentication via the `Authorization` header:

```
Authorization: Bearer <token>
```

---

## **Endpoints**

### **Authentication**

### **Register User**

Registers a new user in the system.

**POST** `/auth/register`

- **Request Body**:

```json
{
  "name": "string",
  "password": "string"
}
```

- **Response (200 OK)**:

```json
{
  "id": "number",
  "name": "string",
  "createdAt": "string",
  "updatedAt": "string"
}
```

---

### **Login**

Authenticates a user and generates a JWT token.

**POST** `/auth/login`

- **Request Body**:

```json
{
  "name": "string",
  "password": "string"
}
```

- **Response (200 OK)**:

```json
{
  "token": "string",
  "name": "string"
}
```

---

### **Tasks**

### **Create Task**

Creates a new task for the authenticated user.

**POST** `/tasks`

- **Request Body**:

```json
{
  "taskName": "string",
  "taskDescription": "string"
}
```

- **Response (200 OK)**:

```json
{
  "id": "number",
  "task_name": "string",
  "task_description": "string",
  "is_completed": false,
  "createdAt": "string",
  "updatedAt": "string"
}
```

---

### **Get All Tasks**

Fetches all tasks for the authenticated user, ordered by creation time (newest first).

**GET** `/tasks`

- **Response (200 OK)**:

```json
[
  {
    "id": "number",
    "task_name": "string",
    "task_description": "string",
    "is_completed": false,
    "createdAt": "string",
    "updatedAt": "string"
  },
  {
    "id": "number",
    "task_name": "string",
    "task_description": "string",
    "is_completed": true,
    "createdAt": "string",
    "updatedAt": "string"
  }
]
```

---

### **Get Task By ID**

Fetches a specific task by its ID.

**GET** `/tasks/:id`

- **Parameters**:
    - `id` (Task ID, number)
- **Response (200 OK)**:

```json
{
  "id": "number",
  "task_name": "string",
  "task_description": "string",
  "is_completed": false,
  "createdAt": "string",
  "updatedAt": "string"
}
```

- **Error (404 Not Found)**:

```json
{
  "error": "Task not found"
}
```

---

### **Update Task**

Updates the name and description of a specific task.

**PUT** `/tasks/:id`

- **Parameters**:
    - `id` (Task ID, number)
- **Request Body**:

```json
{
  "taskName": "string",
  "taskDescription": "string"
}
```

- **Response (200 OK)**:

```json
{
  "id": "number",
  "task_name": "string",
  "task_description": "string",
  "is_completed": false,
  "createdAt": "string",
  "updatedAt": "string"
}
```

- **Error (404 Not Found)**:

```json
{
  "error": "Task not found"
}
```

---

### **Complete Task**

Marks a specific task as completed.

**PATCH** `/tasks/:id/complete`

- **Parameters**:
    - `id` (Task ID, number)
- **Response (200 OK)**:

```json
{
  "message": "Task marked as completed",
  "id": "number",
  "task_name": "string",
  "is_completed": true,
  "createdAt": "string",
  "updatedAt": "string"
}
```

- **Error (404 Not Found)**:

```json
{
  "error": "Task not found"
}
```

---

### **Delete Task**

Deletes a specific task by its ID.

**DELETE** `/tasks/:id`

- **Parameters**:
    - `id` (Task ID, number)
- **Response (204 No Content)**:
No response body.
- **Error (404 Not Found)**:

```json
{
  "error": "Task not found"
}
```

---

## **Error Responses**

All endpoints may return the following error format:

- **Error Response**:

```json
{
  "error": "error message"
}
```

- **HTTP Status Codes**:
    - `400`: Bad Request (e.g., missing required fields, invalid data)
    - `401`: Unauthorized (e.g., invalid or missing token)
    - `404`: Not Found (e.g., resource not found)
    - `500`: Internal Server Error (e.g., unexpected server error)

---

## **Notes**

- **Token Expiry**:
Tokens expire in 1 hour; refresh tokens periodically for seamless access.
- **Timestamps**:
All timestamps are returned in ISO 8601 format.
- **Headers**:
Ensure `Content-Type: application/json` is present in all requests.

---

## **Enhancements**

- **Query Parameters for Tasks**:
Future implementation can include optional filters for `/tasks`:
    - `GET /tasks?completed=true` (to fetch only completed tasks)
    - `GET /tasks?search=keyword` (to search tasks by name or description)