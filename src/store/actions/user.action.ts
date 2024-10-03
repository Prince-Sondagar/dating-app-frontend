import { createAsyncThunk } from "@reduxjs/toolkit";
import API, { APISuccessResponse } from "../../utils/axios";
import { Tokens, User } from "../reducers/user.reducer";
import localStorage from "../../services/localStorage.service";
import Storage from "../../services/localStorage.service";

export const loginWithPhoneAction = createAsyncThunk<undefined, { countryCode: string; phoneNumber: string }>(
	"auth/phone-login",
	async (arg, thinkAPI) => {
		const { data, status } = await API.post<APISuccessResponse>("/auth/phone-login", arg);
		if (status !== 201) return thinkAPI.rejectWithValue(new Error(data.message || "Something is wrong here"));
		return thinkAPI.fulfillWithValue(data.data);
	},
);

export const loginAction = createAsyncThunk<APISuccessResponse, { email: string; password: string }>(
	"auth/login",
	async (arg, thinkAPI) => {
		try {
			const { data, status } = await API.post<APISuccessResponse, any>("/auth/login", arg);
			if (status !== 201) return thinkAPI.rejectWithValue(new Error(data.message || "Something is wrong here"));
			localStorage.setItem("tokens", data.data);
			await thinkAPI.dispatch(fetchUserAction());
			return thinkAPI.fulfillWithValue(data);
		} catch (error: any) {
			if (error.data.message) return thinkAPI.rejectWithValue(new Error(error.data.message || "Something went wrong"));
			return thinkAPI.rejectWithValue(new Error(error.message || "Something is wrong here"));
		}
	},
);

export const signUpAction = createAsyncThunk<
	APISuccessResponse,
	{ email: string; countryCode: string; phoneNumber: string; password: string }
>("auth/phone-otp-sent", async (arg, thinkAPI) => {
	try {
		const { data, status } = await API.post<APISuccessResponse, any>("/auth/phone-otp-sent", arg);
		if (status !== 201) return thinkAPI.rejectWithValue(new Error(data.message || "Something is wrong here"));
		return thinkAPI.fulfillWithValue(data);
	} catch (error: any) {
		if (error.data.message) return thinkAPI.rejectWithValue(new Error(error.data.message || "Something went wrong"));
		return thinkAPI.rejectWithValue(new Error(error.message || "Something is wrong here"));
	}
});

export const forgotPasswordAction = createAsyncThunk<APISuccessResponse, { email: string }>(
	"auth/forgot-password",
	async (arg, thinkAPI) => {
		try {
			const { data, status } = await API.post<APISuccessResponse, any>("/auth/forgot-password", arg);
			if (status !== 201) return thinkAPI.rejectWithValue(new Error(data.message || "Something is wrong here"));
			return thinkAPI.fulfillWithValue(data);
		} catch (error: any) {
			if (error.data.message) return thinkAPI.rejectWithValue(new Error(error.data.message || "Something went wrong"));
			return thinkAPI.rejectWithValue(new Error(error.message || "Something is wrong here"));
		}
	},
);

export const resetPasswordAction = createAsyncThunk<APISuccessResponse, { token: string, password: string }>(
	"auth/reset-password",
	async (arg, thinkAPI) => {
		try {
			const { data, status } = await API.put<APISuccessResponse, any>("/auth/reset-password", arg);
			if (status !== 201) return thinkAPI.rejectWithValue(new Error(data.message || "Something is wrong here"));
			return thinkAPI.fulfillWithValue(data);
		} catch (error: any) {
			if (error.data.message) return thinkAPI.rejectWithValue(new Error(error.data.message || "Something went wrong"));
			return thinkAPI.rejectWithValue(new Error(error.message || "Something is wrong here"));
		}
	},
);

export const verifyPhoneOtpAction = createAsyncThunk<APISuccessResponse, { otp: string; phoneNumber: string }>(
	"auth/phone-otp-verify",
	async (arg, thinkAPI) => {
		try {
			const { data, status } = await API.post<APISuccessResponse, any>("/auth/phone-otp-verify", arg);
			if (status !== 201) return thinkAPI.rejectWithValue(new Error(data.message || "Something is wrong here"));
			localStorage.setItem("tokens", data.data);
			await thinkAPI.dispatch(fetchUserAction());
			return thinkAPI.fulfillWithValue(data.data);
		} catch (error: any) {
			if (error.data.message) return thinkAPI.rejectWithValue(new Error(error.data.message || "Something went wrong"));
			return thinkAPI.rejectWithValue(new Error(error.message || "Something is wrong here"));
		}
	},
);

export const fetchUserAction = createAsyncThunk("user/me", async (_, thinkAPI) => {
	try {
		const { data, status } = await API.get<APISuccessResponse<User>>("/user/me");
		if (status !== 200) return thinkAPI.rejectWithValue(new Error(data.message || "Something is wrong here"));
		localStorage.setItem("user", data.data);
		return thinkAPI.fulfillWithValue(data.data);
	} catch (error: any) {
		// localStorage.removeItem("user");
		// localStorage.removeItem("tokens");
		if (error.response.data.message)
			return thinkAPI.rejectWithValue(new Error(error.response.data.message || "Please login first"));
		return thinkAPI.rejectWithValue(new Error(error.message || "Please login first"));
	}
});

export const saveUserOnboardingAction = createAsyncThunk(
	"user/update",
	async ({ values, setSubmitting }: any, thinkAPI) => {
		try {
			const {
				date,
				month,
				year,
				company,
				darkMode,
				school,
				showMyAge,
				showMyDistance,
				job,
				profileImages,
				avatar,
				passions,
				balancedRecommendations,
				recentlyActive,
				standard,
				onlyPeopleLiked,
				distanceType,
				...newYear
			} = values;
			const formData = new FormData();
			Object.entries(newYear).map(([key, value]: any) => {
				if (!value || !value.length || !Object.keys(value).length) return 0;
				formData.append(key, value);
				return null;
			});

			if (profileImages) for (const image of profileImages) formData.append("profileImages", image);
			if (passions?.length) {
				for (const passion of passions) formData.append("passions", passion);
			} else {
				formData.append("passions", "");
			}
			if (job) formData.append("job", job);
			if (school) formData.append("school", school);
			if (company) formData.append("company", company);
			if (showMyAge !== undefined) formData.append("showMyAge", showMyAge);
			if (showMyDistance !== undefined) formData.append("showMyDistance", showMyDistance);
			if (darkMode !== undefined) formData.append("darkMode", darkMode);
			if (balancedRecommendations !== undefined) formData.append("balancedRecommendations", balancedRecommendations);
			if (recentlyActive !== undefined) formData.append("recentlyActive", recentlyActive);
			if (standard !== undefined) formData.append("standard", standard);
			if (onlyPeopleLiked !== undefined) formData.append("onlyPeopleLiked", onlyPeopleLiked);
			if (distanceType) formData.append("distanceType", distanceType);
			year && month && date && formData.append("birthdate", new Date(year, month - 1, date).toString());
			formData.append("isCompOnboarding", "true");
			const { data, status } = await API.put<APISuccessResponse<{ user: User }>>("/user", formData);
			if (status !== 200) return thinkAPI.rejectWithValue(new Error(data.message));
			delete data.data.user.passions;
			localStorage.setItem("user", data.data.user);
			if (setSubmitting) setSubmitting(false);

			return thinkAPI.fulfillWithValue(data.data);
		} catch (error: any) {
			setSubmitting(false);
			if (error.response.data.message)
				return thinkAPI.rejectWithValue(new Error(error.response.data.message || "Please login first"));
			return thinkAPI.rejectWithValue(new Error(error.message || "Please login first"));
		}
	},
);

export const updatePhoneNumberAction = createAsyncThunk<
	APISuccessResponse,
	{ countryCode: string; phoneNumber: string }
>("auth/update-phone-number", async (arg, thinkAPI) => {
	try {
		const { data, status } = await API.post<APISuccessResponse>("/auth/update-phone-number", arg);
		if (status !== 201) return thinkAPI.rejectWithValue(new Error(data.message || "Something is wrong here"));
		return thinkAPI.fulfillWithValue(data);
	} catch (error: any) {
		if (error.response.data.message)
			return thinkAPI.rejectWithValue(new Error(error.response.data.message || "Something is wrong here"));
		return thinkAPI.rejectWithValue(new Error(error.message || "Something is wrong here"));
	}
});

export const verifyNewPhoneNumberOtpAction = createAsyncThunk<
	APISuccessResponse,
	{ countryCode: string; phoneNumber: string; otp: string }
>("auth/new-phone-otp-verify", async (arg, thinkAPI) => {
	try {
		const { data, status } = await API.post<APISuccessResponse>("/auth/new-phone-otp-verify", arg);
		if (status !== 201) return thinkAPI.rejectWithValue(new Error(data.message || "Something is wrong here"));
		thinkAPI.dispatch(fetchUserAction());
		return thinkAPI.fulfillWithValue(data);
	} catch (error: any) {
		if (error.response.data.message)
			return thinkAPI.rejectWithValue(new Error(error.response.data.message || "Something is wrong here"));
		return thinkAPI.rejectWithValue(new Error(error.message || "Something is wrong here"));
	}
});

export const getDiscoverySettingAction = createAsyncThunk<APISuccessResponse>(
	"user/discovery-setting",
	async (arg, thinkAPI) => {
		try {
			const { data, status } = await API.get<APISuccessResponse, any>("/user/discovery-setting");
			if (status !== 200) return thinkAPI.rejectWithValue(new Error(data.message || "Something is wrong here"));
			return thinkAPI.fulfillWithValue(data.data);
		} catch (error: any) {
			return thinkAPI.rejectWithValue(
				new Error((error.response.data.message ?? error.message) || "Something is wrong here"),
			);
		}
	},
);

export const updateDiscoverySettingAction = createAsyncThunk<APISuccessResponse, any>(
	"user/update-discovery-setting",
	async (arg, thinkAPI) => {
		try {
			const {
				agePref,
				latLong,
				childrens,
				communicationStyle,
				educationLevel,
				personalityType,
				receiveLove,
				vaccinated,
				zodiacSign,
				relationShipType,
				...rest
			} = arg;
			const formData = new FormData();
			if (latLong?.length) for (const cord of latLong) formData.append("latLong", cord);
			if (agePref?.length) for (const age of agePref) formData.append("agePref", age);
			if (relationShipType) for (const relation of relationShipType) formData.append("relationShipType", relation);
			if (rest?.distancePref) formData.append("distancePref", rest?.distancePref);
			if (childrens) formData.append("childrens", childrens);
			if (communicationStyle) formData.append("communicationStyle", communicationStyle);
			if (educationLevel) formData.append("educationLevel", educationLevel);
			if (personalityType) formData.append("personalityType", personalityType);
			if (receiveLove) formData.append("receiveLove", receiveLove);
			if (vaccinated) formData.append("vaccinated", vaccinated);
			if (zodiacSign) formData.append("zodiacSign", zodiacSign);
			const { data, status } = await API.post<APISuccessResponse, any>("/user/discovery-setting", arg);
			if (status !== 201) return thinkAPI.rejectWithValue(new Error(data.message || "Something is wrong here"));
			return thinkAPI.fulfillWithValue(data.data);
		} catch (error: any) {
			return thinkAPI.rejectWithValue(
				new Error((error.response.data.message ?? error.message) || "Something is wrong here"),
			);
		}
	},
);

export const getUserProfileMediaAction = createAsyncThunk<APISuccessResponse>(
	"user/profile-media",
	async (arg, thinkAPI) => {
		try {
			const { data, status } = await API.get<APISuccessResponse, any>("/profile-medias");
			if (status !== 200) return thinkAPI.rejectWithValue(new Error(data.message || "Something is wrong here"));
			return thinkAPI.fulfillWithValue(data.data);
		} catch (error: any) {
			return thinkAPI.rejectWithValue(
				new Error((error.response.data.message ?? error.message) || "Something is wrong here"),
			);
		}
	},
);

export const getNearByUsersAction = createAsyncThunk<APISuccessResponse, { passion: string }>(
	"user/nearby",
	async (arg, thinkAPI) => {
		try {
			const { data } = await API.post<APISuccessResponse, any>(`/user/nearby`, arg);
			return thinkAPI.fulfillWithValue(data.data);
		} catch (error: any) {
			return thinkAPI.rejectWithValue(
				new Error((error.response.data.message ?? error.message) || "Something is wrong here"),
			);
		}
	},
);

export const getDiscoveryUserPassionsAction = createAsyncThunk<APISuccessResponse>(
	"user/super-passion",
	async (arg, thinkAPI) => {
		try {
			const { data, status } = await API.get<APISuccessResponse, any>(`/user/super-passion`);
			if (status !== 200) return thinkAPI.rejectWithValue(new Error(data.message || "Something is wrong here"));
			return thinkAPI.fulfillWithValue(data.data);
		} catch (error: any) {
			return thinkAPI.rejectWithValue(
				new Error((error.response.data.message ?? error.message) || "Something is wrong here"),
			);
		}
	},
);

export const setUserInterestAction = createAsyncThunk<APISuccessResponse, { arg: any; type: string }>(
	"userinterest",
	async ({ arg, type }, thinkAPI) => {
		try {
			const { data, status } = await API.post<APISuccessResponse>(`/userinterest/${type}`, arg);
			if (status !== 201) return thinkAPI.rejectWithValue(new Error(data.message || "Something is wrong here"));
			return thinkAPI.fulfillWithValue(data);
		} catch (error: any) {
			if (error.response.data.message)
				return thinkAPI.rejectWithValue(new Error(error.response.data.message || "Something is wrong here"));
			return thinkAPI.rejectWithValue(new Error(error.message || "Something is wrong here"));
		}
	},
);

export const removeUserProfileMediaAction = createAsyncThunk<APISuccessResponse, { profileMediaIds: string }>(
	"user/remove-profile-media",
	async (arg, thinkAPI) => {
		try {
			const { profileMediaIds } = arg;
			const { data, status } = await API.delete<APISuccessResponse, any>(`/profile-medias/${profileMediaIds}`);
			if (status !== 200) return thinkAPI.rejectWithValue(new Error(data.message || "Something is wrong here"));
			return thinkAPI.fulfillWithValue(data.data);
		} catch (error: any) {
			return thinkAPI.rejectWithValue(
				new Error((error.response.data.message ?? error.message) || "Something is wrong here"),
			);
		}
	},
);

export const authLogoutAction = createAsyncThunk<{}>("user/logout", async (arg, thinkAPI) => {
	Storage.clear();
	return thinkAPI.fulfillWithValue({});
});

export const verifyUserAction = createAsyncThunk<{}, { avatar: Blob }>("user/verify-me", async (arg, thinkAPI) => {
	try {
		const { data, status } = await API.postForm<APISuccessResponse>(`/user/get-verified`, arg);
		if (status !== 201) return thinkAPI.rejectWithValue(new Error(data.message || "Something is wrong here"));
		return thinkAPI.fulfillWithValue({});
	} catch (error: any) {
		return thinkAPI.rejectWithValue(
			new Error((error.response.data.message ?? error.message) || "Something is wrong here"),
		);
	}
});
