import React, { useCallback, useEffect } from "react";

// UI
import { Divider, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

// contexts
import { useArchivedTasks } from "contexts/ArchivedTasksContext";

// type
import { ArchivedTaskProps, MainTaskInfoProps } from "../../typescripts/commonTypes";

type Props = {
	taskInfo: MainTaskInfoProps;
	titleInputRef?: React.RefObject<HTMLInputElement>;
	bodyInputRef?: React.RefObject<HTMLInputElement>;
	handleSubmit: () => void;
	handleBlur: React.FocusEventHandler<HTMLFormElement>;
	handleInfoChange: (e: any, newValue: string | null, changedInput: "title" | "body") => void;
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

	const archivedTasks = useArchivedTasks() as ArchivedTaskProps[];

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
		<form
			onBlur={handleBlur}
			onSubmit={onSubmit}
			className="flex w-full space-x-2 overflow-y-hidden overflow-x-auto"
		>
			{/* title field - with autocomplete from archived tasks */}
			<div className="flex-1">
				<Autocomplete
					options={archivedTasks}
					getOptionLabel={(option) => option.title}
					fullWidth
					freeSolo
					size="small"
					value={taskInfo}
					inputValue={title}
					onInputChange={(e, newValue) => {
						handleInfoChange(e, newValue, "title");
					}}
					onChange={(e, newValue) => {
						if (newValue !== null && typeof newValue !== "string") {
							handleInfoChange(e, newValue.title, "title");
							handleInfoChange(e, newValue.body, "body");
						}
					}}
					renderInput={(params) => {
						return (
							<TextField
								inputRef={titleInputRef}
								placeholder="Title"
								variant="standard"
								{...params}
							/>
						);
					}}
				/>
			</div>

			{/* divider */}
			<Divider orientation="vertical" flexItem light />

			{/* body field */}
			<input
				ref={bodyInputRef}
				className="border-b border-gray-400 flex-1"
				value={body}
				name="body"
				onChange={(e) => handleInfoChange(e, e.target.value, "body")}
				placeholder="Body"
			/>

			<button type="submit" className="sr-only"></button>
		</form>
	);
};

export default TaskForm;
