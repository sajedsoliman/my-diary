import { useEffect, useRef, useState } from "react";

// Contexts
import { useDiary } from "./../../contexts/DiaryContext";

// Components
import Store from "../../backends/Store";
import TaskInfoForm from "./TaskInfoForm";
import InfoView from "./InfoView";
import { Draggable } from "react-beautiful-dnd";

// Types
import { MainTaskProps } from "../../typescripts/commonTypes";
import TaskControls from "./TaskControls";
type Props = {
	task: MainTaskProps;
	taskList: MainTaskProps[];
	index: number;
};

const MainTask = ({ task, taskList, index }: Props) => {
	const diary: any = useDiary();

	// Refs
	const titleInputRef = useRef<HTMLInputElement>(null);
	const bodyInputRef = useRef<HTMLInputElement>(null);

	const [editView, setEditView] = useState(false);
	const [taskInfo, setTaskInfo] = useState({ title: task.title, body: task.body });
	const [focusedInput, setFocusedInput] = useState("");

	const { title, body } = taskInfo;

	// Import Store component to update, delete the task
	const { handleUpdateTask, handleDeleteTask } = Store();

	const updateTaskInfo = () => {
		const newData = {
			title,
			body,
		};

		if (title !== "") handleUpdateTask(taskList, "main_tasks", newData, task.id);
		else handleDeleteTask("main_tasks", task);
	};

	const toggleEditView = () => {
		if (editView) setFocusedInput("");

		setEditView((prev) => !prev);
	};

	// handle toggle task (complete/incomplete)
	const handleToggleTask = () => {
		handleUpdateTask(taskList, "main_tasks", { completed: !task.completed }, task.id);
	};

	// handle form blurring
	const handleBlur = (e: React.FocusEvent<HTMLFormElement>) => {
		// If you blurred to another input (adjacent inputs)
		// e.relatedTarget === null => your blurred out of the form
		// e.relatedTarget === some input => your blurred within the form's inputs
		if (e.relatedTarget === null) {
			// Change the view to show details
			toggleEditView();

			updateTaskInfo();
		}
	};

	// handle form submitting
	const handleSubmitForm = () => {
		toggleEditView();

		updateTaskInfo();
	};

	// Set a listener to decide which task info's input that have to focus based on where you did click (on title or body)
	// and I use listener cuz we I an input is clicked the form will not be rendered so the ref
	// will be null so the input won't be focused
	useEffect(() => {
		switch (focusedInput) {
			case "title":
				titleInputRef.current?.focus();
				break;
			case "body":
				bodyInputRef.current?.focus();
				break;
		}
	}, [focusedInput, titleInputRef, bodyInputRef]);

	// handle info inputs change
	const handleTaskInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTaskInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	// handle click on the title or body to toggle the edit view
	const handleClickToOpenEditView = (toFocusInput: string) => {
		if (task.completed) return;

		toggleEditView();

		setFocusedInput(toFocusInput);
	};

	// handle delete task
	const handleDelete = () => {
		handleDeleteTask("main_tasks", task);
	};

	return (
		<Draggable draggableId={task.id} index={index}>
			{(provided) => {
				return (
					<li
						//@ts-ignore
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						className="flex space-x-3 my-1 items-center justify-between p-2 border overflow-x-auto"
					>
						{editView ? (
							// Form
							<TaskInfoForm
								taskInfo={taskInfo}
								handleBlur={handleBlur}
								handleSubmit={handleSubmitForm}
								handleInfoChange={handleTaskInfoChange}
								titleInputRef={titleInputRef}
								bodyInputRef={bodyInputRef}
							/>
						) : (
							<InfoView
								taskInfo={taskInfo}
								completed={task.completed}
								handleClickToOpenEditView={handleClickToOpenEditView}
							/>
						)}

						{/* complete toggler */}
						{!editView && (
							<TaskControls
								completed={task.completed}
								handleDelete={handleDelete}
								handleToggleTask={handleToggleTask}
							/>
						)}
					</li>
				);
			}}
		</Draggable>
	);
};

export default MainTask;

// Refactoring and styling this
