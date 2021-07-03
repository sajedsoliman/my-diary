import { useRef, useState } from "react";

// UI
import { IconButton, ClickAwayListener } from "@material-ui/core";

// Icons
import {
	Bookmark,
	BookmarkBorder,
	DeleteForever,
	DoneOutline,
	MoreVert,
	Undo,
} from "@material-ui/icons";

// contexts
import { useToggleArchive, useArchivedTasks } from "contexts/ArchivedTasksContext";

// Hooks
import useLocalStorage from "hooks/useLocalStorage";

// components
import CustomMenuList from "../../common-components/ui/CustomMenuList";

// types
import { MainTaskProps } from "typescripts/commonTypes";
type Props = {
	handleToggleTask: () => void;
	completed: boolean;
	handleDelete: () => void;
	listType: "main_tasks" | "throughDay_tasks";
	task?: MainTaskProps;
};

const TaskControls = ({ handleToggleTask, completed, handleDelete, listType, task }: Props) => {
	const archivedTasks = useArchivedTasks();
	const handleArchive = useToggleArchive();

	// Refs
	const popperTogglerRef = useRef(null);

	// Stats vars
	const [controlsOpen, setOpen] = useState(false);

	// handle toggle the controls popper
	const togglePopper = () => {
		setOpen((isOpen) => !isOpen);
	};

	// is task archived check
	const isArchived =
		archivedTasks?.findIndex((savedTask: any) => savedTask.title === task?.title) != -1;

	return (
		<div>
			<IconButton size="small" onClick={togglePopper} ref={popperTogglerRef}>
				<MoreVert color={listType === "main_tasks" ? "primary" : "secondary"} />
			</IconButton>

			<CustomMenuList open={controlsOpen} placement="left" anchorEl={popperTogglerRef.current}>
				<ClickAwayListener onClickAway={togglePopper}>
					<div className="flex flex-col space-y-2 p-2">
						{/* toggle task */}
						<IconButton onClick={handleToggleTask} size="small" color="primary">
							{completed ? <Undo /> : <DoneOutline />}
						</IconButton>

						{/* Delete task */}
						<IconButton onClick={handleDelete} color="secondary" size="small">
							<DeleteForever />
						</IconButton>

						{/* archive task */}
						<IconButton
							onClick={() => {
								if (handleArchive != undefined && task !== undefined)
									handleArchive(isArchived, task);
							}}
							color="primary"
							size="small"
						>
							{isArchived ? <Bookmark /> : <BookmarkBorder />}
						</IconButton>
					</div>
				</ClickAwayListener>
			</CustomMenuList>
		</div>
	);
};

export default TaskControls;
