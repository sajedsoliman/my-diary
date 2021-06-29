import { MainTaskInfoProps } from "../../typescripts/commonTypes";
import React, { useCallback, useEffect } from "react";

type Props = {
	taskInfo: MainTaskInfoProps;
	titleInputRef?: React.RefObject<HTMLInputElement>;
	bodyInputRef?: React.RefObject<HTMLInputElement>;
	handleSubmit: () => void;
	handleBlur: React.FocusEventHandler<HTMLFormElement>;
	handleInfoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const TaskForm = ({
	taskInfo,
	titleInputRef,
	bodyInputRef,
	handleSubmit,
	handleBlur,
	handleInfoChange,
}: Props) => {
	const { body, title } = taskInfo;

	// handle submit
	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		handleSubmit();
	};

	// set a listener to listen for keyboard (esc key) pressing to close the edit form
	const handleKeyPress = useCallback(
		(e: KeyboardEvent): void => {
			const isEscape = e.key === "Escape";

			// if escape is pressed then handle update it or delete(if title is blank)
			if (isEscape) handleSubmit();
		},
		[handleSubmit]
	);

	useEffect(() => {
		window.addEventListener("keydown", handleKeyPress);

		return () => {
			window.removeEventListener("keydown", handleKeyPress);
		};
	}, [taskInfo]);

	return (
		<form onBlur={handleBlur} onSubmit={onSubmit} className="flex space-x-2 overflow-x-auto">
			<input
				ref={titleInputRef}
				className="border border-gray-400 rounded-md p-1"
				value={title}
				name="title"
				onChange={handleInfoChange}
				placeholder="Title"
				autoFocus={titleInputRef === undefined && bodyInputRef == undefined}
			/>
			<input
				ref={bodyInputRef}
				className="border border-gray-400 rounded-md p-1"
				value={body}
				name="body"
				onChange={handleInfoChange}
				placeholder="Body"
			/>

			<button type="submit" className="sr-only"></button>
		</form>
	);
};

export default TaskForm;
