import { createAsyncThunk } from "@reduxjs/toolkit";
import API, { APISuccessResponse } from "../../utils/axios";

export const getAllMembershipSubscriptionsDetails = createAsyncThunk<APISuccessResponse>(
	"subscriptions/fetch-all",
	async (arg, thinkAPI) => {
		try {
			const { data, status } = await API.get<APISuccessResponse, any>("subscriptions/fetch-all");
			if (status !== 200) return thinkAPI.rejectWithValue(new Error(data.message || "Something is wrong here"));
			return thinkAPI.fulfillWithValue(data.data);
		} catch (error: any) {
			return thinkAPI.rejectWithValue(
				new Error((error.response.data.message ?? error.message) || "Something is wrong here"),
			);
		}
	},
);

export const getBoostSubscriptionDetail = createAsyncThunk<APISuccessResponse>(
	"subscriptions/fetch-all/boost",
	async (arg, thinkAPI) => {
		try {
			const { data, status } = await API.get<APISuccessResponse, any>("subscriptions/fetch-all/boost");
			if (status !== 200) return thinkAPI.rejectWithValue(new Error(data.message || "Something is wrong here"));
			return thinkAPI.fulfillWithValue(data.data);
		} catch (error: any) {
			return thinkAPI.rejectWithValue(
				new Error((error.response.data.message ?? error.message) || "Something is wrong here"),
			);
		}
	},
);

export const getSuperLikeSubscriptionDetail = createAsyncThunk<APISuccessResponse>(
	"subscriptions/fetch-all/superlike",
	async (arg, thinkAPI) => {
		try {
			const { data, status } = await API.get<APISuccessResponse, any>("subscriptions/fetch-all/superlike");
			if (status !== 200) return thinkAPI.rejectWithValue(new Error(data.message || "Something is wrong here"));
			return thinkAPI.fulfillWithValue(data.data);
		} catch (error: any) {
			return thinkAPI.rejectWithValue(
				new Error((error.response.data.message ?? error.message) || "Something is wrong here"),
			);
		}
	},
);

export const getUserPurchasedSubscriptionDetails = createAsyncThunk<APISuccessResponse>(
	"subscriptions",
	async (arg, thinkAPI) => {
		try {
			const { data, status } = await API.get<APISuccessResponse, any>("subscriptions");
			if (status !== 200) return thinkAPI.rejectWithValue(new Error(data.message || "Something is wrong here"));
			return thinkAPI.fulfillWithValue(data.data);
		} catch (error: any) {
			return thinkAPI.rejectWithValue(
				new Error((error.response.data.message ?? error.message) || "Something is wrong here"),
			);
		}
	},
);

export const pausedUserSubscription = createAsyncThunk<APISuccessResponse>(
	"subscriptions/pause",
	async (arg, thinkAPI) => {
		try {
			const { data, status } = await API.put<APISuccessResponse, any>("subscriptions/pause");
			if (status !== 200) return thinkAPI.rejectWithValue(new Error(data.message || "Something is wrong here"));
			return thinkAPI.fulfillWithValue(data.data);
		} catch (error: any) {
			return thinkAPI.rejectWithValue(
				new Error((error.response.data.message ?? error.message) || "Something is wrong here"),
			);
		}
	},
);

export const resumeUserSubscription = createAsyncThunk<APISuccessResponse>(
	"subscriptions/resume",
	async (arg, thinkAPI) => {
		try {
			const { data, status } = await API.put<APISuccessResponse, any>("subscriptions/resume");
			if (status !== 200) return thinkAPI.rejectWithValue(new Error(data.message || "Something is wrong here"));
			await getUserPurchasedSubscriptionDetails()
			return thinkAPI.fulfillWithValue(data.data);
		} catch (error: any) {
			return thinkAPI.rejectWithValue(
				new Error((error.response.data.message ?? error.message) || "Something is wrong here"),
			);
		}
	},
);

export const getUserPaymentMethodsDetails = createAsyncThunk<APISuccessResponse>(
	"subscriptions/cards",
	async (arg, thinkAPI) => {
		try {
			const { data, status } = await API.get<APISuccessResponse, any>("subscriptions/cards");
			if (status !== 200) return thinkAPI.rejectWithValue(new Error(data.message || "Something is wrong here"));
			return thinkAPI.fulfillWithValue(data.data);
		} catch (error: any) {
			return thinkAPI.rejectWithValue(
				new Error((error.response.data.message ?? error.message) || "Something is wrong here"),
			);
		}
	},
);

export const setDefaultPaymentCard = createAsyncThunk<APISuccessResponse, { paymentId: any }>(
	"subscriptions/card-default",
	async (arg, thinkAPI) => {
		try {
			const { data } = await API.post<APISuccessResponse, any>(`subscriptions/card-default/${arg?.paymentId}`);
			// if (status !== 200) return thinkAPI.rejectWithValue(new Error(data.message || "Something is wrong here"));
			await getUserPaymentMethodsDetails()
			return thinkAPI.fulfillWithValue(data.data);
		} catch (error: any) {
			return thinkAPI.rejectWithValue(
				new Error((error.response.data.message ?? error.message) || "Something is wrong here"),
			);
		}
	},
);

export const deleteSavedCard = createAsyncThunk<APISuccessResponse, { paymentId: any }>(
	"subscriptions/card-default/delete",
	async (arg, thinkAPI) => {
		try {
			const { data, status } = await API.delete<APISuccessResponse, any>(`subscriptions/cards/${arg?.paymentId}`);
			if (status !== 200) return thinkAPI.rejectWithValue(new Error(data.message || "Something is wrong here"));
			await getUserPurchasedSubscriptionDetails()
			return thinkAPI.fulfillWithValue(data.data);
		} catch (error: any) {
			return thinkAPI.rejectWithValue(
				new Error((error.response.data.message ?? error.message) || "Something is wrong here"),
			);
		}
	},
);

export const cancelUserSubscription = createAsyncThunk<APISuccessResponse>(
	"cancelSubscription",
	async (arg, thinkAPI) => {
		try {
			const { data, status } = await API.delete<APISuccessResponse, any>("subscriptions");
			if (status !== 200) return thinkAPI.rejectWithValue(new Error(data.message || "Something is wrong here"));
			await getUserPurchasedSubscriptionDetails()
			return thinkAPI.fulfillWithValue(data.data);
		} catch (error: any) {
			return thinkAPI.rejectWithValue(
				new Error((error.response.data.message ?? error.message) || "Something is wrong here"),
			);
		}
	},
);