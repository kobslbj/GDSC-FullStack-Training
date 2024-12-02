'use client';
import { useState } from 'react';
import styles from '../../styles/Home.module.css';

// interface Task {
//   id: number;
//   name: string;
//   description: string;
//   completed: boolean;
// }

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskName, setEditingTaskName] = useState('');
  const [editingTaskDescription, setEditingTaskDescription] = useState('');

  const addTask = () => {
    if (newTaskName.trim() === '') return;
    setTasks([
      ...tasks,
      { id: Date.now(), name: newTaskName,description:newTaskDescription, completed: false },
    ]);
    setNewTaskName('');
    setNewTaskDescription('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  //edit task
  const startEditing = (task) => {
    setEditingTaskId(task.id);
    setEditingTaskName(task.name);
    setEditingTaskDescription(task.description);
  };
  const saveTask = () => {
    setTasks(
      tasks.map((task) =>
        task.id === editingTaskId
          ? { ...task, name: editingTaskName, description: editingTaskDescription }
          : task
      )
    );
    setEditingTaskId(null);
    setEditingTaskName('');
    setEditingTaskDescription('');
  };

  const cancelEditing = () => {
    setEditingTaskId(null);
    setEditingTaskName('');
    setEditingTaskDescription('');
  };
  return (
    <div className={styles.container}>
        <div className={styles.username}>
            <span >Hi User~</span>
            <button className="logout-button">Log out</button>
        </div>
        <h1 className={styles.title}>To Do List</h1>
      <div className={styles.todoList}>
      {tasks.map((task) => (
          <div key={task.id} className={styles.todoItem}>
            {editingTaskId === task.id ? (
              <div>
              <input
                type="text"
                value={editingTaskName}
                onChange={(e) => setEditingTaskName(e.target.value)}
                placeholder="Edit task name"
              />
              <textarea
                value={editingTaskDescription}
                onChange={(e) => setEditingTaskDescription(e.target.value)}
                placeholder="Edit task description"
              />
              <button onClick={saveTask}>Save</button>
              <button onClick={cancelEditing}>Cancel</button>
              </div>
            ):(
            <>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task.id)}
            />
            <span
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
                color: task.completed ? '#888' : '#333',
              }}
            >
              {task.name}
            </span>
            <div className={styles.buttonContainer}>
              <button
                className={styles.deleteButton} onClick={() => deleteTask(task.id)}>🗑️
              </button>
              <button
                className={styles.editButton} onClick={() => startEditing(task)}>✏️
              </button>
            </div>
            </>
          )}
        </div>
      ))}
      </div>
      <div className={styles.addTask}>
        <h2>Task Name</h2>
        <input
          type="text"
          placeholder="Task Name"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
        ></textarea>
        <button onClick={addTask}>Add Task</button>
      </div>
    </div>
  );
}
