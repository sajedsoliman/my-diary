import { useRef, useState } from "react";

// UI
import { IconButton, ClickAwayListener } from "@material-ui/core";

// Icons
import { DeleteForever, DoneOutline, MoreVert, Undo } from "@material-ui/icons";

// components
import CustomMenuList from "../../common-components/ui/CustomMenuList";

// types
type Props = {
	handleToggleTask: () => void;
	completed: boolean;
	handleDelete: () => void;
	listType: "main_tasks" | "throughDay_tasks";
};

const TaskControls = ({ handleToggleTask, completed, handleDelete, listType }: Props) => {
	// Refs
	const popperTogglerRef = useRef(null);

	const [controlsOpen, setOpen] = useState(false);

	// handle toggle the controls popper
	const togglePopper = () => {
		setOpen((isOpen) => !isOpen);
	};

	return (
		<div>
			<IconButton size="small" onClick={togglePopper} ref={popperTogglerRef}>
				<MoreVert color={listType === "main_tasks" ? "primary" : "secondary"} />
			</IconButton>

			<CustomMenuList open={controlsOpen} placement="left" anchorEl={popperTogglerRef.current}>
				<ClickAwayListener onClickAway={togglePopper}>
					<div className="flex flex-col space-y-2 p-2">
						<IconButton onClick={handleToggleTask} size="small" color="primary">
							{completed ? <Undo /> : <DoneOutline />}
						</IconButton>

						{/* Delete task */}
						<IconButton onClick={handleDelete} color="secondary" size="small">
							<DeleteForever />
						</IconButton>
					</div>
				</ClickAwayListener>
			</CustomMenuList>
		</div>
	);
};

export default TaskControls;
