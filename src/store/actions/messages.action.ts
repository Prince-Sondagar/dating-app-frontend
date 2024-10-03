import { createAsyncThunk } from "@reduxjs/toolkit";
import API, { APISuccessResponse } from "../../utils/axios";

export const fetchThreadsAction = createAsyncThunk<APISuccessResponse>("messages", async (arg, thinkAPI) => {
	try {
		const { data, status } = await API.get<APISuccessResponse, any>("/messages");
		if (status !== 200) return thinkAPI.rejectWithValue(new Error(data.message || "Something is wrong here"));
		return thinkAPI.fulfillWithValue(data.data);
	} catch (error: any) {
		return thinkAPI.rejectWithValue(
			new Error((error.response.data.message ?? error.message) || "Something is wrong here"),
		);
	}
});

export const fetchMessagesOfThreadAction = createAsyncThunk<APISuccessResponse, { threadId: string; page: number }>(
	"messages/:threadId",
	async ({ threadId, page }, thinkAPI) => {
		try {
			const { data, status } = await API.get<APISuccessResponse, any>(`/messages/${threadId}?page=${page}`);
			if (status !== 200) return thinkAPI.rejectWithValue(new Error(data.message || "Something is wrong here"));
			return thinkAPI.fulfillWithValue(data.data);
		} catch (error: any) {
			return thinkAPI.rejectWithValue(
				new Error((error.response.data.message ?? error.message) || "Something is wrong here"),
			);
		}
	},
);

export const fetchPaginatedMessagesAction = createAsyncThunk<any, { threadId: string; page: number; limit?: number }>(
	"paginatedMessages/:threadId",
	async ({ threadId, page, limit = 20 }, thinkAPI) => {
		try {
			const { data, status } = await API.get<APISuccessResponse, any>(
				`/messages/${threadId}/messages?page=${page}&limit=${limit}`,
			);
			if (status !== 200) return thinkAPI.rejectWithValue(new Error(data.message || "Something is wrong here"));
			return thinkAPI.fulfillWithValue({ messages: data.data, page });
		} catch (error: any) {
			return thinkAPI.rejectWithValue(
				new Error((error.response.data.message ?? error.message) || "Something is wrong here"),
			);
		}
	},
);

export const updateMessagesOfThredAction = createAsyncThunk<any, { threadId: string; messageId: string; type: string }>(
	"message",
	async ({ threadId, messageId, type }, thinkAPI) => {
		try {
			const { data, status } = await API.get<APISuccessResponse, any>(`/messages/${threadId}/${messageId}/${type}`);
			if (status !== 200) return thinkAPI.rejectWithValue(new Error(data.message || "Something is wrong here"));
			return thinkAPI.fulfillWithValue({ messages: data.data });
		} catch (error: any) {
			return thinkAPI.rejectWithValue(
				new Error((error.response.data.message ?? error.message) || "Something is wrong here"),
			);
		}
	},
);

export const updateThredAction = createAsyncThunk<any, { threadId: string; isNewMatch: boolean; }>(
	"thread",
	async ({ threadId, isNewMatch }, thinkAPI) => {
		try {
			const { data } = await API.put<APISuccessResponse, any>(`/messages/${threadId}`);
			return data;
		} catch (error: any) {
			console.log("Something went wrong")
		}
	},
);

export const seenAllThreadMessagesAction = createAsyncThunk<any, { threadId: string; }>(
	"thread",
	async ({ threadId }, thinkAPI) => {
		try {
			const { data } = await API.post<APISuccessResponse, any>(`/messages/${threadId}/seen`);
			
			return data;
		} catch (error: any) {
			console.log("Something went wrong")
		}
	},
);