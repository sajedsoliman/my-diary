import { useState, useEffect } from "react";
// router
import { Switch } from "react-router-dom";
import UnAuthRoute from "common-components/router/UnAuthRoute";
import AuthRoute from "common-components/router/AuthRoute";

// UI
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

// util
import clsx from "clsx";

// contexts
import { AuthUser } from "contexts/UserContext";

// components
import Diary from "./components/Diary";
import Header from "components/header/Header";

// pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import React from "react";

const getDarkModeInitialValue = (): boolean => {
	// get it from the localStorage
	const savedDarkMode = localStorage.getItem("dark-mode");

	if (savedDarkMode !== null) {
		const parsedValue: boolean = JSON.parse(savedDarkMode);

		return parsedValue;
	}

	return false;
};

function App() {
	// const loggedUser = AuthUser();

	// State vars
	const [darkMode, setDarkMode] = useState(getDarkModeInitialValue());

	// a listener for dark mode to saved it in localStorage (cache it)
	useEffect(() => {
		localStorage.setItem("dark-mode", JSON.stringify(darkMode));
	}, [darkMode]);

	// handle toggle dark mode
	const toggleDarkMode = (e: React.ChangeEvent<HTMLInputElement>) => {
		const open = e.target.checked;

		setDarkMode(open);
	};

	const theme = createMuiTheme({
		typography: {
			fontFamily: "Poppins",
		},
		palette: {
			type: darkMode ? "dark" : "light",
			primary: {
				main: "rgba(59, 130, 246)",
			},
		},
	});

	return (
		<ThemeProvider theme={theme}>
			<div className="app">
				{/* Header */}
				<Header toggleDarkMode={toggleDarkMode} />

				<main className={clsx("pt-3 content", darkMode && "bg-black")}>
					<Switch>
						<AuthRoute path="/" errorMsg="Please login first to see your diaries" exact>
							<Diary />
						</AuthRoute>

						<UnAuthRoute path="/login">
							<Login />
						</UnAuthRoute>

						<UnAuthRoute path="/register">
							<Register />
						</UnAuthRoute>
					</Switch>

					{/* Footer */}
					<footer className={clsx("mt-auto mx-auto pt-12 pb-6", darkMode && "text-white")}>
						<h3>Made with ??? by Sajid</h3>
					</footer>
				</main>
			</div>
		</ThemeProvider>
	);
}

export default App;
