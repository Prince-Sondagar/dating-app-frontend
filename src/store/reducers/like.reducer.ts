import { createSlice, SliceCaseReducers } from "@reduxjs/toolkit";
import { getAllLikes, getAllSentLikes } from "../actions/like.action";

export type UserState = {
	like?: any;
	sentLike: any;
	isLoading: boolean;
	error: boolean;
	message: string;
};

export const likeSlice = createSlice<UserState, SliceCaseReducers<UserState>, string>({
	name: "like",
	initialState: {
		like: [],
		sentLike: [],
		isLoading: false,
		error: false,
		message: "",
	},
	reducers: {},
	extraReducers: (builder) => {
		//getAllSentLikes
		builder.addCase(getAllSentLikes.pending, (state: any) => {
			state.isLoading = true;
			state.error = false;
		});
		builder.addCase(getAllSentLikes.fulfilled, (state, { payload }: any) => {
			state.sentLike = payload;
			state.isLoading = false;
			state.error = false;
		});
		builder.addCase(getAllSentLikes.rejected, (state, { payload }: any) => {
			state.isLoading = false;
			state.error = true;
			if (payload) state.message = payload?.message;
		});
		//getAllLikes
		builder.addCase(getAllLikes.pending, (state: any) => {
			state.isLoading = true;
			state.error = false;
		});
		builder.addCase(getAllLikes.fulfilled, (state, { payload }: any) => {
			state.like = payload;
			state.isLoading = false;
			state.error = false;
		});
		builder.addCase(getAllLikes.rejected, (state, { payload }: any) => {
			state.isLoading = false;
			state.error = true;
			if (payload) state.message = payload?.message;
		});
	},
});

export const { setIsToast } = likeSlice.actions;
export default likeSlice.reducer;
