import React, { useEffect, useState, useCallback } from "react";

// Components
import Store from "backends/Store";

// Types
type Props = {
	closeSample: () => void;
	didSampleClosed: boolean;
};

const NewTaskSample = ({ closeSample, didSampleClosed }: Props) => {
	const [sampleBody, setSampleBody] = useState("");

	// import Store component to add the task
	const { addTask } = Store();

	const handleAddTask = () => {
		if (sampleBody === "") return closeSample();

		// add it
		addTask({ body: sampleBody }, "throughDay_tasks");

		closeSample();
	};

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		handleAddTask();
	};

	// set a listener for sample closing
	useEffect(() => {
		if (didSampleClosed) handleAddTask();
	}, [didSampleClosed, handleAddTask]);

	// set a listener to listen for keyboard (esc key) pressing to close the edit form
	const handleKeyPress = useCallback(
		(e: KeyboardEvent): void => {
			const isEscape = e.key === "Escape";

			// if escape is pressed then handle update it or delete(if title is blank)
			if (isEscape) handleAddTask();
		},
		[handleAddTask]
	);

	useEffect(() => {
		window.addEventListener("keydown", handleKeyPress);

		return () => {
			window.removeEventListener("keydown", handleKeyPress);
		};
	}, [sampleBody]);

	// handle change task body
	const handleChangeSampleBody = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSampleBody(e.target.value);
	};

	return (
		<form onBlur={handleAddTask} onSubmit={onSubmit}>
			{/* Body field */}
			<input
				autoFocus
				value={sampleBody}
				onChange={handleChangeSampleBody}
				placeholder="Task Body"
				className="border-b w-full"
			/>

			<button className="sr-only" type="submit"></button>
		</form>
	);
};

export default NewTaskSample;
