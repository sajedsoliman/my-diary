import React from "react";

// material-ui imports
import { TextField } from "@material-ui/core";

// validationError => either an error string or undefined

export default function TextInput({
	variant = "outlined",
	validationError,
	margin = "dense",
	onChange,
	value,
	label,
	name,
	inputRef,
	...otherProps
}) {
	return (
		<TextField
			{...(validationError && { error: true, helperText: validationError })}
			variant={variant}
			size="small"
			ref={inputRef}
			margin={margin}
			value={value}
			onChange={onChange}
			name={name}
			label={label}
			fullWidth
			{...otherProps}
		/>
	);
}
