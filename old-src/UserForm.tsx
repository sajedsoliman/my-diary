import { Grid, FormGroup, FormControlLabel, Checkbox } from "@material-ui/core";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { UserProps } from "./typescripts/commonTypes";
import TextInput from "./common/controls/TextInput";

type Props = {
	handleAddUser: (userInfo: UserProps) => boolean;
};

type FormData = {
	username: string;
	userId: string;
	isAdmin: boolean;
	email: string;
};

const UserForm = ({ handleAddUser }: Props) => {
	const { handleSubmit, formState, control, reset } = useForm<FormData>({
		mode: "onSubmit",
		reValidateMode: "onChange",
		shouldFocusError: true,
		defaultValues: {
			username: "",
			userId: "",
			isAdmin: false,
			email: "",
		},
	});
	const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
		const addUser = handleAddUser(data);

		if (addUser) {
			reset({
				username: "",
				userId: "",
				isAdmin: false,
				email: "",
			});
		}
	};
	const { errors } = formState;

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid container spacing={2}>
					<Grid item xs={4}>
						<Controller
							control={control}
							name="username"
							rules={{ required: true, pattern: /[A-Za-z]{5,}/ }}
							render={({ field }) => {
								return (
									<TextInput
										{...field}
										inputRef={null}
										label="Username"
										validationError={errors.username && "Username is short"}
									/>
								);
							}}
						/>
					</Grid>

					<Grid item xs={4}>
						<Controller
							control={control}
							name="userId"
							rules={{ required: true }}
							render={({ field }) => {
								return (
									<TextInput
										inputRef={null}
										label="userId"
										validationError={errors.userId && "userId is required"}
										{...field}
									/>
								);
							}}
						/>
					</Grid>

					<Grid item xs={4}>
						<Controller
							name="isAdmin"
							control={control}
							render={({ field }) => (
								<FormGroup>
									<FormControlLabel
										label={"Is Admin"}
										checked={field.value}
										control={<Checkbox color="primary" {...field} />}
									/>
								</FormGroup>
							)}
						/>
					</Grid>
				</Grid>

				<Controller
					control={control}
					name="email"
					rules={{ required: true, pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/ }}
					render={({ field }) => {
						return (
							<TextInput
								inputRef={null}
								{...field}
								label="Email"
								validationError={errors.email && "email is inValid"}
							/>
						);
					}}
				/>

				<button type="submit">Add</button>
			</form>
		</div>
	);
};

export default UserForm;
