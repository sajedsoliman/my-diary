// utils
import clsx from "clsx";

// hooks
import { useTheme } from "@material-ui/core";
import useWindowWidth from "../../hooks/useWindowWidth";

type Props = {
	handleClickToOpenEditView: (toFocusInput: string) => void;
	completed: boolean;
	taskInfo: { title: string; body: string };
};

const InfoView = ({ completed, taskInfo, handleClickToOpenEditView }: Props) => {
	const { windowWidth } = useWindowWidth();
	const atSmallScreen = windowWidth <= 600;

	const darkMode = useTheme().palette.type === "dark";

	/* 
{
				"flex space-x-4 items-center cursor-pointer font-medium": true,
				"line-through": completed,
				"text-white": darkMode,
			}
*/

	const styles = clsx(
		"flex space-x-4 items-center cursor-pointer font-medium",
		completed && "line-through",
		darkMode && "text-white"
	);

	return (
		<div
			className={styles}
			/* className={`flex space-x-4 items-center cursor-pointer font-medium ${
				completed && "line-through"
			} ${darkMode && "text-white"}`} */
		>
			<h5 className="" onClick={() => handleClickToOpenEditView("title")}>
				{taskInfo.title}
			</h5>
			<p
				className={`text-blue-500 ${atSmallScreen && "text-sm"}`}
				onClick={() => handleClickToOpenEditView("body")}
			>
				{taskInfo.body}
			</p>
		</div>
	);
};

export default InfoView;
