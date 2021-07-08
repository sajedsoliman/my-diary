// UI
import { makeStyles, Tooltip } from "@material-ui/core";

// utils
import clsx from "clsx";

// hooks
import useWindowWidth from "hooks/useWindowWidth";

// types
import { ThroughDayTaskProps } from "typescripts/commonTypes";
type Props = {
	task: ThroughDayTaskProps;
	toggleEditView: () => void;
};

// styles
const useStyles = makeStyles((theme) => ({
	tooltip: {
		fontSize: 14,
	},
}));

const InfoView = ({ task, toggleEditView }: Props) => {
	const classes = useStyles();

	// get the window width
	const { windowWidth } = useWindowWidth();

	const atSmallScreen = windowWidth <= 600;

	if (task.completed)
		return atSmallScreen ? (
			<h6 onClick={toggleEditView} className={clsx(`flex-1 cursor-pointer text-sm line-through`)}>
				{task.body}
			</h6>
		) : (
			<Tooltip classes={{ tooltip: classes.tooltip }} placement="left" title={task.completionNote}>
				<h6
					onClick={toggleEditView}
					className={`${task.completed && "line-through"} flex-1 cursor-pointer text-sm`}
				>
					{task.body}
				</h6>
			</Tooltip>
		);

	return (
		<h6 onClick={toggleEditView} className={`flex-1 cursor-pointer text-sm`}>
			{task.body}
		</h6>
	);
};

export default InfoView;
