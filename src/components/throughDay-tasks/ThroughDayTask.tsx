import { useState } from "react";

// UI
import { useTheme } from "@material-ui/core";

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

const ThroughDayTask = ({ task, taskList, index }: Props) => {
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
						{...dragHandleProps}
						ref={innerRef}
						{...draggableProps}
						className={clsx(
							snapshot.isDragging && "border-red-300 shadow-md",
							"border p-2 flex items-center justify-between bg-white my-1"
						)}
					>
						{editView ? (
							<TaskEditView toggleEditView={toggleEditView} taskList={taskList} task={task} />
						) : (
							<h6
								onClick={toggleEditView}
								className={`${task.completed && "line-through"} flex-1 cursor-pointer text-sm`}
							>
								{task.body}
							</h6>
						)}

						<TaskControls
							handleDelete={handleDelete}
							handleToggleTask={handleToggleTask}
							completed={task.completed}
							listType="throughDay_tasks"
						/>
					</li>
				);
			}}
		</Draggable>
	);
};

export default ThroughDayTask;
