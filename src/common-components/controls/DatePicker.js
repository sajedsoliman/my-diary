// date imports
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";

export default function DatePicker(props) {
	const { label, name, value, handleChangeDate, open } = props;

	// handle date return value (does not return an e(event) to get the name)
	const handleDateQuirk = (value, name) => {
		return {
			target: { name, value },
		};
	};

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<KeyboardDatePicker
				fullWidth
				variant="dialog"
				format="yyyy/MM/dd"
				margin="normal"
				label={label}
				inputVariant="filled"
				value={value}
				size="small"
				onChange={(date) => handleChangeDate(handleDateQuirk(date, name))}
			/>
		</MuiPickersUtilsProvider>
	);
}
