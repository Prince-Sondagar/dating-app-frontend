import { createAsyncThunk } from "@reduxjs/toolkit";
import API, { APISuccessResponse } from "../../utils/axios";

export const getAllSentLikes = createAsyncThunk<APISuccessResponse, { passions: string }>(
	"sentLike",
	async (arg, thinkAPI) => {
		try {
			const { data, status } = await API.get<APISuccessResponse, any>(
				`userinterest/matches/sentlikes?passions=${arg.passions || []}`,
			);
			if (status !== 200) return thinkAPI.rejectWithValue(new Error(data.message || "Something is wrong here"));
			return thinkAPI.fulfillWithValue(data.data);
		} catch (error: any) {
			return thinkAPI.rejectWithValue(
				new Error((error.response.data.message ?? error.message) || "Something is wrong here"),
			);
		}
	},
);

export const getAllLikes = createAsyncThunk<APISuccessResponse, { searchQuery: any }>(
	"Like",
	async (arg: any, thinkAPI) => {
		try {
			const { passions, hasBio, isVerified, maxDistance, minPhotos, ageRange } = arg;
			const { data, status } = await API.get("userinterest/matches/likes", {
				params: {
					hasBio: hasBio,
					isVerified: isVerified,
					maxDistance: maxDistance,
					minPhotos: minPhotos,
					ageRange: ageRange,
					passions: passions ? Object.values(passions).join(",") : [],
				},
			});
			if (status !== 200) return thinkAPI.rejectWithValue(new Error(data.message || "Something is wrong here"));
			return thinkAPI.fulfillWithValue(data.data);
		} catch (error: any) {
			return thinkAPI.rejectWithValue(
				new Error((error.response.data.message ?? error.message) || "Something is wrong here"),
			);
		}
	},
);
