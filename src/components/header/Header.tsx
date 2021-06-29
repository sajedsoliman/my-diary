// router
import { Link, Link as RouterLink } from "react-router-dom";

// UI
import { AppBar, Toolbar, Avatar, makeStyles, IconButton, Button } from "@material-ui/core";

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
	const btnProps = (
		color: "primary" | "secondary",
		icon: React.ComponentProps<"svg">,
		to: string,
		component = RouterLink
	) => ({
		color,
		component,
		startIcon: icon,
		to,
	});

	return (
		<AppBar position="relative" variant="outlined" color="transparent">
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
						<Button {...btnProps("primary", <LoginIcon className="h-6" />, "/login")}>
							<span className="text-gray-600">Login</span>
						</Button>
						<Button {...btnProps("primary", <UserAddIcon className="h-5" />, "/register")}>
							<span className="text-gray-600">Register</span>
						</Button>
					</div>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default Header;
