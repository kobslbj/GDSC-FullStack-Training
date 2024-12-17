import { useState } from "react";
import styles from "./page.module.css";

export default function TaskWindows({taskName, setTaskName, description, setDescription, addTodoCB}) {
    const isFormValid = (taskName.trim() !== "" && description.trim() !== "");

    return (
        <div className={styles.create_windows}>
            <div className={`${styles.font} ${styles.subtitle}`}>Task Name</div>
            <input
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="Enter task name"
                className={`${styles.task_input} ${styles.taskname}`}
            />
            <div className={`${styles.font}`}>Description</div>
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                // placeholder="Enter task name"
                className={`${styles.task_input} ${styles.desciption}`}
            />
            <button type="submit" className={styles.task_btn} onClick={addTodoCB} disabled={!isFormValid}>Add Task</button>
        </div>
    );
}