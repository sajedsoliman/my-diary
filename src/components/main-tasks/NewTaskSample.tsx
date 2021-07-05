import React, { useState, useEffect, useRef } from "react";

// components
import TaskForm from "./TaskInfoForm";
import Store from "./../../backends/Store";

// types
type Props = {
	toggleSample: () => void;
	sampleClosed: boolean;
};

const NewTaskSample = ({ toggleSample, sampleClosed }: Props) => {
	const bodyInputRef = useRef<HTMLInputElement | null>(null);

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

	// handle info inputs change
	const handleChangeInputs = (e: any, newValue: string | null, changedInput: "title" | "body") => {
		// console.log(newValue);
		setSampleInfo((prev) => ({ ...prev, [changedInput]: newValue }));
	};

	useEffect(() => {
		if (sampleClosed) handleAddingTask();
	}, [sampleClosed]);

	return (
		<div className="py-2">
			<TaskForm
				handleBlur={handleBlur}
				handleSubmit={handleSubmit}
				handleInfoChange={handleChangeInputs}
				bodyInputRef={bodyInputRef}
				taskInfo={sampleInfo}
			/>
		</div>
	);
};

export default NewTaskSample;
