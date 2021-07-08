import { useState } from "react";

// UI
import { Button, useTheme, Divider } from "@material-ui/core";

// icons
import { Add } from "@material-ui/icons";

// utils
import clsx from "clsx";

// components
import ThroughDayTask from "./ThroughDayTask";
import NewTaskSample from "./NewTaskSample";
import { Droppable } from "react-beautiful-dnd";

// types
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
		<div className="mt-4">
			{/* List itself */}
			<Droppable droppableId="throughDay_tasks">
				{({ innerRef, droppableProps, placeholder }, { isDraggingOver }) => (
					<ul
						ref={innerRef}
						{...droppableProps}
						className={clsx(
							"mb-2 p-1 rounded-sm transition-all",
							isDraggingOver && "border-red-200 border"
						)}
					>
						{taskListLength === 0 ? (
							<h3 className={clsx(darkMode && "text-white")}>No Tasks</h3>
						) : (
							mappedTasks
						)}

						{placeholder}

						{/* new task sample */}
						{sampleOpen && (
							<>
								{/* divider */}
								<div className="my-2">
									<Divider />
								</div>

								{/* sample */}
								<li className="py-2">
									<NewTaskSample
										didSampleClosed={didSampleClosed}
										closeSample={() => setSampleOpen(false)}
									/>
								</li>
							</>
						)}
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
