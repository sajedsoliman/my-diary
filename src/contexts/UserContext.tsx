import { useContext, createContext, useEffect, useState } from "react";
import { auth } from "backends/database";
import { AuthUserProps } from "typescripts/commonTypes";

const AuthedUserContext = createContext<AuthUserProps | null | "no user">(null);

// custom hook to access the user
export function AuthUser() {
	const context = useContext(AuthedUserContext);
	if (context === null || context === undefined)
		throw new Error("AuthedUser must be used within a AuthedUserProvider");

	return context;
}

const UserContext = ({ children }: { children: any }) => {
	const [authUser, setAuthUser] = useState<AuthUserProps | null | "no user">(null);

	useEffect(() => {
		auth.onAuthStateChanged((authedUser) => {
			if (authedUser) {
				const { displayName, email, uid, photoURL } = authedUser;
				const user = {
					fullName: displayName,
					email,
					id: uid,
					avatar: photoURL,
				} as AuthUserProps;

				setAuthUser(user);
			} else {
				// if the user has logged out -> remove them
				setAuthUser("no user");
			}
		});
	}, [auth.currentUser]);

	if (authUser == null || authUser == undefined) return null;
	return <AuthedUserContext.Provider value={authUser}>{children}</AuthedUserContext.Provider>;
};

export default UserContext;
