import { useState, useEffect } from "react";
// router
import { Switch, Route } from "react-router-dom";
import UnAuthRoute from "common-components/router/UnAuthRoute";
import AuthRoute from "common-components/router/AuthRoute";

// UI
import { createMuiTheme, ThemeProvider, useTheme } from "@material-ui/core";

// redux
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
/* const fakeApiRef = axios.create({
	baseURL: "https://jsonplaceholder.typicode.com/users",
}); */

// contexts
import { AuthUser } from "contexts/UserContext";

// components
import Diary from "./components/Diary";
import Header from "components/header/Header";

// pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import React from "react";

function App() {
	const loggedUser = AuthUser();

	// State vars
	const [darkMode, setDarkMode] = useState(false);

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

				<main className={`pt-3 content ${darkMode && "bg-black"}`}>
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
				</main>
			</div>
		</ThemeProvider>
	);
}

export default App;
