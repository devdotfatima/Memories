import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
	name: "auth",
	initialState: { authData: null, error: null, isAuthenticated: false },
	reducers: {
		AUTH(state, action) {
			state.authData = action?.payload;
			localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
			state.isAuthenticated = true;
			state.error = null;
		},
		LOGOUT(state, action) {
			localStorage.clear();
			state.isAuthenticated = false;
			state.authData = null;
		},
		SET_ERROR(state, action) {
			state.error = action.payload;
		},
		UNSET_ERROR(state) {
			state.error = null;
		},
	},
});

export const authActions = authSlice.actions;
export default authSlice;
