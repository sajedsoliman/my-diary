import { UserProps } from "./typescripts/commonTypes";

const User = ({ userId, username, email }: UserProps) => {
	return <div>{userId + " " + username + " - " + email}</div>;
};

export default User;
