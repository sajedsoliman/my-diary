import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { BrowserRouter as Router } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./redux/store";

// Contexts
import UserContextProvider from "./contexts/UserContext";

// Styles
import "./styles/styles.css";

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<UserContextProvider>
				<Router>
					<App />
				</Router>
			</UserContextProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);
