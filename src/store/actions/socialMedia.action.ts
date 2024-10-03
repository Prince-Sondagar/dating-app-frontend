import { createAsyncThunk } from "@reduxjs/toolkit";
import API, { APISuccessResponse } from "../../utils/axios";

export const connectWithSpotify = createAsyncThunk<APISuccessResponse, { code: string; date: any }>(
	"connected-account/connect-spotify",
	async (arg, thinkAPI) => {
		try {
			const { data } = await API.post<APISuccessResponse, any>("connected-account/connect-spotify", arg as any);
			return thinkAPI.fulfillWithValue(data.data);
		} catch (error: any) {
			return thinkAPI.rejectWithValue(
				new Error((error.response.data.message ?? error.message) || "Something is wrong here"),
			);
		}
	},
);

export const fetchSpotifyArtist = createAsyncThunk<APISuccessResponse>(
	"connected-account/spotify-artist",
	async (arg, thinkAPI) => {
		try {
			const { data } = await API.post<APISuccessResponse, any>("connected-account/spotify-artist");
			return thinkAPI.fulfillWithValue(data);
		} catch (error: any) {
			return thinkAPI.rejectWithValue(
				new Error((error.response.data.message ?? error.message) || "Something is wrong here"),
			);
		}
	},
);

export const fetchConnectedUser = createAsyncThunk<APISuccessResponse>(
	"connected-account/connected",
	async (arg, thinkAPI) => {
		try {
			const { data } = await API.get<APISuccessResponse, any>("connected-account/connected");
			return thinkAPI.fulfillWithValue(data.data);
		} catch (error: any) {
			return thinkAPI.rejectWithValue(
				new Error((error.response.data.message ?? error.message) || "Something is wrong here"),
			);
		}
	},
);

export const refreshArtist = createAsyncThunk<APISuccessResponse>(
	"connected-account/refresh-artist",
	async (arg, thinkAPI) => {
		try {
			const { data } = await API.get<APISuccessResponse, any>("connected-account/refresh-artist");
			return thinkAPI.fulfillWithValue(data);
		} catch (error: any) {
			return thinkAPI.rejectWithValue(
				new Error((error.response.data.message ?? error.message) || "Something is wrong here"),
			);
		}
	},
);
export const refreshAnthem = createAsyncThunk<APISuccessResponse, { search: string }>(
	"connected-account/spotify-anthem",
	async (arg, thinkAPI) => {
		try {
			const { data } = await API.post<APISuccessResponse, any>("connected-account/spotify-anthem", arg);
			return thinkAPI.fulfillWithValue(data);
		} catch (error: any) {
			return thinkAPI.rejectWithValue(
				new Error((error.response.data.message ?? error.message) || "Something is wrong here"),
			);
		}
	},
);

export const updateSpotifyArtist = createAsyncThunk<APISuccessResponse, { id: string; isSelected: boolean }>(
	"connected-account/update-artist",
	async (arg, thinkAPI) => {
		try {
			const { data, status } = await API.put<APISuccessResponse, any>("connected-account/update-artist", arg as any);
			if (status !== 200) return thinkAPI.rejectWithValue(new Error(data.message || "Something is wrong here"));
			return thinkAPI.fulfillWithValue(data.data);
		} catch (error: any) {
			return thinkAPI.rejectWithValue(
				new Error((error.response.data.message ?? error.message) || "Something is wrong here"),
			);
		}
	},
);

export const disconnectSoicalMediaAccount = createAsyncThunk<APISuccessResponse, { appType: string }>(
	"connected-account/disconnect",
	async (arg, thinkAPI) => {
		try {
			const { data, status } = await API.post<APISuccessResponse, any>("connected-account/disconnect", arg);
			if (status !== 200) return thinkAPI.rejectWithValue(new Error(data.message || "Something is wrong here"));
			return thinkAPI.fulfillWithValue(data.data);
		} catch (error: any) {
			return thinkAPI.rejectWithValue(
				new Error((error.response.data.message ?? error.message) || "Something is wrong here"),
			);
		}
	},
);

export const connectWithInstagram = createAsyncThunk<APISuccessResponse, { code: string }>(
	"connected-account/connect-instagram",
	async (arg, thinkAPI) => {
		try {
			const { data } = await API.post<APISuccessResponse, any>("connected-account/connect-instagram", arg as any);
			return thinkAPI.fulfillWithValue(data.data);
		} catch (error: any) {
			return thinkAPI.rejectWithValue(
				new Error((error.response.data.message ?? error.message) || "Something is wrong here"),
			);
		}
	},
);

export const selectSpotifyAnthem = createAsyncThunk<APISuccessResponse, { type: string; selectedAnthem: string }>(
	"connected-account/select-anthem",
	async (arg, thinkAPI) => {
		try {
			const { type, selectedAnthem } = arg;
			const { data } = await API.put<APISuccessResponse, any>(`connected-account/anthem-${type}`, { selectedAnthem });
			return thinkAPI.fulfillWithValue(data.data);
		} catch (error: any) {
			return thinkAPI.rejectWithValue(
				new Error((error.response.data.message ?? error.message) || "Something is wrong here"),
			);
		}
	},
);
