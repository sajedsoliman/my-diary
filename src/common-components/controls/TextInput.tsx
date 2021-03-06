import React from "react";

// material-ui imports
import { TextField } from "@material-ui/core";

export default function TextInput({
	variant = "outlined",
	validationError,
	margin = "dense",
	inputChange,
	value,
	label,
	name,
	inputRef,
	...otherProps
}: any) {
	return (
		<TextField
			{...(validationError && { error: true, helperText: validationError })}
			variant={variant}
			size="small"
			ref={inputRef}
			margin={margin}
			value={value}
			onChange={inputChange}
			name={name}
			label={label}
			fullWidth
			{...otherProps}
		/>
	);
}
