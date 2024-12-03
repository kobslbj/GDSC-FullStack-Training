import { useState } from "react";
import styles from "@/app/page.module.css";

export default function Todoitem({todo, todos, callback}) {
    const [item, setItem] = useState(todo)


    const deleteItem = () => {
        const updateTodos = todos.filter(item => item.id !== todo.id);
        return callback(updateTodos);
    }

    return (
        <div className={styles.mission}>
            <input type="checkbox" />
            <div className={`${styles.font} ${styles.subtitle} ${styles.name}`}>{item.name}</div>
            <button className={styles.delete} onClick={deleteItem}><i className="fa fa-trash"></i></button>
        </div>
    );
}