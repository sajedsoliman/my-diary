import { configureStore } from "@reduxjs/toolkit";

// Reducers
import userReducer from "./reducers/user";

const store = configureStore({
	reducer: {
		users: userReducer,
	},
});

export default store;
