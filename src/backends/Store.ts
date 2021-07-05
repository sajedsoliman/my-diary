import { useState, SetStateAction, Dispatch } from "react";

// Router
import { useHistory } from "react-router-dom";

// firebase
import { db, firebase, auth, storage } from "./database";

// contexts
import { AuthUser } from "contexts/UserContext";
import { useDiary } from "./../contexts/DiaryContext";

// types
import {
	ThroughDayTaskProps,
	MainTaskProps,
	RegisterUserProps,
	AuthUserProps,
	DiaryProps,
} from "typescripts/commonTypes";

const Store = () => {
	const loggedUser = AuthUser();
	const diary: any = useDiary();

	const diariesRef =
		loggedUser !== "no user"
			? db.collection("users").doc(loggedUser.id).collection("user-diaries")
			: db.collection("diaries");

	// State vars
	const [loading, setLoading] = useState(false);

	// Router
	const history = useHistory();

	const getDiary: (diaryDay: Date, setDiary: Dispatch<SetStateAction<DiaryProps | null>>) => void =
		(diaryDay, setDiary) => {
			// Check if it really existed

			return diariesRef
				.where("created_date", "==", diaryDay.toISOString().split("T")[0])
				.onSnapshot((snapshot) => {
					const isExisted: boolean = !snapshot.empty;

					if (isExisted) {
						const data = snapshot.docs[0].data() as {
							created_date: string;
							main_tasks: MainTaskProps[];
							throughDay_tasks: ThroughDayTaskProps[];
						};

						const completed_tasks: MainTaskProps[] = data.main_tasks.filter(
							(task: MainTaskProps) => task.completed
						);
						const incompleted_tasks: MainTaskProps[] = data.main_tasks.filter(
							(task: MainTaskProps) => !task.completed
						);
						const percentage = ((completed_tasks.length / data.main_tasks.length) * 100).toFixed();
						const progress = `${percentage}%`;
						const diaryData = {
							...snapshot.docs[0].data(),
							completed_tasks,
							incompleted_tasks,
							id: snapshot.docs[0].id,
							progress,
						} as DiaryProps;

						setDiary(diaryData);
					} else {
						// New Diary Info
						const diaryData: any = {
							created_date: diaryDay.toISOString().split("T")[0],
							main_tasks: [],
							throughDay_tasks: [],
							completed_tasks: [],
							incompleted_tasks: [],
						};

						// Add it to the db
						diariesRef.add(diaryData).then((diaryDoc) => {
							const id = diaryDoc.id;
							setDiary({ ...diaryData, id });
						});
					}
				});
		};

	// handle add a task
	const addTask = (
		taskInfo: { title: string; body: string } | { body: string },
		listType: "main_tasks" | "throughDay_tasks"
	) => {
		const newTask: MainTaskProps | ThroughDayTaskProps = {
			...taskInfo,
			completed: false,
			id: (new Date().getTime() * Math.random()).toString(),
		};

		diariesRef.doc(diary.id).update({
			[listType]: firebase.firestore.FieldValue.arrayUnion(newTask),
		});

		return newTask.id;
	};

	const handleUpdateTask = (
		taskList: MainTaskProps[] | ThroughDayTaskProps[],
		listType: "main_tasks" | "throughDay_tasks",
		newData: object,
		taskId: string
	) => {
		diariesRef.doc(diary.id).update({
			[listType]: taskList.map((task) => {
				if (task.id === taskId) {
					return { ...task, ...newData };
				} else return task;
			}),
		});
	};

	const handleDeleteTask = (
		listType: "main_tasks" | "throughDay_tasks",
		task: MainTaskProps | ThroughDayTaskProps
	) => {
		diariesRef.doc(diary.id).update({
			[listType]: firebase.firestore.FieldValue.arrayRemove(task),
		});
	};

	// update a taskList as whole (when dragEnd and other uses)
	const handleUpdateTaskList = (
		taskListType: "main_tasks" | "throughDay_tasks",
		newTaskList: MainTaskProps[] | ThroughDayTaskProps[],
		diaryId: string
	) => {
		// getting the diaryId from props because of the diary context
		// since it lives in the same file we call this function (Diary.tsx) so it will be null
		if (loggedUser !== "no user")
			diariesRef.doc(diaryId).update({
				[taskListType]: newTaskList,
			});
	};

	// handle add the user to db
	const addUserToDb = (userInfo: AuthUserProps) => {
		db.collection("users").doc(userInfo.id).set(userInfo);
	};

	// handle upload a user avatar
	const handleUploadUserAvatar: (avatar: File) => Promise<string> = async (avatar) => {
		// 1. upload the avatar
		await storage.ref(`users-avatar/${avatar.name}`).put(avatar);

		// return the download url
		return storage
			.ref("users-avatar")
			.child(avatar.name)
			.getDownloadURL()
			.then((url) => url);
	};

	// Handle register a user
	const handleRegisterUser: (userInfo: RegisterUserProps) => void = async (userInfo) => {
		// destructuring the user
		let { avatar, fullName, email, password } = userInfo;

		// set loading
		setLoading(true);

		// Auth the user
		const newUser = auth.createUserWithEmailAndPassword(email, password);

		// Check for the avatar
		if (avatar != null || avatar != undefined) {
			// handle upload the avatar

			avatar = await handleUploadUserAvatar(avatar as File);
		}

		// Update the user's fullName and avatar
		newUser.then((authUser) => {
			const dbUser = {
				fullName,
				email,
				avatar: avatar,
				id: authUser?.user?.uid,
			} as AuthUserProps;
			addUserToDb(dbUser);

			// Stop the loading progress
			setLoading(false);

			return authUser.user?.updateProfile({
				photoURL: avatar as string | null,
				displayName: fullName,
			});

			// history.replace("/");
		});
	};

	// Handle sign in a user
	const handleSignin = (email: string, password: string) => {
		// set loading

		auth
			.signInWithEmailAndPassword(email, password)
			.then((loggedUser) => {
				// Go to home - if there is from page => go to it
				history.replace("/");
			})
			.catch((error) => alert(error.message));
	};

	// handle sign out
	const handleSignOut = () => {
		auth.signOut().then(() => {
			// Go to login page
			history.replace("/login");
		});
	};

	return {
		getDiary,
		handleUpdateTask,
		handleUpdateTaskList,
		handleDeleteTask,
		addTask,
		loading,
		handleSignin,
		handleRegisterUser,
		handleSignOut,
	};
};

export default Store;
