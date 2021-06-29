const tabs = {
	title: "home",
};

const USER_SIGNIN_INITIAL_VALUES = {
	email: "",
	password: "",
};

const USER_REGISTER_INITIAL_VALUES = {
	...USER_SIGNIN_INITIAL_VALUES,
	fullName: "",
};

export { USER_REGISTER_INITIAL_VALUES, USER_SIGNIN_INITIAL_VALUES}