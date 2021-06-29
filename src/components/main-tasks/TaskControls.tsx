import React, { useRef, useState } from "react";

// UI
import { IconButton, ClickAwayListener } from "@material-ui/core";

// Icons
import { DeleteForever, DoneOutline, MoreVert, Undo } from "@material-ui/icons";

// components
import CustomMenuList from "../../common-components/ui/CustomMenuList";

// Types
type Props = {
	handleToggleTask: () => void;
	completed: boolean;
	handleDelete: () => void;
};
const TaskControls = ({ handleToggleTask, completed, handleDelete }: Props) => {
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
				<MoreVert />
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
