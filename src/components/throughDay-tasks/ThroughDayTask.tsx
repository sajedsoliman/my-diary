import { useState } from "react";

// Components
import TaskControls from "components/main-tasks/TaskControls";
import Store from "./../../backends/Store";
import { Draggable } from "react-beautiful-dnd";

// Types
import { ThroughDayTaskProps } from "typescripts/commonTypes";
import TaskEditView from "./TaskEditView";
import { useTheme } from "@material-ui/core";
type Props = {
	task: ThroughDayTaskProps;
	taskList: ThroughDayTaskProps[];
	index: number;
};

const ThroughDayTask = ({ task, taskList, index }: Props) => {
	// State vars
	const [editView, setEditView] = useState(false);
	const [taskBody, setTaskBody] = useState(task.body);

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
			{({ dragHandleProps, draggableProps, innerRef }) => (
				<li
					{...dragHandleProps}
					ref={innerRef}
					{...draggableProps}
					className="border p-2 flex items-center justify-between"
				>
					{editView ? (
						<TaskEditView toggleEditView={toggleEditView} taskList={taskList} task={task} />
					) : (
						<h6
							onClick={toggleEditView}
							className={`${task.completed && "line-through"} ${
								darkMode && "text-white"
							} cursor-pointer text-sm`}
						>
							{task.body}
						</h6>
					)}

					<TaskControls
						handleDelete={handleDelete}
						handleToggleTask={handleToggleTask}
						completed={task.completed}
					/>
				</li>
			)}
		</Draggable>
	);
};

export default ThroughDayTask;
