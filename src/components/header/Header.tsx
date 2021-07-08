import React from "react";

// router
import { Link as RouterLink } from "react-router-dom";

// UI
import {
	AppBar,
	Toolbar,
	Avatar,
	makeStyles,
	IconButton,
	Button,
	useTheme,
} from "@material-ui/core";

// icons
import { LoginIcon, LogoutIcon, UserAddIcon } from "@heroicons/react/outline";

// contexts
import { AuthUser } from "contexts/UserContext";

// components
import Store from "backends/Store";
import DarkModeSwitch from "components/header/DarkModeSwitch";

// types
type Props = {
	toggleDarkMode: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

// styles
const useStyles = makeStyles((theme) => ({
	userAvatar: { width: 32, height: 32 },
}));

const Header = ({ toggleDarkMode }: Props) => {
	const classes = useStyles();
	const loggedUser = AuthUser();

	// Import Store component to handle Logout
	const { handleSignOut } = Store();

	// Button props
	const btnProps = (color: string, icon: React.ComponentProps<"svg">, to: string) => ({
		color,
		startIcon: icon,
		to,
		component: RouterLink,
	});

	const darkMode = useTheme().palette.type === "dark";

	const headerStyles = {
		backgroundColor: darkMode ? "rgb(41 41 41)" : "white",
		color: darkMode ? "white" : "#222",
	};

	return (
		<AppBar position="relative" variant="outlined" style={headerStyles}>
			<Toolbar variant="dense">
				{/* logged user: avatar, full name. controls: logout */}
				{loggedUser !== "no user" ? (
					<div className="flex flex-1 items-center justify-between">
						{/* User name and avatar */}
						<div className="flex items-center">
							<Avatar
								className={classes.userAvatar}
								src={loggedUser.avatar ? loggedUser.avatar : undefined}
							>
								{loggedUser.fullName !== null ? loggedUser.fullName[0] : ""}
							</Avatar>
							<h3 className="font-semibold ml-2">{loggedUser.fullName}</h3>
						</div>

						<div className="flex items-center ">
							{/* dark mode switch */}
							<DarkModeSwitch toggleDarkMode={toggleDarkMode} />

							<IconButton color="secondary" onClick={handleSignOut}>
								<LogoutIcon className="h-6" />
							</IconButton>
						</div>
					</div>
				) : (
					/* unLogged user : nothing. controls: login, register */
					<div className="flex flex-1 items-center space-x-2">
						{/* @ts-ignore */}
						<Button {...btnProps("primary", <LoginIcon className="h-6" />, "/login")}>Login</Button>

						{/* @ts-ignore */}
						<Button {...btnProps("primary", <UserAddIcon className="h-5" />, "/register")}>
							<span /* className="text-gray-600" */>Register</span>
						</Button>
					</div>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default Header;
