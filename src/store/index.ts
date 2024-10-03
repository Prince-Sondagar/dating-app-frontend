import { configureStore } from "@reduxjs/toolkit";
import likeSlice from "./reducers/like.reducer";
import  subscriptinsSlice from "./reducers/subscription.reducer";
import userSlice from "./reducers/user.reducer";
import messagesSlice from "./reducers/messages.reducer";
import socialMediaSlice from "./reducers/socialMedia.reducer";

const store = configureStore({
	reducer: {
		user: userSlice,
		subscription:subscriptinsSlice,
		like:likeSlice,
		messages:messagesSlice,
		socialMedia:socialMediaSlice
	},
	devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
