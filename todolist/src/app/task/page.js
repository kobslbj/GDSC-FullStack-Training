'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import globalstyles from "@/app/page.module.css";
import { Appbar } from "@/components";

import styles from "./page.module.css";


export default function Task() {
	const router = useRouter()
	// const {id} = router.query;
	const data = {
		id: 0,
		name: "taskName",
		description: "taskDescription",
		isComplete: false,
	  };

	const [task, setTask] = useState(data)
	const [completeText, setText] = useState(data.isComplete ? "Completed" : "In Progress")
	const [editMode, setEditMode] = useState(false)

	// useEffect(() => {
	// 	if (id){
	// 		const storedTask = sessionStorage.getItem(`taskData_${id}`);
	// 		if (storedTask) {
	// 			const taskData = JSON.parse(storedTask);
	// 			setTask(taskData);
	// 			setText(taskData.isComplete ? "Completed" : "In Progress");
	// 		}
	// 	}
	// }, [id])

	const setComplete = () => {
		if(task) {
			const updatedTask = {...task, isComplete: !task.isComplete};
			sessionStorage.setItem(`taskData_${task.id}`, JSON.stringify(updatedTask));
      setTask(updatedTask); // Update local state
      setText(updatedTask.isComplete ? "Completed" : "In Progress");
		}
	}
	const handleBack = () => {
		console.log("back")
		router.back()
	}

	const handleEditMode = () => {
		setEditMode(prevstat => !prevstat)
	}
	// return (
	// 	<></>
	// )
	return (
		<div className={globalstyles.page}>
			<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
			<Appbar />
			<div className={globalstyles.container}>
				{/* <div style={{ display: "flex", flexDirection: "row" }}> */}
					<div className={globalstyles.windows}>
						<div style={{ width:"100%", display: "flex", flexDirection: "row",  justifyContent: "space-between"}}>
							<i className="fa fa-arrow-left" onClick={handleBack} style={{fontSize:"25px"}}/>
							<i className="fa fa-edit" style={{fontSize:"25px"}} onClick={handleEditMode}/>
						</div>
						<div style={{ margin:"5px" }}/>
						<div className={`${globalstyles.font} ${globalstyles.title}`}>Task Name</div>
						<input className={`${styles.titleInput}`} defaultValue={task.name} disabled={!editMode} />
						<div className={`${globalstyles.font} ${globalstyles.title}`}>Task Description</div>
						<textarea className={`${styles.descriptionInput}`} defaultValue={task.description} disabled={!editMode} />

						<button type="submit" className={styles.btn} onClick={setComplete}>
							{task.isComplete && (
								<i className="fa fa-check-square" />
							)}
							{!task.isComplete && (
								<i className="fa fa-square" />
							)}
							<div style={{ flexGrow: 1, alignSelf: "center", margin:"0 10px"}}>{completeText}</div>
						</button>


					</div>
				{/* </div> */}
			</div >
		</div >
	);
}
