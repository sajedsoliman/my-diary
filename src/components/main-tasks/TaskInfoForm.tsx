import React, { useCallback, useEffect } from "react";

// UI
import { Divider, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

// contexts
import { useArchivedTasks } from "contexts/ArchivedTasksContext";

// type
import { MainTaskInfoProps } from "../../typescripts/commonTypes";

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

	const archivedTasks = useArchivedTasks();

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

	// are we inside the sample condition
	const isSample = !bodyInputRef && !titleInputRef;

	return (
		<form
			onBlur={handleBlur}
			onSubmit={onSubmit}
			className="flex w-full space-x-2 items-center overflow-y-hidden overflow-x-auto"
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
							// move the focus the body input
							if (!!bodyInputRef) bodyInputRef.current?.focus();
						} else {
							// blank title
							handleInfoChange(e, "", "title");
						}
					}}
					renderInput={(params) => {
						return (
							<TextField
								inputRef={titleInputRef}
								placeholder="Title"
								variant="standard"
								// If it's the sample
								autoFocus={isSample}
								{...params}
							/>
						);
					}}
				/>
			</div>

			{/* divider */}
			<Divider orientation="vertical" flexItem light />

			{/* body field */}
			<div className="flex-1">
				<TextField
					inputRef={bodyInputRef}
					placeholder="Body"
					variant="standard"
					value={body}
					fullWidth
					onChange={(e) => handleInfoChange(e, e.target.value, "body")}
					inputProps={{ style: { padding: "3px 0 6px" } }}
				/>
			</div>

			{/* hidden submit button */}
			<button type="submit" className="sr-only"></button>
		</form>
	);
};

export default TaskForm;
