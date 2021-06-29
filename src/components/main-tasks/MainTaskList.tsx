import { useState } from "react";

// UI
import { Button, useTheme } from "@material-ui/core";

// icons
import { Add } from "@material-ui/icons";

// Utils
import clsx from "clsx";

// Components
import MainTask from "./MainTask";
import NewTaskSample from "./NewTaskSample";
import { Droppable } from "react-beautiful-dnd";

// Types
import { MainTaskProps } from "../../typescripts/commonTypes";
type Props = {
	list: MainTaskProps[];
};

const MainTaskList = ({ list }: Props) => {
	const [isSampleClosed, setSampleClosed] = useState(false);
	const [sampleOpen, setSampleOpen] = useState(false);

	// handle add a new task
	const handleToggleTaskSample = () => {
		if (sampleOpen) {
			// because sample open is gonna be false so closed is gonna be true
			setSampleClosed(true);
		} else {
			setSampleOpen(true);

			// Reset the sample closed
			setSampleClosed(false);
		}
	};

	const mappedTasks = list.map((task, index) => (
		<MainTask key={task.id} index={index} task={task} taskList={list} />
	));

	const darkMode = useTheme().palette.type === "dark";

	return (
		<div>
			{/* Task list */}
			<Droppable droppableId="main_tasks">
				{(provided) => {
					return (
						// @ts-ignore
						<ul {...provided.droppableProps} ref={provided.innerRef} className="mb-2">
							{mappedTasks.length === 0 ? (
								<h3 className={clsx(darkMode && "text-white")}>No Tasks</h3>
							) : (
								mappedTasks
							)}

							{/* the placeholder */}
							{provided.placeholder}

							{/* new task sample form */}
							{sampleOpen && (
								<NewTaskSample
									toggleSample={() => setSampleOpen(false)}
									sampleClosed={isSampleClosed}
								/>
							)}
						</ul>
					);
				}}
			</Droppable>

			{/* Add task button */}
			<Button
				color="primary"
				onClick={handleToggleTaskSample}
				variant="outlined"
				size="small"
				startIcon={<Add />}
			>
				Add Main Task
			</Button>
		</div>
	);
};

export default MainTaskList;
