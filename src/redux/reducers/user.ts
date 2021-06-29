import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const fakeApiRef = axios.create({
	baseURL: "https://jsonplaceholder.typicode.com/users",
});

const fetchWholeUserList: any = createAsyncThunk("users/fetchAll", async (thunkAPI) => {
	const response = await fakeApiRef("/");
	return response.data;
});

const fetchUserById: any = createAsyncThunk("users/fetchUserById", async (userId, thunkAPI) => {
	const response = await fakeApiRef("/" + userId);
	return response.data;
});

interface UserState {
	users: object[];
	errors: string[];
}

const userSlice = createSlice({
	name: "Users",
	initialState: {
		users: [],
		errors: [],
	} as UserState,
	reducers: {
		showUsers: (state, action) => {
			state.users = action.payload;
		},
	},
	extraReducers: {
		[fetchWholeUserList.fulfilled]: (state, action) => {
			state.users = [...action.payload];
		},
		[fetchWholeUserList.rejected]: (state, action) => {
			console.log(action.payload);
		},
		[fetchUserById.fulfilled]: (state, { payload: newUser }) => {
			state.users = [newUser];
		},
	},
});

const { actions, reducer } = userSlice;

// const { showUsers } = actions;

// const fetchUsers = () => (dispatch) => {
// 	const req = fakeApiRef("/");
// 	req.then(({ data }) => {
// 		dispatch(showUsers(data));
// 	});
// };

export { fetchWholeUserList, fetchUserById };

export default reducer;
