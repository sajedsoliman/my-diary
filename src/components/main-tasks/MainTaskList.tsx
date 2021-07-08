import { useState } from "react";

// UI
import { Button, Divider, useTheme } from "@material-ui/core";

// icons
import { Add } from "@material-ui/icons";

// utils
import clsx from "clsx";

// hooks

// contexts
import ArchivedTasksProvider from "contexts/ArchivedTasksContext";

// components
import MainTask from "./MainTask";
import NewTaskSample from "./NewTaskSample";
import { Droppable } from "react-beautiful-dnd";

// types
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
			<ArchivedTasksProvider>
				<Droppable droppableId="main_tasks">
					{({ innerRef, droppableProps, placeholder }, { isDraggingOver }) => {
						return (
							<ul
								ref={innerRef}
								{...droppableProps}
								className={clsx(
									"mb-2 p-1 transition-all rounded-sm",
									isDraggingOver && "border border-primary"
								)}
							>
								{mappedTasks.length === 0 ? (
									<h3 className={clsx(darkMode && "text-white")}>No Tasks</h3>
								) : (
									mappedTasks
								)}

								{/* the placeholder */}
								{placeholder}

								{/* new task sample form */}
								{sampleOpen && (
									<>
										{/* divider */}
										<div className="my-2">
											<Divider />
										</div>

										{/* sample */}
										<NewTaskSample
											taskList={list}
											toggleSample={() => setSampleOpen(false)}
											sampleClosed={isSampleClosed}
										/>
									</>
								)}
							</ul>
						);
					}}
				</Droppable>
			</ArchivedTasksProvider>

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
