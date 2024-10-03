import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { UserState, setIsToast } from "../store/reducers/user.reducer";
import { useIonToast } from "@ionic/react";
import {
	loginAction,
	signUpAction,
	forgotPasswordAction,
	resetPasswordAction,
	loginWithPhoneAction,
	verifyPhoneOtpAction,
	updatePhoneNumberAction,
	verifyNewPhoneNumberOtpAction,
	authLogoutAction,
} from "../store/actions/user.action";
import { SocketContext } from "../contexts/socketContext";

const useAuth = () => {
	const { user, isLoading, isLogin, isToast, message } = useSelector<RootState, UserState>(
		(state) => state.user,
	);
	const [unSeededMessages, setUnSeededMessages] = useState<number>();

	const { socketClient } = useContext(SocketContext);

	useEffect(() => {
		if (!socketClient) return;
		socketClient?.on("unseen-message-count", setUnSeededMessages);
	}, [socketClient]);

	const dispatch = useDispatch();
	const [present] = useIonToast();

	const sendOtp = (body: { countryCode: string; phoneNumber: string }) => {
		return dispatch<any>(loginWithPhoneAction(body));
	};

	const verifyOtp = async (body: { otp: string; countryCode: string; phoneNumber: string, email:string, password:string }) => {
		return dispatch<any>(verifyPhoneOtpAction(body));
	};

	const login = async (body: { email: string; password: string; }) => {
		return dispatch<any>(loginAction(body));
	};

	const signUp = async (body: { email: string; countryCode: string; phoneNumber:string; password:string }) => {
		return dispatch<any>(signUpAction(body));
	};

	const forgotPassword =async (body:{email: string}) => {
		return dispatch<any>(forgotPasswordAction(body));
	}

	const resetPassword =async (body:{ token: string, password: string}) => {
		return dispatch<any>(resetPasswordAction(body));
	}

	const updatePhoneNumber = async (body: { countryCode: string; phoneNumber: string }) => {
		return dispatch<any>(updatePhoneNumberAction(body));
	};

	const verifyNewPhoneNumberOtp = async (body: { countryCode: string; phoneNumber: string; otp: string }) => {
		return dispatch<any>(verifyNewPhoneNumberOtpAction(body));
	};

	const authLogout = async () => {
		dispatch<any>(authLogoutAction());
		socketClient?.close();
	};

	useEffect(() => {
		if (isToast)
			present({
				message,
				duration: 3000,
				position: "bottom",
				onDidDismiss: () => {
					dispatch<any>(setIsToast({ isToast: false }));
				},
			});
	}, [isToast, present, message]);

	return {
		isLoading,
		isLogin,
		user,
		unSeededMessages,
		sendOtp,
		verifyOtp,
		login,
		signUp,
		forgotPassword,
		resetPassword,
		updatePhoneNumber,
		verifyNewPhoneNumberOtp,
		authLogout,
	};
};

export default useAuth;
