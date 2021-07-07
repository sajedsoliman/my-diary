import React from "react";

// material-ui imports
import { TextField } from "@material-ui/core";

export default function TextArea({
	validationError,
	inputChange,
	value,
	label,
	rows,
	color = "primary",
	name,
	...otherProps
}) {
	return (
		<TextField
			{...(validationError && { error: true, helperText: validationError })}
			variant="outlined"
			size="small"
			margin="dense"
			value={value}
			onChange={inputChange}
			name={name}
			label={label}
			fullWidth
			multiline
			color={color}
			rows={rows}
			rowsMax={rows}
			{...otherProps}
		/>
	);
}
