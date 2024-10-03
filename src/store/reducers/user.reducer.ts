import { createSlice, SliceCaseReducers } from "@reduxjs/toolkit";
import {
	fetchUserAction,
	loginWithPhoneAction,
	saveUserOnboardingAction,
	loginAction,
	signUpAction,
	forgotPasswordAction,
	resetPasswordAction,
	verifyPhoneOtpAction,
	setUserInterestAction,
	updatePhoneNumberAction,
	verifyNewPhoneNumberOtpAction,
	getNearByUsersAction,
	getDiscoverySettingAction,
	updateDiscoverySettingAction,
	authLogoutAction,
	getUserProfileMediaAction,
	verifyUserAction,
	getDiscoveryUserPassionsAction,
} from "../actions/user.action";
import localStorage from "../../services/localStorage.service";

export enum GenderEnum {
	MALE = "male",
	FEMALE = "female",
}

export enum ShowMeEnum {
	MALE = "male",
	FEMALE = "female",
	EVERYONE = "everyone",
}

export type Passion = {
	id: string;
	passion: string;
	createdAt: string;
	updatedAt?: string;
	deletedAt?: string;
};

export type DiscoverySetting = {
	id: string;
	location: string;
	distancePref: number;
	distancePrefShowOnlyThisRange: boolean;
	agePref: string[];
	agePrefShowOnlyThisRange: boolean;
	global: boolean;
	isCompleted: number;
	showMeOnApp: boolean;
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
	avatar: string;
	isSmartPhoto: boolean;
	countryCode: string;
	mobile: string;
	isValidMobile: boolean;
	birthdate: Date;
	gender: GenderEnum;
	showMeOnApp: boolean;
	showMe: ShowMeEnum;
	passions?: Array<Passion>;
	showMyGenderOnProfile: boolean;
	city: string;
	state: string;
	country: string;
	latLong: [number, number];
	location: string;
	isVerified: boolean;
	darkMode: boolean;
	isActive: boolean;
	profileImages?: Array<any>;
	lastActive: Date;
	email: string;
	isCompOnboarding: boolean;
	job: string;
	school: string;
	company: string;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date | null;
	distanceType: string;
	discoverySetting?: DiscoverySetting;
	profileMedias?: ProfileMedia[];
	nearbyUsers?: User[];
	userSuperPassions?: User[];
	superLikes: number;
	boosts: number;
	balancedRecommendations: boolean;
	recentlyActive: boolean;
	standard: boolean;
	onlyPeopleLiked: boolean;
	threadId?: string;
};

export type Tokens = {
	accessToken: string;
	refreshToken: string;
};

export type UserState = {
	user?: User;
	tokens?: Tokens;
	isLogin: boolean;
	isLoginVerified: boolean;
	isLoading: boolean;
	error: boolean;
	message: string;
	isToast: boolean;
};

export const userSlice = createSlice<UserState, SliceCaseReducers<UserState>, string>({
	name: "user",
	initialState: {
		user: { ...(localStorage.getItem("user") ?? {}) },
		tokens: localStorage.getItem("tokens") ?? {},
		isLogin: localStorage.getItem("tokens") ? true : false,
		isLoginVerified: false,
		isLoading: false,
		error: false,
		message: "",
		isToast: false,
	},
	reducers: {
		setIsToast(state, { payload }: { payload: { isToast: boolean; message?: string } }) {
			state.isToast = payload.isToast;
		},
	},
	extraReducers: (builder) => {
		// loginWithPhoneAction
		builder.addCase(loginWithPhoneAction.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(loginWithPhoneAction.fulfilled, (state) => {
			state.isLoading = false;
		});
		builder.addCase(loginWithPhoneAction.rejected, (state, { payload }: any) => {
			state.isLoading = false;
			state.isToast = true;
			state.error = true;
			if (payload) {
				state.message = payload.message;
			}
		});

		// loginAction
		builder.addCase(loginAction.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(loginAction.fulfilled, (state, { payload }) => {
			state.tokens = payload.data;
			state.isLogin = true;
			state.isLoading = false;
			state.isToast = true;
			state.error = false;
			if (payload) {
				state.message = payload.message;
			}
		});
		builder.addCase(loginAction.rejected, (state, { payload }: any) => {
			state.isLoading = false;
			state.isToast = true;
			state.error = true;
			if (payload) {
				state.message = payload.message;
			}
		});

		// signupAction
		builder.addCase(signUpAction.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(signUpAction.fulfilled, (state, { payload }: any) => {
			state.isLoading = false;
			state.isToast = true;
			state.error = false;
			if (payload) {
				state.message = payload.message;
			}
		});
		builder.addCase(signUpAction.rejected, (state, { payload }: any) => {
			state.isLoading = false;
			state.isToast = true;
			state.error = true;
			if (payload) {
				state.message = payload.message;
			}
		});

		// forgotPasswordAction
		builder.addCase(forgotPasswordAction.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(forgotPasswordAction.fulfilled, (state, { payload }: any) => {
			state.isLoading = false;
			state.isToast = true;
			state.error = false;
			if (payload) {
				state.message = payload.message;
			}
		});
		builder.addCase(forgotPasswordAction.rejected, (state, { payload }: any) => {
			state.isLoading = false;
			state.isToast = true;
			state.error = true;
			if (payload) {
				state.message = payload.message;
			}
		});

				// resetPasswordAction
				builder.addCase(resetPasswordAction.pending, (state) => {
					state.isLoading = true;
				});
				builder.addCase(resetPasswordAction.fulfilled, (state, { payload }: any) => {
					state.isLoading = false;
					state.isToast = true;
					state.error = false;
					if (payload) {
						state.message = payload.message;
					}
				});
				builder.addCase(resetPasswordAction.rejected, (state, { payload }: any) => {
					state.isLoading = false;
					state.isToast = true;
					state.error = true;
					if (payload) {
						state.message = payload.message;
					}
				});

		// verifyPhoneOtpAction
		builder.addCase(verifyPhoneOtpAction.pending, (state) => {
			state.isLoading = true;
			state.error = false;
		});
		builder.addCase(verifyPhoneOtpAction.fulfilled, (state, { payload }) => {
			state.tokens = payload.data;
			state.isLogin = true;
			state.isLoading = false;
			state.error = false;
		});
		builder.addCase(verifyPhoneOtpAction.rejected, (state, { payload }: any) => {
			state.isLoading = false;
			state.isToast = true;
			state.error = true;
			if (payload) {
				state.message = payload.message;
			}
		});
		// fetchUserAction
		builder.addCase(fetchUserAction.pending, (state) => {
			state.isLoading = true;
			state.error = false;
		});
		builder.addCase(fetchUserAction.fulfilled, (state, { payload }) => {
			state.user = { ...state.user, ...payload };
			// state.isLogin = true;
			state.isLoginVerified = true;
			state.isLoading = false;
			state.error = false;
		});
		builder.addCase(fetchUserAction.rejected, (state, { payload }: any) => {
			state.isLoading = false;
			// state.isLogin = false;
			state.isLoginVerified = false;
			state.user = undefined;
			state.tokens = undefined;
			if (payload) state.message = payload.message;
		});

		// saveUserOnboarding
		builder.addCase(saveUserOnboardingAction.pending, (state: any) => {
			state.isLoading = true;
			state.error = false;
		});
		builder.addCase(saveUserOnboardingAction.fulfilled, (state, { payload }: any) => {
			state.isLoading = false;
			state.error = false;
			state.user = {
				...state.user,
				...payload.user,
			};
		});
		builder.addCase(saveUserOnboardingAction.rejected, (state, { payload }: any) => {
			state.isLoading = false;
			state.error = true;
			if (!state.isToast) {
				state.isToast = false;
				state.message = "";
			}
			if (payload?.message) {
				state.message = payload.message;
				state.isToast = true;
			}
		});

		// setUserInterest
		builder.addCase(setUserInterestAction.pending, (state: any) => {
			state.isLoading = true;
			state.error = false;
		});
		builder.addCase(setUserInterestAction.fulfilled, (state, { payload }: any) => {
			state.isLoading = false;
			state.error = false;
			if (payload) state.message = payload.message;
		});
		builder.addCase(setUserInterestAction.rejected, (state, { payload }: any) => {
			state.isLoading = false;
			state.error = true;
			state.isToast = true;
			if (payload) state.message = payload.message;
		});

		// updatePhoneNumber
		builder.addCase(updatePhoneNumberAction.pending, (state: any) => {
			state.isLoading = true;
			state.error = false;
		});
		builder.addCase(updatePhoneNumberAction.fulfilled, (state, { payload }: any) => {
			state.isLoading = false;
			state.error = false;
			state.isToast = true;
			state.message = payload.message;
		});
		builder.addCase(updatePhoneNumberAction.rejected, (state, { payload }: any) => {
			state.isLoading = false;
			state.error = true;
			state.isToast = true;
			if (payload) state.message = payload?.message;
		});

		// verifyNewPhoneNumberOTP
		builder.addCase(verifyNewPhoneNumberOtpAction.pending, (state: any) => {
			state.isLoading = true;
			state.error = false;
		});
		builder.addCase(verifyNewPhoneNumberOtpAction.fulfilled, (state, { payload }: any) => {
			state.isLoading = false;
			state.error = false;
			state.isToast = true;
			state.message = payload?.message;
		});
		builder.addCase(verifyNewPhoneNumberOtpAction.rejected, (state, { payload }: any) => {
			state.isLoading = false;
			state.error = true;
			state.isToast = true;
			if (payload) state.message = payload?.message;
		});

		// getNearByUsers
		builder.addCase(getNearByUsersAction.pending, (state: any) => {
			state.isLoading = true;
			state.error = false;
		});
		builder.addCase(getNearByUsersAction.fulfilled, (state, { payload }: any) => {
			state.isLoading = false;
			state.error = false;
			if (state.user)
				state.user = {
					...state.user,
					nearbyUsers: payload,
				};
		});
		builder.addCase(getNearByUsersAction.rejected, (state, { payload }: any) => {
			state.isLoading = false;
			state.error = true;
			state.isToast = true;
			if (payload) state.message = payload?.message;
		});

		// getDiscoveryUserPassionsAction
		builder.addCase(getDiscoveryUserPassionsAction.pending, (state: any) => {
			state.isLoading = true;
			state.error = false;
		});
		builder.addCase(getDiscoveryUserPassionsAction.fulfilled, (state, { payload }: any) => {
			state.isLoading = false;
			state.error = false;
			if (state.user)
				state.user = {
					...state.user,
					userSuperPassions: payload,
				};
		});
		builder.addCase(getDiscoveryUserPassionsAction.rejected, (state, { payload }: any) => {
			state.isLoading = false;
			state.error = true;
			state.isToast = true;
			if (payload) state.message = payload?.message;
		});

		// getUserDiscovery
		builder.addCase(getDiscoverySettingAction.pending, (state: any) => {
			state.isLoading = true;
			state.error = false;
		});
		builder.addCase(getDiscoverySettingAction.fulfilled, (state, { payload }: any) => {
			state.isLoading = false;
			state.error = false;
			if (state.user)
				state.user = {
					...state.user,
					discoverySetting: payload,
				};
		});
		builder.addCase(getDiscoverySettingAction.rejected, (state, { payload }: any) => {
			state.isLoading = false;
			state.error = true;
			state.isToast = true;
			if (payload) state.message = payload?.message;
		});

		// updateUserDiscovery
		builder.addCase(updateDiscoverySettingAction.pending, (state) => {
			state.isLoading = true;
			state.error = false;
		});
		builder.addCase(updateDiscoverySettingAction.fulfilled, (state) => {
			state.isLoading = false;
			state.error = false;
		});
		builder.addCase(updateDiscoverySettingAction.rejected, (state, { payload }: any) => {
			state.isLoading = false;
			state.error = true;
			if (payload) state.message = payload?.message;
		});
		// userLogout
		builder.addCase(authLogoutAction.fulfilled, (state) => {
			state.user = undefined;
			state.tokens = undefined;
			state.isLogin = false;
			state.isLoginVerified = false;
		});
		// getUserProfileMedias
		builder.addCase(getUserProfileMediaAction.pending, (state: any) => {
			state.isLoading = true;
			state.error = false;
		});
		builder.addCase(getUserProfileMediaAction.fulfilled, (state, { payload }: any) => {
			state.isLoading = false;
			state.error = false;
			if (state.user) state.user = { ...state.user, profileMedias: payload };
		});
		builder.addCase(getUserProfileMediaAction.rejected, (state, { payload }: any) => {
			state.isLoading = false;
			state.error = true;
			if (payload) state.message = payload?.message;
		});
		// verifyUserAction
		builder.addCase(verifyUserAction.pending, (state, { payload }: any) => {
			state.isLoading = true;
			state.error = false;
		});
		builder.addCase(verifyUserAction.fulfilled, (state, { payload }: any) => {
			state.isLoading = false;
			state.error = false;
			if (state.user)
				state.user = {
					...state.user,
					isVerified: true,
				};
		});
		builder.addCase(verifyUserAction.rejected, (state, { payload }: any) => {
			state.isLoading = false;
			state.error = true;
			state.isToast = true;
			if (payload) state.message = payload?.message;
		});
	},
});

export const { setIsToast } = userSlice.actions;

export default userSlice.reducer;
