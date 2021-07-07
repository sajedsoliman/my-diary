import { useState } from "react";

// UI
import { makeStyles, Tooltip, useTheme } from "@material-ui/core";

// utils
import clsx from "clsx";

// components
import TaskControls from "components/main-tasks/TaskControls";
import Store from "./../../backends/Store";
import { Draggable } from "react-beautiful-dnd";
import TaskEditView from "./TaskEditView";

// Types
import { ThroughDayTaskProps } from "typescripts/commonTypes";

type Props = {
	task: ThroughDayTaskProps;
	taskList: ThroughDayTaskProps[];
	index: number;
};

// styles
const useStyles = makeStyles((theme) => ({
	tooltip: {
		fontSize: 14,
	},
}));

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
							"p-2 flex items-center justify-between bg-white rounded-md",
							snapshot.isDragging && "border-red-300 shadow-md overflow-y-hidden",
							!editView ? "border my-1" : "my-2",
							darkMode && "bg-dark text-white border-dark"
						)}
					>
						{editView ? (
							<TaskEditView toggleEditView={toggleEditView} taskList={taskList} task={task} />
						) : task.completed ? (
							<Tooltip
								classes={{ tooltip: classes.tooltip }}
								placement="left"
								title={task.completionNote}
							>
								<h6
									onClick={toggleEditView}
									className={`${task.completed && "line-through"} flex-1 cursor-pointer text-sm`}
								>
									{task.body}
								</h6>
							</Tooltip>
						) : (
							<h6 onClick={toggleEditView} className={`flex-1 cursor-pointer text-sm`}>
								{task.body}
							</h6>
						)}

						{!editView && (
							<TaskControls
								task={task}
								taskList={taskList}
								handleDelete={handleDelete}
								handleToggleTask={handleToggleTask}
								completed={task.completed}
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
