import { useState } from "react";

// UI
import { Button, useTheme } from "@material-ui/core";

// Icons
import { Add } from "@material-ui/icons";

// utils
import clsx from "clsx";

// components
import ThroughDayTask from "./ThroughDayTask";
import NewTaskSample from "./NewTaskSample";
import { Droppable } from "react-beautiful-dnd";

// Types
import { ThroughDayTaskProps } from "typescripts/commonTypes";
type Props = {
	list: ThroughDayTaskProps[];
};

const ThroughDayTaskList = ({ list }: Props) => {
	// State vars
	const [sampleOpen, setSampleOpen] = useState(false);
	const [didSampleClosed, setSampleClosed] = useState(false);

	// Mapped tasks
	const mappedTasks = list.map((task: ThroughDayTaskProps, index: number) => (
		<ThroughDayTask key={task.id} task={task} taskList={list} index={index} />
	));

	// handle toggle the new task sample
	const toggleSample = () => {
		if (sampleOpen) {
			// closed
			setSampleClosed(true);
		} else {
			setSampleOpen(true);

			setSampleClosed(false);
		}
	};

	const taskListLength = list.length;

	const darkMode = useTheme().palette.type === "dark";

	return (
		<div>
			{/* List itself */}
			<Droppable droppableId="throughDay_tasks">
				{({ innerRef, droppableProps, placeholder }) => (
					<ul ref={innerRef} {...droppableProps} className="mb-2 mt-4 rounded-sm overflow-hidden">
						{taskListLength === 0 ? (
							<h3 className={clsx(darkMode && "text-white")}>No Tasks</h3>
						) : (
							mappedTasks
						)}

						{/* new task sample */}
						{sampleOpen && (
							<li className="border p-2">
								<NewTaskSample
									didSampleClosed={didSampleClosed}
									closeSample={() => setSampleOpen(false)}
								/>
							</li>
						)}

						{placeholder}
					</ul>
				)}
			</Droppable>

			{/* add task button */}
			<Button
				color="secondary"
				variant="outlined"
				onClick={toggleSample}
				startIcon={<Add />}
				size="small"
			>
				Add Task
			</Button>
		</div>
	);
};

export default ThroughDayTaskList;
