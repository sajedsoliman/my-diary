import { useState } from "react";

// UI
import { makeStyles, Tooltip, useTheme } from "@material-ui/core";

// utils
import clsx from "clsx";

// hooks
import useWindowWidth from "hooks/useWindowWidth";

// components
import { Draggable } from "react-beautiful-dnd";
import TaskControls from "components/task/TaskControls";
import Store from "./../../backends/Store";
import TaskEditView from "./TaskEditView";
import InfoView from "components/throughDay-tasks/InfoView";

// Types
import { ThroughDayTaskProps } from "typescripts/commonTypes";

type Props = {
	task: ThroughDayTaskProps;
	taskList: ThroughDayTaskProps[];
	index: number;
};

// styles
const useStyles = makeStyles((theme) => ({}));

const ThroughDayTask = ({ task, taskList, index }: Props) => {
	const classes = useStyles();

	// State vars
	const [editView, setEditView] = useState(false);

	// handle toggle edit view
	const toggleEditView = () => {
		if (task.completed) return;

		setEditView((prev) => !prev);
	};

	// Import Store component to update & delete the task
	const { handleDeleteTask, handleUpdateTask } = Store();

	// handle toggle task (complete/incomplete)
	const handleToggleTask = () => {
		handleUpdateTask(taskList, "throughDay_tasks", { completed: !task.completed }, task.id);
	};

	// handle delete a task
	const handleDelete = () => {
		handleDeleteTask("throughDay_tasks", task);
	};

	const darkMode = useTheme().palette.type === "dark";

	return (
		<Draggable draggableId={task.id} index={index}>
			{({ dragHandleProps, draggableProps, innerRef }, snapshot) => {
				return (
					<li
						ref={innerRef}
						// will not be draggable if it is in edit view
						{...(!editView && { ...draggableProps, ...dragHandleProps })}
						className={clsx(
							"flex items-center justify-between bg-white rounded-md p-2 my-1",
							snapshot.isDragging && "border-red-300 shadow-md overflow-y-hidden",
							!editView && "border",
							darkMode && "bg-dark text-white border-dark"
						)}
					>
						{editView ? (
							<TaskEditView toggleEditView={toggleEditView} taskList={taskList} task={task} />
						) : (
							<InfoView task={task} toggleEditView={toggleEditView} />
						)}

						{/* task controls => delete, complete, archive ... */}
						{!editView && (
							<TaskControls
								task={task}
								taskList={taskList}
								handleDelete={handleDelete}
								handleToggleTask={handleToggleTask}
								listType="throughDay_tasks"
							/>
						)}
					</li>
				);
			}}
		</Draggable>
	);
};

export default ThroughDayTask;
