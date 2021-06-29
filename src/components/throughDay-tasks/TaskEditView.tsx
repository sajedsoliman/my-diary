import React, { useCallback, useEffect, useState } from "react";

// hooks
import { Form } from "hooks/useForm";

// components
import Store from "backends/Store";

// Types
import { ThroughDayTaskProps } from "typescripts/commonTypes";

type Props = {
	task: ThroughDayTaskProps;
	taskList: ThroughDayTaskProps[];
	toggleEditView: () => void;
};

const TaskEditView = ({ task, taskList, toggleEditView }: Props) => {
	const [taskBody, setTaskBody] = useState(task.body);

	// Import Store component to update/delete the task
	const { handleUpdateTask, handleDeleteTask } = Store();

	// handle body input change
	const onChangeBody = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTaskBody(e.target.value);
	};

	// handle update task
	const updateTask = () => {
		toggleEditView();

		if (taskBody === "") return handleDeleteTask("throughDay_tasks", task);

		if (task.body === taskBody) return;

		const newBody = { body: taskBody };
		handleUpdateTask(taskList, "throughDay_tasks", newBody, task.id);
	};

	// handle submit
	const handleSubmit = () => {
		updateTask();
	};

	// set a listener to listen for keyboard (esc key) pressing to close the edit form
	const handleKeyPress = useCallback(
		(e: KeyboardEvent): void => {
			const isEscape = e.key === "Escape";

			// if escape is pressed then handle update it or delete(if title is blank)
			if (isEscape) updateTask();
		},
		[updateTask]
	);

	useEffect(() => {
		window.addEventListener("keydown", handleKeyPress);

		return () => {
			window.removeEventListener("keydown", handleKeyPress);
		};
	}, []);

	return (
		<Form onSubmit={handleSubmit} onBlur={updateTask}>
			{/* Body field */}
			<input
				value={taskBody}
				onChange={onChangeBody}
				placeholder="Task Body"
				autoFocus
				className="border p-1 rounded-md"
			/>

			<button className="sr-only" type="submit"></button>
		</Form>
	);
};

export default TaskEditView;
