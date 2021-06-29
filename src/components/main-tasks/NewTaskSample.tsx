import React, { useState, useEffect } from "react";

// components
import TaskForm from "./TaskInfoForm";
import Store from "./../../backends/Store";

// types
type Props = {
	toggleSample: () => void;
	sampleClosed: boolean;
};

const NewTaskSample = ({ toggleSample, sampleClosed }: Props) => {
	const [sampleInfo, setSampleInfo] = useState<{ title: string; body: string }>({
		title: "",
		body: "",
	});
	const { title } = sampleInfo;

	// Import Store component to add a new task
	const { addTask } = Store();

	// handle add task
	const handleAddingTask = () => {
		if (title === "") return toggleSample();

		// Close the sample
		toggleSample();

		// if title isn't blank Add the task
		addTask(sampleInfo, "main_tasks");
	};

	// handle Submit
	const handleSubmit = () => {
		handleAddingTask();
	};

	// handle Blur
	const handleBlur = (e: React.FocusEvent<HTMLFormElement>) => {
		// Check if we still inside of the form
		const isInsideForm = e.relatedTarget !== null;

		if (!isInsideForm) {
			handleAddingTask();
		}
	};

	// handle Change inputs
	const handleChangeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSampleInfo((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	useEffect(() => {
		if (sampleClosed) handleAddingTask();
	}, [sampleClosed]);

	return (
		<div className="p-2 border">
			<TaskForm
				handleBlur={handleBlur}
				handleSubmit={handleSubmit}
				handleInfoChange={handleChangeInputs}
				taskInfo={sampleInfo}
			/>
		</div>
	);
};

export default NewTaskSample;
