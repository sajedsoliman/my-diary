type MainTaskProps = {
	title: string;
	body: string;
	id: string;
	completed: boolean;
	completionNote: string;
};

type MainTaskInfoProps = {
	title: string;
	body: string;
};

type ThroughDayTaskProps = {
	body: string;
	completed: boolean;
	id: string;
	completionNote: string;
};

type DBDiaryProps = {
	id: string;
	created_date: string;
	main_tasks: MainTaskProps[];
	progress: string;
	throughDay_tasks: ThroughDayTaskProps[];
};

type DiaryProps = {
	created_date: string;
	main_tasks: MainTaskProps[];
	progress: string;
	throughDay_tasks: ThroughDayTaskProps[];
	completed_tasks: MainTaskProps[] | undefined;
	incompleted_tasks: MainTaskProps[] | undefined;
	id: string;
};

type AuthUserProps = {
	fullName: string;
	email: string;
	id: string;
	avatar: string | null;
};

type RegisterUserProps = {
	fullName: string;
	email: string;
	avatar: File | string | null;
	password: string;
};

type ArchivedTaskProps = {
	title: string;
};

export type {
	DBDiaryProps,
	DiaryProps,
	MainTaskProps,
	MainTaskInfoProps,
	ThroughDayTaskProps,
	RegisterUserProps,
	AuthUserProps,
	ArchivedTaskProps,
};
