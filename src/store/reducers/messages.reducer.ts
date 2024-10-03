import { createSlice, SliceCaseReducers } from "@reduxjs/toolkit";
import { fetchThreadsAction, fetchMessagesOfThreadAction, fetchPaginatedMessagesAction,updateMessagesOfThredAction } from "../actions/messages.action";

export type Message = {
	id: string;
	message: string;
	type: string;
	isLiked: boolean;
	isSeen: boolean;
	createdAt: string;
	fromUser: {
		id: string;
	};
	toUser: {
		id: string;
	};
};

export type ProfileMedia = {
	id?: string;
	url?: string;
};

export type User = {
	id: string;
	firstname: string;
	lastname: string;
	bio: string;
	aboutMe: string;
	city: string;
	isActive: boolean;
	school: string;
	profileMedia: ProfileMedia;
};

export type Thread = {
	id: string;
	isNewMatch: true;
	reason: string;
	createdAt: string;
	unSeenMessageCount: number;
	messages: Message[];
	userReceiver: User;
	userSender: User;
};

export type MessagesState = {
	threads: Thread[];
	thread?: Thread | null;
	isLoading: boolean;
	error: boolean;
	message: string;
	isToast: boolean;
	paginatedMessages: {
		hasMore: boolean,
		loadedMessages: Message[],
		currentPage: number,
	}
};

export const messagesSlice = createSlice<MessagesState, SliceCaseReducers<MessagesState>, string>({
	name: "messages",
	initialState: {
		threads: [],
		thread: null,
		isLoading: false,
		error: false,
		message: "",
		isToast: false,
		paginatedMessages: {
			hasMore: true,
			loadedMessages: [],
			currentPage: 1,
		}
	},
	reducers: {
		setIsToast(state, { payload }: { payload: { isToast: boolean; message?: string } }) {
			state.isToast = payload.isToast;
		},
	},
	extraReducers: (builder) => {
		// loginWithPhoneAction
		builder.addCase(fetchThreadsAction.pending, (state: any) => {
			state.isLoading = true;
			state.error = false;
		});
		builder.addCase(fetchThreadsAction.fulfilled, (state, { payload }: any) => {
			state.threads = payload;
			state.isLoading = false;
			state.error = false;
		});
		builder.addCase(fetchThreadsAction.rejected, (state, { payload }: any) => {
			state.isLoading = false;
			state.error = true;
			if (payload) state.message = payload?.message;
		});

		// loginWithPhoneAction
		builder.addCase(fetchMessagesOfThreadAction.pending, (state: any) => {
			state.isLoading = true;
			state.error = false;
		});
		builder.addCase(fetchMessagesOfThreadAction.fulfilled, (state, { payload }: any) => {
			state.thread = payload;
			state.isLoading = false;
			state.error = false;
		});
		builder.addCase(fetchMessagesOfThreadAction.rejected, (state, { payload }: any) => {
			state.isLoading = false;
			state.error = true;
			if (payload) state.message = payload?.message;
		});

		// loadMoreMessages
		builder.addCase(fetchPaginatedMessagesAction.pending, (state: any) => {
			state.isLoading = true;
			state.error = false;
		});
		builder.addCase(fetchPaginatedMessagesAction.fulfilled, (state, { payload }: any) => {
			const { page, messages } = payload;

			state.paginatedMessages.loadedMessages = messages;
			if (messages.length < 20) {
				state.paginatedMessages.hasMore = false;
			}
			state.paginatedMessages.currentPage = page;
		});
		builder.addCase(fetchPaginatedMessagesAction.rejected, (state, { payload }: any) => {
			state.isLoading = false;
			state.error = true;
			if (payload) state.message = payload?.message;
		});

		// updateMessagesOfThredAction
		builder.addCase(updateMessagesOfThredAction.pending, (state: any) => {
			state.isLoading = true;
			state.error = false;
		});
		builder.addCase(updateMessagesOfThredAction.fulfilled, (state, { payload }: any) => {
			state.isLoading = false;
			state.error = false;
		});
		builder.addCase(updateMessagesOfThredAction.rejected, (state, { payload }: any) => {
			state.isLoading = false;
			state.error = true;
			if (payload) state.message = payload?.message;
		});
	},
});

export const { setIsToast } = messagesSlice.actions;

export default messagesSlice.reducer;
