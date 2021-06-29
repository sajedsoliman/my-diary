// UI
import Controls from "common-components/controls/Controls";
import { ParsableDate } from "@material-ui/pickers/constants/prop-types";

// types
type Props = {
	diaryDate: ParsableDate;
	handleChangeDate: (e: any) => void;
};

const FilterDiary = ({ diaryDate, handleChangeDate }: Props) => {
	return (
		<section className="mb-4">
			{/* Date picker input */}
			<Controls.DatePicker
				label="Select a diary's date"
				value={diaryDate}
				handleChangeDate={handleChangeDate}
			/>
		</section>
	);
};

export default FilterDiary;
