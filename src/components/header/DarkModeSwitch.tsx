// Material-UI imports
import { makeStyles, Switch, useTheme } from "@material-ui/core";
// Icons
import { NightsStay, WbSunny } from "@material-ui/icons";

// Contexts

// Hooks

// Components

// styles
const useStyles = makeStyles((theme) => ({
	darkModeSwitchWrapper: {
		position: "relative",
	},
	switch: {
		height: 42,
	},
	switchCircle: {
		top: 2,
	},
	sunIcon: {
		fill: "rgb(255 252 0)",
		position: "absolute",
		right: 14,
		top: 15,
		fontSize: "0.8rem",
	},
	moonIcon: {
		fill: "rgb(0, 0, 0)",
		position: "absolute",
		left: 14,
		top: 14,
		fontSize: "0.8rem",
	},
}));

export default function DarkModeSwitch({
	toggleDarkMode,
}: {
	toggleDarkMode: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
	const classes = useStyles();

	const darkMode = useTheme().palette.type === "dark";

	return (
		<div className={classes.darkModeSwitchWrapper}>
			<Switch
				classes={{ switchBase: classes.switchCircle, root: classes.switch }}
				checked={darkMode}
				onChange={toggleDarkMode}
				color="primary"
			/>
			{darkMode ? (
				<NightsStay className={classes.moonIcon} />
			) : (
				<WbSunny className={classes.sunIcon} />
			)}
		</div>
	);
}
