'use client'

import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState([])

  const addTodo = () => setTodos([
    ...todos,
    {
      id: todos.length + 1,
      name: todos.length + 1,
    }, 
  ])

  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      <div className={styles.appbar}>
        <div className={`${styles.font} ${styles.title} ${styles.user}`}>Hi Justin~</div>
        <button className={`${styles.font} ${styles.logout}`}>Logout</button>
      </div>
      <div className={styles.container}>
        <div className={styles.windows}>
          <div className={`${styles.font} ${styles.title}`}>To Do List</div>
          <div className={styles.list}>
            <ul id="ul">
              {todos.map((todo) => (
                <li key={todo.id}>
                  <div>{todo.name}</div>
                </li>
              ))}
            </ul>
          </div>
          <button type="submit" className={styles.btn} onClick={addTodo}>
            <i className="fa fa-plus"></i>
            <div className={styles.create_btn}>Create new task</div>
          </button>
        </div>
      </div>
    </>
  );
}
