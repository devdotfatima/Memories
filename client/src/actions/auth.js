import * as api from "../api/index";
import authSlice, { authActions } from "../reducers/auth";

export const signin = (formData, history) => async (dispatch) => {
	const sendRequest = async () => {
		const { data } = await api.signIn(formData);
		return data;
	};
	try {
		const data = await sendRequest();
		dispatch(authActions.AUTH(data));
		history("/");
	} catch (error) {
		dispatch(authActions.SET_ERROR(error.response.data.message));
	}
};

export const signup = (formData, history) => async (dispatch) => {
	const sendRequest = async () => {
		const { data } = await api.signUp(formData);
		return data;
	};
	try {
		const data = await sendRequest();
		dispatch(authActions.AUTH(data));
		// history("/");
	} catch (error) {
		console.log(error);
		dispatch(authActions.SET_ERROR(error.response.data.message));
	}
};
