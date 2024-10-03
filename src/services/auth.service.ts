import { Tokens, User } from "../store/reducers/user.reducer";
import API, { APISuccessResponse } from "../utils/axios";
import localStorage from "./localStorage.service";

type phoneLoginType = {
	phoneNumber: string;
	countryCode: string;
};

type verifyPhoneOtpType = {
	phoneNumber: string;
	otp: string;
};

class AuthService extends localStorage {
	static setUserAndTokens({ user, tokens }: { user?: User; tokens?: Tokens }) {
		if (user) this.setItem("user", user);
		if (tokens) this.setItem("tokens", tokens);
	}

	static async loginWithPhone(requestBody: phoneLoginType) {
		const { data } = await API.post<APISuccessResponse>("/auth/phone-login", requestBody);
		if (data.error) throw Error(data.message);
		return data.data;
	}

	static async verifyPhoneOTP(requestBody: verifyPhoneOtpType) {
		const { data } = await API.post<APISuccessResponse<Tokens>>("/auth/phone-login", requestBody);
		if (data.error) throw Error(data.message);
		this.setUserAndTokens({ tokens: data.data });
		return data.data;
	}
}

export default AuthService;
