// router
import { useLocation } from "react-router-dom";

// info - functions (helpers)
import { userValidation } from "helpers/functions";
import { USER_SIGNIN_INITIAL_VALUES } from "helpers/info";

// hooks
import { useForm } from "hooks/useForm";

// components
import Store from "backends/Store";
import UserForm from "../../components/forms/UserForm";

const Login = () => {
	// router
	const location: any = useLocation();
	const errorMsg = location.state && location.state.error;

	// useForm hook
	const {
		values: userInfo,
		inputCommonProps,
		validationErrors,
		setErrors,
	} = useForm(USER_SIGNIN_INITIAL_VALUES, false, userValidation);

	// Import Store component to handle registering the user
	const { handleSignin, loading } = Store();

	// handle sign in the user  ss
	const handleSubmit = () => {
		// Signin the user if there is no error
		if (userValidation(userInfo, setErrors)) {
			handleSignin(userInfo.email, userInfo.password);
		}
	};

	return (
		<div className="max-w-lg mx-auto px-5 sm:px-0">
			{errorMsg && <h2 className="text-red-500 mb-3">{errorMsg}</h2>}

			<UserForm
				userInfo={userInfo}
				inputCommonProps={inputCommonProps}
				submitHandler={handleSubmit}
				validationErrors={validationErrors}
				actionLoading={loading}
				action="login"
			/>
		</div>
	);
};

export default Login;
