import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
	name: "posts",
	initialState: {
		posts: [],
		currentPage: null,
		numberOfPages: null,
		isLoading: null,
		post: null,
	},
	reducers: {
		START_LOADING(state, action) {
			state.isLoading = true;
		},
		END_LOADING(state, action) {
			state.isLoading = false;
		},
		FETCH_ALL(state, action) {
			state.posts = action.payload.data;
			state.currentPage = action.payload.currentPage;
			state.numberOfPages = action.payload.numberOfPages;
		},
		CREATE(state, action) {
			state.posts = [...state.posts, action.payload];
		},
		UPDATE(state, action) {
			state.posts = state.posts.map((post) =>
				post._id === action.payload._id ? action.payload : post
			);
		},
		DELETE(state, action) {
			state.posts = state.posts.filter((post) => post._id !== action.payload);
		},
		FETCH_BY_SEARCH(state, action) {
			state.posts = action.payload;
		},
		FETCH_POST(state, action) {
			state.post = action.payload;
		},
		COMMENT(state, action) {
			state.posts = state.posts.map((post) =>
				post._id === action.payload._id ? action.payload : post
			);
		},
	},
});

export const postActions = postSlice.actions;
export default postSlice;
