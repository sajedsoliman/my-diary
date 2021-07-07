import React, { useState } from "react";

// UI
import Controls from "common-components/controls/Controls";

// components
import { Form } from "hooks/useForm";
import { Button } from "@material-ui/core";

// types
type Props = {
	handleCloseDialog: () => void;
	handleSubmit: (note: string) => void;
	currentNote: string;
};

const TaskCompletionNote = ({ handleCloseDialog, handleSubmit, currentNote }: Props) => {
	const [note, setNote] = useState(currentNote);

	const changeNote = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNote(e.target.value);
	};

	const onSubmit = () => {
		handleSubmit(note);
	};

	return (
		<Form onSubmit={onSubmit}>
			{/* note input */}
			<Controls.TextArea
				validationError=""
				name=""
				rows={4}
				label="Add your note"
				value={note}
				inputChange={changeNote}
				color="secondary"
			/>

			{/* action => submit, (no thanks => same as you close it. You don't wanna add a note) */}
			<div className="flex space-x-2 mt-2">
				<Button variant="outlined" color="primary" type="submit">
					Add
				</Button>
				<Button variant="outlined" color="secondary" onClick={handleCloseDialog}>
					No Thanks
				</Button>
			</div>
		</Form>
	);
};

export default TaskCompletionNote;
