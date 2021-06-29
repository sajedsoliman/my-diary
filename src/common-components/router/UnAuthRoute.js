// Router
import { Redirect, Route } from "react-router-dom";

// Contexts - to get the already logged user
import { AuthUser } from "../../contexts/UserContext";

function UnAuthRoute({ children, ...other }) {
	const loggedUser = AuthUser();

	return (
		<Route
			{...other}
			render={({ location }) =>
				loggedUser == "no user" ? (
					children
				) : (
					<Redirect
						to={{
							pathname: "/",
						}}
					/>
				)
			}
		/>
	);
}

export default UnAuthRoute;
