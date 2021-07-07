// utils
import clsx from "clsx";

// hooks
import { makeStyles, Tooltip, useTheme } from "@material-ui/core";
import useWindowWidth from "../../hooks/useWindowWidth";

type Props = {
	handleClickToOpenEditView: (toFocusInput: string) => void;
	completed: boolean;
	taskInfo: { title: string; body: string; completionNote: string };
};

// styles
const useStyles = makeStyles((theme) => ({
	tooltip: {
		fontSize: 14,
	},
}));

const InfoView = ({ completed, taskInfo, handleClickToOpenEditView }: Props) => {
	const classes = useStyles();
	const { windowWidth } = useWindowWidth();
	const atSmallScreen = windowWidth <= 600;

	const darkMode = useTheme().palette.type === "dark";

	const styles = clsx(
		"flex space-x-4 items-center flex-1 cursor-pointer font-medium",
		completed && "line-through"
	);

	if (completed)
		return (
			<Tooltip
				classes={{ tooltip: classes.tooltip }}
				placement="bottom"
				title={taskInfo.completionNote}
			>
				<div className={clsx(styles)}>
					<h5 className="" onClick={() => handleClickToOpenEditView("title")}>
						{taskInfo.title}
					</h5>
					<p
						className={`text-blue-500 flex-1 ${atSmallScreen && "text-sm"}`}
						onClick={() => handleClickToOpenEditView("body")}
					>
						{taskInfo.body}
					</p>
				</div>
			</Tooltip>
		);

	return (
		<div className={"flex space-x-4 items-center flex-1 cursor-pointer font-medium"}>
			<h5 className="" onClick={() => handleClickToOpenEditView("title")}>
				{taskInfo.title}
			</h5>
			<p
				className={`text-blue-500 flex-1 ${atSmallScreen && "text-sm"}`}
				onClick={() => handleClickToOpenEditView("body")}
			>
				{taskInfo.body}
			</p>
		</div>
	);
};

export default InfoView;
