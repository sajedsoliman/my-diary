import { useEffect, useState } from "react";

// UI
import {
	Container,
	makeStyles,
	Grid,
	Collapse,
	IconButton,
	Divider,
	useTheme,
} from "@material-ui/core";

// icons
import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";

// backends
import Store from "../backends/Store";

// info
import { getProgressClr } from "helpers/functions";

// utils
import clsx from "clsx";

// contexts
import { AuthUser } from "contexts/UserContext";
import DiaryContextProvider from "../contexts/DiaryContext";
import { DragDropContext, DropResult, ResponderProvided } from "react-beautiful-dnd";

// hooks
import useWindowWidth from "hooks/useWindowWidth";

// components
import MainTaskList from "./main-tasks/MainTaskList";
import ThroughDayTaskList from "./throughDay-tasks/ThroughDayTaskList";
import FilterDiary from "./FilterDiary";

// types
import { DiaryProps, MainTaskProps, ThroughDayTaskProps } from "../typescripts/commonTypes";

// styles
const useStyles = makeStyles((theme) => ({
	container: {
		[theme.breakpoints.down("xs")]: {
			padding: 0,
		},
	},
}));

const Diary = () => {
	const loggedUser = AuthUser();
	const classes = useStyles();

	const [diary, setDiary] = useState<DiaryProps | null>(null);
	const [menuCollapse, setMenuCollapse] = useState<{ throughDay: boolean; main: boolean }>({
		throughDay: false,
		main: false,
	});
	const [diaryFilterDate, setDiaryDate] = useState(new Date());

	// import window width hook
	const { windowWidth } = useWindowWidth();

	// import Store components to get today's diary
	const { getDiary } = Store();

	useEffect(() => {
		// db.collection("users")
		// 	.doc("zSm1U1mN50VUuvLSELhJ2g1P3UJ2")
		// 	.collection("user-diaries")
		// 	.get()
		// 	.then((collection) => {
		// 		collection.docs.forEach((doc) => {
		// 			db.collection("users")
		// 				.doc(loggedUser != "no user" ? loggedUser.id : "")
		// 				.collection("user-diaries")
		// 				.add(doc.data());
		// 		});
		// 	});

		// fetch the current diary
		if (loggedUser === "no user") return;

		getDiary(diaryFilterDate, setDiary);
	}, [diaryFilterDate]);

	// handle change the filtering diary date
	const handleChangeDate = (e: any) => {
		setDiaryDate(e.target.value);
	};

	const darkMode = useTheme().palette.type === "dark";

	if (diary === null) return null;

	// handle toggle (collapse down) menus
	const toggleMenuCollapse = (menu: "throughDay" | "main") => {
		setMenuCollapse((prev) => ({
			...prev,
			[menu]: !prev[menu],
		}));
	};

	const mainTaskListLength = diary.main_tasks.length;

	const isSmallScreen = windowWidth <= 600;

	// menu header className
	const headerClassName = `text-center text-md flex items-center ${!isSmallScreen && "mb-2"} ${
		darkMode ? "text-white font-medium" : "font-semibold"
	} cursor-default`;

	// handle ending the task dragging (leave the mouse)
	const handleDragEng = (result: DropResult, provided: ResponderProvided) => {
		const { source, destination, draggableId: taskId } = result;

		if (destination === null || destination === undefined) return;

		// check if there is no movement happened (moved to the same position)
		const isSameDroppable = source.droppableId === destination.droppableId;
		const isSamePosition = source.index === destination.index;

		if (isSameDroppable && isSamePosition) return;

		const taskListType = result.source.droppableId as "main_tasks" | "throughDay_tasks";
		const taskIndex = result.source.index;
		const taskToGoIndex = destination.index;
		let newTaskList: (MainTaskProps | ThroughDayTaskProps)[] = diary[taskListType];
		const task = newTaskList[taskIndex];

		newTaskList.splice(taskIndex, 1);
		newTaskList.splice(taskToGoIndex, 0, task);

		// new list
		// [taskList[taskIndex], taskList[taskToGoIndex]] = [taskList[taskToGoIndex], taskList[taskIndex]];

		setDiary((prev) =>
			!!prev
				? {
						...prev,
						[taskListType]: newTaskList,
				  }
				: null
		);
	};

	const progressColor = getProgressClr(diary.progress);

	return (
		<DiaryContextProvider value={diary}>
			<Container className={classes.container}>
				{/* filter diaries - get the diary based on the day */}
				<FilterDiary diaryDate={diaryFilterDate} handleChangeDate={handleChangeDate} />

				{/* Menus */}
				<DragDropContext onDragEnd={handleDragEng}>
					<div>
						<Grid container spacing={1}>
							{/* Main task list section */}
							<Grid item xs={12} md={6}>
								<section className="p-2 border border-primaryLight">
									{/* Menu Header */}

									{/* Title */}
									<h5 className={headerClassName}>
										<span>Main Tasks</span>

										{/* Collapse toggler */}
										<div
											className={clsx("text-right", "cursor-pointer", "flex-1")}
											onClick={() => toggleMenuCollapse("main")}
										>
											<IconButton color="primary" size="small">
												{menuCollapse.main ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
											</IconButton>
										</div>
									</h5>

									{/* divider - just for large screens */}
									{!isSmallScreen && <Divider />}

									{/* Menu Body */}
									<Collapse in={menuCollapse.main}>
										<div className="mt-3">
											{/* Progress */}
											{mainTaskListLength != 0 && (
												<h6 className={clsx("text-right", progressColor)}>{diary.progress}</h6>
											)}

											{/* Main tasks */}
											<MainTaskList list={diary.main_tasks} />
										</div>
									</Collapse>
								</section>
							</Grid>

							{/* ThroughDay task list section */}
							<Grid item xs={12} md={6} /* style={{ paddingRight: 0, marginRight: 0 }} */>
								<section className="p-2 border border-red-300">
									{/* Title */}
									<h5 className={headerClassName}>
										<span>ThroughDay Tasks</span>

										{/* Collapse toggler */}
										<div
											className="flex-1 text-right cursor-pointer"
											onClick={() => toggleMenuCollapse("throughDay")}
										>
											<IconButton color="secondary" size="small">
												{menuCollapse.throughDay ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
											</IconButton>
										</div>
									</h5>

									{/* divider - just for large screens */}
									{!isSmallScreen && <Divider />}
									<Collapse in={menuCollapse.throughDay}>
										{/* List */}
										<ThroughDayTaskList list={diary.throughDay_tasks} />
									</Collapse>
								</section>
							</Grid>
						</Grid>
					</div>
				</DragDropContext>
			</Container>
		</DiaryContextProvider>
	);
};

export default Diary;