import { SliceCaseReducers, createSlice } from "@reduxjs/toolkit";
import {
	connectWithInstagram,
	connectWithSpotify,
	fetchConnectedUser,
	fetchSpotifyArtist,
	refreshAnthem,
	refreshArtist,
	selectSpotifyAnthem,
} from "../actions/socialMedia.action";

export type SocialMediaState = {
	connected: any;
	spotify: any;
	instagram: any;
	anthem: any;
	artist: any;
	isLoading: boolean;
	error: boolean;
	message: string;
};

export const socialMediaSlice = createSlice<SocialMediaState, SliceCaseReducers<SocialMediaState>, string>({
	name: "socialMedia",
	initialState: {
		connected: [],
		anthem: [],
		spotify: [],
		instagram: [],
		artist: [],
		isLoading: false,
		error: false,
		message: "",
	},
	reducers: {},
	extraReducers: (builder) => {
		//connectWithSpotify
		builder.addCase(connectWithSpotify.pending, (state: any) => {
			state.isLoading = true;
			state.error = false;
		});
		builder.addCase(connectWithSpotify.fulfilled, (state, { payload }: any) => {
			state.spotify = payload?.metadata;
			state.isLoading = false;
			state.error = false;
		});
		builder.addCase(connectWithSpotify.rejected, (state, { payload }: any) => {
			state.isLoading = false;
			state.error = true;
			if (payload) state.message = payload?.message;
		});

		//fetchConnectedUser
		builder.addCase(fetchConnectedUser.pending, (state: any) => {
			state.isLoading = true;
			state.error = false;
		});
		builder.addCase(fetchConnectedUser.fulfilled, (state, { payload }: any) => {
			state.connected = payload;
			state.isLoading = false;
			state.error = false;
		});
		builder.addCase(fetchConnectedUser.rejected, (state, { payload }: any) => {
			state.isLoading = false;
			state.error = true;
			if (payload) state.message = payload?.message;
		});

		//selectSpotifyAnthem
		builder.addCase(selectSpotifyAnthem.pending, (state: any) => {
			state.isLoading = true;
			state.error = false;
		});
		builder.addCase(selectSpotifyAnthem.fulfilled, (state, { payload }: any) => {
			state.isLoading = false;
			state.error = false;
		});
		builder.addCase(selectSpotifyAnthem.rejected, (state, { payload }: any) => {
			state.isLoading = false;
			state.error = true;
			if (payload) state.message = payload?.message;
		});

		//fetchSpotifyArtist
		builder.addCase(fetchSpotifyArtist.pending, (state: any) => {
			state.isLoading = true;
			state.error = false;
		});
		builder.addCase(fetchSpotifyArtist.fulfilled, (state, { payload }: any) => {
			state.artist = payload;
			state.isLoading = false;
			state.error = false;
		});
		builder.addCase(fetchSpotifyArtist.rejected, (state, { payload }: any) => {
			state.isLoading = false;
			state.error = true;
			if (payload) state.message = payload?.message;
		});

		//refreshArtist
		builder.addCase(refreshArtist.pending, (state: any) => {
			state.isLoading = true;
			state.error = false;
		});
		builder.addCase(refreshArtist.fulfilled, (state, { payload }: any) => {
			state.artist = payload;
			state.isLoading = false;
			state.error = false;
		});
		builder.addCase(refreshArtist.rejected, (state, { payload }: any) => {
			state.isLoading = false;
			state.error = true;
			if (payload) state.message = payload?.message;
		});

		//refreshAnthem
		builder.addCase(refreshAnthem.pending, (state: any) => {
			state.isLoading = true;
			state.error = false;
		});
		builder.addCase(refreshAnthem.fulfilled, (state, { payload }: any) => {
			state.anthem = payload;
			state.isLoading = false;
			state.error = false;
		});
		builder.addCase(refreshAnthem.rejected, (state, { payload }: any) => {
			state.isLoading = false;
			state.error = true;
			if (payload) state.message = payload?.message;
		});

		//connectWithInstagram
		builder.addCase(connectWithInstagram.pending, (state: any) => {
			state.isLoading = true;
			state.error = false;
		});
		builder.addCase(connectWithInstagram.fulfilled, (state, { payload }: any) => {
			state.instagram = payload;
			state.isLoading = false;
			state.error = false;
		});
		builder.addCase(connectWithInstagram.rejected, (state, { payload }: any) => {
			state.isLoading = false;
			state.error = true;
			if (payload) state.message = payload?.message;
		});
	},
});

export const { setIsToast } = socialMediaSlice.actions;
export default socialMediaSlice.reducer;
