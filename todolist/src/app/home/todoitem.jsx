import { useState } from "react";
import globalstyles from "@/app/page.module.css";
import styles from "./page.module.css";

import { useRouter } from "next/navigation";

export default function Todoitem({ todo, todos, callback }) {
    const router = useRouter()

    const [item, setItem] = useState(todo)
    const [isComplete, setComplete] = useState(todo.isComplete)

    // Update the state when isComplete changes
    const handleCheckboxChange = () => {
        setComplete(prevState => !prevState);
    };

    const handleItemClick = () => {
        // Save the selected task's data to sessionStorage
        sessionStorage.setItem(`taskData_${todo.id}`, JSON.stringify(todo));
    
        // Navigate to the Task page with the todo's id
        router.push(`/task?id=${todo.id}`);
      };

    const deleteItem = () => {
        const updateTodos = todos.filter(item => item.id !== todo.id);
        return callback(updateTodos);
    }

    return (
        <div className={styles.mission} onClick={handleItemClick}>
            <input type="checkbox" checked={isComplete} onChange={handleCheckboxChange} />
            <div className={`${globalstyles.font} ${globalstyles.subtitle} ${styles.name}`}>{item.name}</div>
            {/* <button className={styles.delete} onClick={deleteItem}><i className="fa fa-trash"></i></button> */}
            <i className={`fa fa-trash ${styles.delete}`} onClick={deleteItem} />
        </div>
    );
}