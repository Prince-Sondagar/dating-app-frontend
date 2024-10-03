import { createSlice, SliceCaseReducers } from "@reduxjs/toolkit";
import {
	cancelUserSubscription,
	deleteSavedCard,
	getBoostSubscriptionDetail,
	getAllMembershipSubscriptionsDetails,
	getUserPaymentMethodsDetails,
	getUserPurchasedSubscriptionDetails,
	pausedUserSubscription,
	resumeUserSubscription,
	setDefaultPaymentCard,
	getSuperLikeSubscriptionDetail,
} from "../actions/subscription.action";

export interface paymentMethod {
	brand: string;
	checks: {
		address_line1_check: string | null;
		address_postal_code_check: string | null;
		cvc_check: string;
	};
	country: string;
	exp_month: number;
	exp_year: number;
	fingerprint: string;
	funding: string;
	generated_from: string | null;
	last4: string;
	networks: {
		available: string[];
		preferred: string | null;
	};
	three_d_secure_usage: {
		supported: boolean;
	};
	wallet: string | null;
	id: string;
	default: boolean;
}

interface boostSubscription {}

interface superLikeSubscription {}

export type SubscriptionState = {
	subscription?: any;
	subscriptionDetail: any;
	paymentMethods: paymentMethod[];
	boostSubscription: boostSubscription[];
	superLikeSubscription: superLikeSubscription[];
	isLoading: boolean;
	error: boolean;
	message: string;
};

export const subscriptinsSlice = createSlice<SubscriptionState, SliceCaseReducers<SubscriptionState>, string>({
	name: "subscriptions",
	initialState: {
		subscription: [],
		subscriptionDetail: [],
		boostSubscription: [],
		superLikeSubscription: [],
		paymentMethods: [],
		isLoading: false,
		error: false,
		message: "",
	},
	reducers: {},
	extraReducers: (builder) => {
		//getAllSubscriptionDetails
		builder.addCase(getAllMembershipSubscriptionsDetails.pending, (state: any) => {
			state.isLoading = true;
			state.error = false;
		});
		builder.addCase(getAllMembershipSubscriptionsDetails.fulfilled, (state, { payload }: any) => {
			state.subscription = payload;
			state.isLoading = false;
			state.error = false;
		});
		builder.addCase(getAllMembershipSubscriptionsDetails.rejected, (state, { payload }: any) => {
			state.isLoading = false;
			state.error = true;
			if (payload) state.message = payload?.message;
		});
		//getBoostSubscriptionDetail
		builder.addCase(getBoostSubscriptionDetail.pending, (state: any) => {
			state.isLoading = true;
			state.error = false;
		});
		builder.addCase(getBoostSubscriptionDetail.fulfilled, (state, { payload }: any) => {
			state.boostSubscription = payload;
			state.isLoading = false;
			state.error = false;
		});
		builder.addCase(getBoostSubscriptionDetail.rejected, (state, { payload }: any) => {
			state.isLoading = false;
			state.error = true;
			if (payload) state.message = payload?.message;
		});
		//getSuperLikeSubscriptionDetail
		builder.addCase(getSuperLikeSubscriptionDetail.pending, (state: any) => {
			state.isLoading = true;
			state.error = false;
		});
		builder.addCase(getSuperLikeSubscriptionDetail.fulfilled, (state, { payload }: any) => {
			state.superLikeSubscription = payload;
			state.isLoading = false;
			state.error = false;
		});
		builder.addCase(getSuperLikeSubscriptionDetail.rejected, (state, { payload }: any) => {
			state.isLoading = false;
			state.error = true;
			if (payload) state.message = payload?.message;
		});
		//getUserPurchasedSubscriptionDetails
		builder.addCase(getUserPurchasedSubscriptionDetails.pending, (state: any) => {
			state.isLoading = true;
			state.error = false;
		});
		builder.addCase(getUserPurchasedSubscriptionDetails.fulfilled, (state, { payload }: any) => {
			state.subscriptionDetail = payload;
			state.isLoading = false;
			state.error = false;
		});
		builder.addCase(getUserPurchasedSubscriptionDetails.rejected, (state, { payload }: any) => {
			state.isLoading = false;
			state.error = true;
			if (payload) state.message = payload?.message;
		});
		//pausedUserSubscription
		builder.addCase(pausedUserSubscription.pending, (state: any) => {
			state.isLoading = true;
			state.error = false;
		});
		builder.addCase(pausedUserSubscription.fulfilled, (state, { payload }: any) => {
			state.isLoading = false;
			state.error = false;
		});
		builder.addCase(pausedUserSubscription.rejected, (state, { payload }: any) => {
			state.isLoading = false;
			state.error = true;
			if (payload) state.message = payload?.message;
		});
		//resumeUserSubscription
		builder.addCase(resumeUserSubscription.pending, (state: any) => {
			state.isLoading = true;
			state.error = false;
		});
		builder.addCase(resumeUserSubscription.fulfilled, (state, { payload }: any) => {
			state.isLoading = false;
			state.error = false;
		});
		builder.addCase(resumeUserSubscription.rejected, (state, { payload }: any) => {
			state.isLoading = false;
			state.error = true;
			if (payload) state.message = payload?.message;
		});
		//CanelUserSubscription
		builder.addCase(cancelUserSubscription.pending, (state: any) => {
			state.isLoading = true;
			state.error = false;
		});
		builder.addCase(cancelUserSubscription.fulfilled, (state, { payload }: any) => {
			state.isLoading = false;
			state.error = false;
		});
		builder.addCase(cancelUserSubscription.rejected, (state, { payload }: any) => {
			state.isLoading = false;
			state.error = true;
			if (payload) state.message = payload?.message;
		});
		// GetUserPaymentMethods
		builder.addCase(getUserPaymentMethodsDetails.pending, (state: any) => {
			state.isLoading = true;
			state.error = false;
		});
		builder.addCase(getUserPaymentMethodsDetails.fulfilled, (state, { payload }: any) => {
			state.paymentMethods = payload;
			state.error = false;
		});
		builder.addCase(getUserPaymentMethodsDetails.rejected, (state, { payload }: any) => {
			state.isLoading = false;
			state.error = true;
		});
		// setDefaultPaymentCard
		builder.addCase(setDefaultPaymentCard.pending, (state: any) => {
			state.isLoading = true;
			state.error = false;
		});
		builder.addCase(setDefaultPaymentCard.fulfilled, (state, { payload }: any) => {
			state.error = false;
		});
		builder.addCase(setDefaultPaymentCard.rejected, (state, { payload }: any) => {
			state.isLoading = false;
			state.error = true;
		});
		// deleteSavedCard
		builder.addCase(deleteSavedCard.pending, (state: any) => {
			state.isLoading = true;
			state.error = false;
		});
		builder.addCase(deleteSavedCard.fulfilled, (state, { payload }: any) => {
			state.error = false;
		});
		builder.addCase(deleteSavedCard.rejected, (state, { payload }: any) => {
			state.isLoading = false;
			state.error = true;
		});
	},
});

export const { setIsToast } = subscriptinsSlice.actions;
export default subscriptinsSlice.reducer;
