// UI
import { Button, CircularProgress, Grid, makeStyles } from "@material-ui/core";
import Controls from "../../common-components/controls/Controls";

// hooks
import { Form } from "../../hooks/useForm";

// util
import IF from "../../common-components/util/IF";

// types
import { RegisterUserProps } from "typescripts/commonTypes";

type Props = {
	action: "login" | "register";
	submitHandler: () => void;
	userInfo: RegisterUserProps;
	inputCommonProps: any;
	handleAddAvatar?: (file: any) => void;
	validationErrors: {
		[key: string]: string;
	};
	actionLoading: boolean;
};

// styles
const useStyles = makeStyles((theme) => ({}));

// Action => signin or register
const UserForm = ({
	action = "login",
	submitHandler,
	userInfo,
	inputCommonProps,
	handleAddAvatar,
	validationErrors,
	actionLoading,
}: Props) => {
	const classes = useStyles();

	// is a user registering condition
	const isRegister = action === "register";

	// Avatar uploader input props
	const avatarUploaderProps = {
		addFileHandle: (error: any, file: any) => {
			if (handleAddAvatar !== undefined) handleAddAvatar(file.file);
		},
		label: "Avatar",
		size: "small",
	};

	return (
		<Form onSubmit={submitHandler}>
			{/* Full Name & avatar - just for register */}
			<IF condition={isRegister}>
				<Grid container spacing={2} alignItems="center">
					<Grid item className="flex-1">
						{/* full name */}
						<Controls.TextInput
							{...inputCommonProps(
								"Full Name",
								"fullName",
								userInfo.fullName,
								validationErrors.fullName
							)}
						/>
					</Grid>
					<Grid item>
						{/* avatar */}
						<Controls.FilePondCircular {...avatarUploaderProps} />
					</Grid>
				</Grid>
			</IF>

			{/* email */}
			<Controls.TextInput
				{...inputCommonProps("Email", "email", userInfo.email, validationErrors.email)}
			/>

			{/* password  */}
			<Controls.PasswordInput
				{...inputCommonProps("Password", "password", userInfo.password, validationErrors.password)}
			/>

			{/* actions wrapper */}
			<div className="mt-5 flex items-center space-x-4">
				{/* submit button */}
				<Button disabled={actionLoading} variant="outlined" type="submit">
					<IF condition={isRegister} elseChildren={"Login"}>
						Register
					</IF>
				</Button>

				{/* process loading indicator */}
				<IF condition={actionLoading}>
					<CircularProgress size={30} color="secondary" />
				</IF>
			</div>
		</Form>
	);
};

export default UserForm;
