import { useState } from "react";

// router
import { useHistory } from "react-router-dom";

// hooks
import { useForm } from "hooks/useForm";

// info & function
import { userValidation } from "../../helpers/functions";
import { USER_REGISTER_INITIAL_VALUES } from "../../helpers/info";

// components
import Store from "backends/Store";
import UserForm from "../../components/forms/UserForm";

const Register = () => {
	// State vars
	const [avatar, setAvatar] = useState<null | File>(null);

	// router
	const history = useHistory();

	// Import useForm hook to control users' inputs
	const {
		values: userInfo,
		inputCommonProps,
		setErrors,
		validationErrors,
		resetForm,
	} = useForm(USER_REGISTER_INITIAL_VALUES, false, userValidation);

	// Import Store component to handle registering the user
	const { handleRegisterUser, loading } = Store();

	// handle add an avatar
	const handleAddAvatar = (file: File) => {
		setAvatar(file);
	};

	// handle register user
	const handleSubmit = async () => {
		const fullUserInfo = { ...userInfo, avatar };

		// register the user if there is no error
		if (userValidation(userInfo, setErrors)) {
			await handleRegisterUser(fullUserInfo);

			// reset the form
			resetForm();
		}
	};

	return (
		<div className="max-w-lg mx-auto px-5 sm:px-0">
			<UserForm
				userInfo={userInfo}
				action="register"
				inputCommonProps={inputCommonProps}
				submitHandler={handleSubmit}
				handleAddAvatar={handleAddAvatar}
				validationErrors={validationErrors}
				actionLoading={loading}
			/>
		</div>
	);
};

export default Register;
