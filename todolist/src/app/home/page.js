'use client'

import Image from "next/image";
import globalstyles from "@/app/page.module.css";
import styles from "./page.module.css";
import { useState } from "react";
import { Appbar } from "@/components";
import TaskWindows from "./task_windows";
import Todoitem from "./todoitem";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [isTaskWindowsVisible, setVisible] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setDescription] = useState("");

  const addTodo = () => {
    var id = todos.length ? ((todos.at(-1)).id + 1) : 0;

    var newTodo = {
      id: id,
      name: taskName,
      description: taskDescription,
      isComplete: false,
    };

    setTodos([...todos, newTodo]);

    setVisible(false);
    setTaskName("");
    setDescription("");

    // sessionStorage.setItem(`taskData_${newTodo.id}`, JSON.stringify(newTodo))
  };

  const setWindowsVisible = () => {
    setVisible(!isTaskWindowsVisible);
    if (isTaskWindowsVisible) {
      setTaskName("");
      setDescription("");
    }
  }

  return (
    <div className={globalstyles.page}>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      <Appbar />
      <div className={globalstyles.container}>
        <div className={globalstyles.windows}>
          <div className={`${globalstyles.font} ${globalstyles.title}`}>To Do List</div>
          <div className={styles.list}>
            <ul id="ul">
              {todos.map((todo) => (
                <li key={todo.id}>
                  <Todoitem todo={todo} todos={todos} callback={setTodos} />
                </li>
              ))}
            </ul>
          </div>

          {isTaskWindowsVisible && (
            <TaskWindows
              taskName={taskName}
              setTaskName={setTaskName}
              description={taskDescription}
              setDescription={setDescription}
              addTodoCB={addTodo}
            />
          )}

          <button type="submit" className={styles.btn} onClick={setWindowsVisible}>
            <i className="fa fa-plus"></i>
            <div className={styles.create_btn}>Create new task</div>
          </button>


        </div>
      </div>
    </div>
  );
}
