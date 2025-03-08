'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import styles from '../../styles/Home.module.css';
const API_BASE_URL = 'https://gdsc-fullstack-training.onrender.com';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskName, setEditingTaskName] = useState('');
  const [editingTaskDescription, setEditingTaskDescription] = useState('');
  // const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // useEffect(() => {
  //   const token = Cookies.get('token');
  //   if (!token) {
  //     router.push('/login'); // Redirect to login if not authenticated
  //     return;
  //   }

  //   axios
  //     .get(`${API_BASE_URL}/tasks`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //     .then((res) => setTasks(res.data))
  //     .catch((err) => {
  //       console.error(err);
  //       alert('Failed to load tasks. Redirecting to login.');
  //       Cookies.remove('token');
  //       router.push('/login'); // Redirect on error
  //     })
  //     .finally(() => setIsLoading(false));
  // }, [router]);

  const addTask = () => {
    if (newTaskName.trim() === '') return;
    // const token = Cookies.get('token');
    // axios
    //   .post(
    //       '${API_BASE_URL}/tasks',
    //       { taskName: newTaskName, taskDescription: newTaskDescription},
    //       { headers: { Authorization: 'Bearer ${token}'}}
    //   )
    //   .then((res) => setTasks([...tasks, res.data]))
    //   .catch((err) => {
    //       console.error(err);
    //       alert('Failed to add tasks.');
    //   });
    setTasks([
      ...tasks,
      { id: Date.now(), name: newTaskName,description:newTaskDescription, completed: false },
    ]);
    setNewTaskName('');
    setNewTaskDescription('');
  };

  const deleteTask = (id) => {
    // const token = Cookies.get('token');
    // axios
    //   .delete('${API_BASE_URL}/tasks/${id}',{
    //     headers: {Authorization: 'Bearer ${token}'},
    //   })
    //   .then(() => setTasks(tasks.filter((task) => task.id !== id)))
    //   .catch((err) =>{
    //     console.error(err);
    //     alert('Failed to delete tasks.');
    //   });
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    // const token = Cookies.get('token');
    // const task = tasks.find((task) => task.id === id);

    // axios
    //   .patch(
    //     `${API_BASE_URL}/tasks/${id}/complete`,
    //     {},
    //     { headers: { Authorization: `Bearer ${token}` } }
    //   )
    //   .then(() =>
    //     setTasks(
    //       tasks.map((task) =>
    //         task.id === id ? { ...task, is_completed: !task.is_completed } : task
    //       )
    //     )
    //   )
    //   .catch((err) => {
    //     console.error(err);
    //     alert('Failed to update task status.');
    //   });
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
    // const token = Cookies.get('token');

    // axios
    //   .put(
    //     `${API_BASE_URL}/tasks/${editingTaskId}`,
    //     { taskName: editingTaskName, taskDescription: editingTaskDescription },
    //     { headers: { Authorization: `Bearer ${token}` } }
    //   )
    //   .then(() => {
    //     setTasks(
    //       tasks.map((task) =>
    //         task.id === editingTaskId
    //           ? { ...task, task_name: editingTaskName, task_description: editingTaskDescription }
    //           : task
    //       )
    //     );
    //     setEditingTaskId(null);
    //     setEditingTaskName('');
    //     setEditingTaskDescription('');
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //     alert('Failed to edit task.');
    //   });
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

  // const handleLogout = () => {
  //   Cookies.remove('token');
  //   router.push('/login');
  // };

  // if (isLoading) return <p>Loading...</p>; 
  return (
    <div className={styles.container}>
        <div className={styles.username}>
            <span >Hi User~</span>
            {/* <button onClick={handleLogout} className="logout-button">Log out</button> */}
            <button onClick={saveTask} className={styles.logoutButton}>Log out</button>
        </div>
      <h1 className={styles.title}>To Do List</h1>
      <div className={styles.todoList}>
      {tasks.map((task) => (
          <div
            key={task.id}
            className={styles.todoItem}
            onClick={() => startEditing(task)}
            >
            {editingTaskId === task.id ? (
              <div className={styles.editContainer} onClick={(e) => e.stopPropagation()}>
              <button className={styles.backButton} onClick={cancelEditing}>←</button>
              <h2 className={styles.editTitle}>Task Name</h2>
              <input
                type="text"
                className={styles.editInput}
                value={editingTaskName}
                onChange={(e) => setEditingTaskName(e.target.value)}
                placeholder="Edit task name"
              />
              <h2 className={styles.editTitle}>Task Description</h2>
              <textarea
                className={styles.editTextarea}
                value={editingTaskDescription}
                onChange={(e) => setEditingTaskDescription(e.target.value)}
                placeholder="Edit task description"
              />
              <button className={`${styles.completeButton} ${task.completed ? styles.completed : styles.incomplete}`} onClick={(e) => { 
                e.stopPropagation(); 
                toggleTaskCompletion(task.id);
                }}>
                {task.completed ? "✅ Completed" : "Mark as Complete"}
                </button>
                <div className={styles.buttonGroup}>
                <button className={styles.saveButton} onClick={(e) => { 
                  e.stopPropagation(); 
                  saveTask();
                }}>
                  Save
                </button>
                <button className={styles.cancelButton} onClick={(e) => { 
                  e.stopPropagation(); 
                  cancelEditing();
                }}>
                  Cancel
                </button>
              </div>
              </div>
            ):(
            <>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={(e) => {
                e.stopPropagation();
                toggleTaskCompletion(task.id);
              }}
            />
            <span
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
                color:'#888',
              }}
            >
              {task.name}
            </span>
            <button className={styles.deleteButton} onClick={(e) => {
              e.stopPropagation();
              deleteTask(task.id);
            }}>
              🗑️
            </button>
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
