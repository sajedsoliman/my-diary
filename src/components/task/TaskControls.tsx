import { useRef, useState } from "react";

// UI
import { IconButton, ClickAwayListener, Tooltip } from "@material-ui/core";
import PopUp from "common-components/ui/PopUp";

// Icons
import {
	Bookmark,
	BookmarkBorder,
	DeleteForever,
	DoneOutline,
	MoreVert,
	NoteOutlined,
	Undo,
} from "@material-ui/icons";

// contexts
import { useToggleArchive, useArchivedTasks } from "contexts/ArchivedTasksContext";

// Hooks

// components
import CustomMenuList from "../../common-components/ui/CustomMenuList";
import TaskCompletionNote from "./TaskCompletionNote";
import Store from "backends/Store";

// types
import { MainTaskProps, ThroughDayTaskProps } from "typescripts/commonTypes";
type Props = {
	handleToggleTask: () => void;
	handleDelete: () => void;
	listType: "main_tasks" | "throughDay_tasks";
	task: MainTaskProps | ThroughDayTaskProps;
	taskList: (MainTaskProps | ThroughDayTaskProps)[];
};

const TaskControls = ({ handleToggleTask, handleDelete, listType, task, taskList }: Props) => {
	const archivedTasks = useArchivedTasks();
	const handleArchive = useToggleArchive();

	// Refs
	const popperTogglerRef = useRef(null);

	// Stats vars
	const [controlsOpen, setOpen] = useState(false);
	const [completionNoteDialogOpen, setNoteDialogOpen] = useState(false);
	const [showNote, setShowNote] = useState(false);

	// Import Store component to update the task
	const { handleUpdateTask } = Store();

	// handle toggle the controls popper
	const togglePopper = () => {
		setOpen((isOpen) => !isOpen);
	};

	// handle click complete
	const handleClickComplete = () => {
		if (!task.completed) {
			toggleNotePopup();
		}

		handleToggleTask();
	};

	// is task archived check
	const isArchived =
		archivedTasks?.findIndex(
			(savedTask: any) => savedTask.title === (task as MainTaskProps).title
		) != -1;

	// is the task a main one?
	const isMain = listType === "main_tasks";
	// is task completed?
	const completed = task.completed;

	// handle toggle the completion note dialog(PopUp)
	const toggleNotePopup = () => {
		setNoteDialogOpen((prev) => !prev);
	};

	// the completion note dialog(PopUp) props
	const popupProps = {
		infoFunc: {
			isOpen: completionNoteDialogOpen,
			title: `Add a note for this task`,
		},
		closeHandle: toggleNotePopup,
		maxWidth: "md",
		// contentStyles: classes.
	};

	// handle toggle(compete/incomplete) task
	const addTaskNote = (note: string) => {
		// update the task's note
		handleUpdateTask(taskList, listType, { completionNote: note }, task.id);

		// close the popup
		toggleNotePopup();
	};

	// handle toggle completion note's tooltip
	const toggleCompletionNote = () => {
		setShowNote((isOpen) => !isOpen);
	};

	// handle click out of the popover
	const handleClickAway = () => {
		setOpen(false);

		setShowNote(false);
	};

	return (
		<div>
			<IconButton size="small" onClick={togglePopper} ref={popperTogglerRef}>
				<MoreVert color={listType === "main_tasks" ? "primary" : "secondary"} />
			</IconButton>

			<CustomMenuList open={controlsOpen} placement="left" anchorEl={popperTogglerRef.current}>
				<ClickAwayListener onClickAway={handleClickAway}>
					<div className="grid grid-cols-2 grid-rows-2 gap-1 p-2">
						{/* toggle task */}
						<IconButton onClick={handleClickComplete} size="small" color="primary">
							{completed ? <Undo /> : <DoneOutline />}
						</IconButton>

						{/* Delete task */}
						<IconButton onClick={handleDelete} color="secondary" size="small">
							<DeleteForever />
						</IconButton>

						{/* archive task - just for main tasks */}
						{isMain && (
							<IconButton
								onClick={() => {
									if (handleArchive != undefined && task !== undefined)
										handleArchive(isArchived, task as MainTaskProps);
								}}
								color="primary"
								size="small"
							>
								{isArchived ? <Bookmark /> : <BookmarkBorder />}
							</IconButton>
						)}

						<Tooltip
							title={task.completionNote}
							disableHoverListener
							disableTouchListener
							interactive
							open={showNote}
							onClose={toggleCompletionNote}
						>
							<IconButton
								className="col-start-2"
								color="primary"
								size="small"
								onClick={toggleCompletionNote}
							>
								<NoteOutlined />
							</IconButton>
						</Tooltip>
					</div>
				</ClickAwayListener>
			</CustomMenuList>

			{/* Add a note about the task on completion (dialog) */}
			<PopUp {...popupProps}>
				{/* Add a note (textarea) */}
				<TaskCompletionNote
					currentNote={task.completionNote}
					handleSubmit={addTaskNote}
					handleCloseDialog={toggleNotePopup}
				/>
			</PopUp>

			{/* Show completion note on a popup */}
		</div>
	);
};

export default TaskControls;
