import { useState } from "react";
import styles from "@/app/page.module.css";

export default function CreateTaskWindows({taskName, setTaskName, desciption, setDescription, addTodoCB}) {
    // const [item, setItem] = useState(todo)

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
                value={desciption}
                onChange={(e) => setDescription(e.target.value)}
                // placeholder="Enter task name"
                className={`${styles.task_input} ${styles.desciption}`}
            />
            <button type="submit" className={styles.task_btn} onClick={addTodoCB} disabled={!taskName.trim()}>Add Task</button>
        </div>
    );
}