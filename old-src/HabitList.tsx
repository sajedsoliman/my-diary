import React, { useState } from "react";
import { UserProps } from "./typescripts/commonTypes";
import User from "./User";
import UserForm from "./UserForm";

type ComProps = {
	userList: {
		username: string;
		userId: string;
		isAdmin: false;
		email: string;
	}[];
	someInfo?: Record<string, number>;
	listStyles: React.CSSProperties;
	togglerIcon: JSX.Element;
	onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const UserList: React.FC<ComProps> = ({ userList, listStyles }) => {
	const [users, setUsers] = useState<UserProps[]>([]);

	// Handle add user
	const handleAddUser = (userInfo: UserProps) => {
		setUsers([...users, userInfo]);

		return true;
	};

	const mappedUsers = users.map((user: UserProps) => {
		return <User {...user} />;
	});

	return (
		<div>
			<div style={listStyles}>{mappedUsers}</div>

			{/* Form -- later */}
			<UserForm handleAddUser={handleAddUser} />
		</div>
	);
};

export default UserList;
