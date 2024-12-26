'use client'

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

import globalstyles from "@/app/page.module.css";
import { Appbar } from "@/components";

import styles from "./page.module.css";


export default function Task({ id, isComplete, setCompleteCB }) {
	const router = useRouter()

	const [completeText, setText] = useState(isComplete ? "Completed" : "In Progress")

	const setComplete = () => {
		isComplete = !isComplete
		setCompleteCB(isComplete)
		setText(isComplete ? "Completed" : "In Progress")
	}

	return (
		<div className={globalstyles.page}>
			<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
			<Appbar />
			<div className={globalstyles.container}>
				<div style={{ display: "flex", flexDirection: "row" }}>
					<i className="fa fa-arrow-circle-o-left" onClick={router.back()} />
					<div className={globalstyles.windows}>
						<div style={{ display: "flex", flexDirection: "row" }}>
							<div className={`${globalstyles.font} ${globalstyles.title}`}>To Do List</div>
							<i className="fa-edit" />
						</div>

						<button type="submit" className={styles.btn} onClick={setComplete}>
							{isComplete && (
								<i className="fa-check" />
							)}
							{!isComplete && (
								<i className="fa-regular fa-square" />
							)}
							<div style={{ flexGrow: 1, alignSelf: "center"}}>{completeText}</div>
						</button>


					</div>
				</div>
			</div >
		</div >
	);
}
