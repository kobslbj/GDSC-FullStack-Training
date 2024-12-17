'use client'

import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";
import { Appbar, Todoitem, CreateTaskWindows } from "@/components";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [isTaskWindowsVisible, setVisible] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setDescription] = useState("");

  const addTodo = () => {
    var id = todos.length ? ((todos.at(-1)).id + 1) : 0;
    var name = `This is todo name ${id}`;

    var newTodo = {
      id: id,
      name: taskName
    };

    setVisible(false);
    setTaskName("");
    setDescription("");

    return setTodos([
      ...todos,
      newTodo
    ]);
  };

  const setWindowsVisible = () => {
    setVisible(!isTaskWindowsVisible);
    if(isTaskWindowsVisible){
      setTaskName("");
      setDescription("");
    }
  }

  return (
    <div className={styles.page}>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      <Appbar/>
      <div className={styles.container}>
        <div className={styles.windows}>
          <div className={`${styles.font} ${styles.title}`}>To Do List</div>
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
            <CreateTaskWindows
              taskName={taskName}
              setTaskName={setTaskName}
              desciption={taskDescription}
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
