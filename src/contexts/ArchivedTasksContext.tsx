import { useContext, createContext } from "react";

// types
import { MainTaskProps } from "typescripts/commonTypes";

// hooks
import useLocalStorage from "../hooks/useLocalStorage";

const ArchivedTaskListContext = createContext([]);
const ToggleArchivedContext = createContext<null | Function>(null);

export const useArchivedTasks = () => {
	return useContext(ArchivedTaskListContext);
};

export const useToggleArchive = () => {
	return useContext(ToggleArchivedContext);
};

const ArchivedTasksProvider = ({ children }: { children: any }) => {
	// get the list from the localStorage
	const [archivedTasks, setArchivedTasks] = useLocalStorage("archived-tasks", []);

	// handle save/archive the task for next days
	const handleArchive = (isArchived: boolean, task: MainTaskProps) => {
		if (isArchived) {
			return setArchivedTasks(
				archivedTasks.filter((savedTask: any) => savedTask.title !== task.title)
			);
		}

		setArchivedTasks([...archivedTasks, { title: task?.title, body: task.body }]);
	};

	return (
		<ArchivedTaskListContext.Provider value={archivedTasks}>
			<ToggleArchivedContext.Provider value={handleArchive}>
				{children}
			</ToggleArchivedContext.Provider>
		</ArchivedTaskListContext.Provider>
	);
};

export default ArchivedTasksProvider;
