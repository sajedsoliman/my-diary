// Router
import { Redirect, Route } from "react-router-dom";

// Contexts
import { AuthUser } from "../../contexts/UserContext";

function AuthRoute({ children, errorMsg, ...other }) {
	const user = AuthUser();

	return (
		<Route
			{...other}
			render={({ location }) => {
				const isUser = location.state && location.state.user;

				return !(user === "no user") || isUser ? (
					children
				) : (
					<Redirect
						to={{
							pathname: "/login",
							state: { from: location, error: errorMsg },
						}}
					/>
				);
			}}
		/>
	);
}

export default AuthRoute;
