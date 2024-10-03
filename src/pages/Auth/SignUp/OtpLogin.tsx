import React, { useState } from "react";
import { Link } from "react-router-dom";
import OtpInput from "react-otp-input";
import { IonLoading, IonText } from "@ionic/react";
import { SignUpTypes } from "./SignUp";

type Props = {
	otpModel: SignUpTypes;
	isLoading: boolean;
	phoneNumber:string;
	onChangeInput: (inputValues: { name: string; value: string | boolean }) => void;
	onClose: () => void;
	handleSubmit: () => void;
	setOTPModel: (arg: any) => void;
};

const OtpLogin: React.FC<Props> = ({ isLoading, handleSubmit, otpModel, onChangeInput, setOTPModel, phoneNumber }) => {
	const [errorMessage, setErrorMessage] = useState("");

	const onUpdateContactClick = async () => {
		onChangeInput({ name: "isOtpSent", value: false });
	};

	return (
		<div className="otp-content">
			{(otpModel.otp.toString().length >= 6 && isLoading) && <IonLoading isOpen={true} message={"Verify..."} />}
			<div className="move-modal"></div>
			<div className="otp-desc">
				<IonText className="text-lg otp-title">We have sent a verification code to:</IonText>
				<IonText className="text-lg text-color-primary">+{phoneNumber}</IonText>
				<IonText className="otp-continue">Please enter the code to continue</IonText>
			</div>
			<div className="flex al-center jc-between change-contact">
				<IonText className="not-number">Not your phone number?</IonText>
				<IonText onClick={onUpdateContactClick} className="text-color-primary">
					Change it here
				</IonText>
			</div>
			<div className="otp-sect">
				<OtpInput
					numInputs={6}
					renderSeparator={<span></span>}
					value={otpModel.otp}
					onChange={(event) => setOTPModel({ ...otpModel, otp: event })}
					renderInput={(props) => <input {...props} />}
					containerStyle={{ justifyContent: "space-between", margin: "12px 0" }}
				/>
			</div>
			<div className="ion-text-right resend-code">
				<p onClick={handleSubmit} className="text-color-primary">
					Resend code
				</p>
			</div>
			<IonText className="text-sm text-err">{errorMessage}</IonText>
			<div className="ion-text-center otp-footer">
				Message and data rates may apply. The verified phone number can be used to login.
				<Link to="#" className="text-color-primary">
					{" "}
					Learn what happens when your phone number changes
				</Link>
			</div>
		</div>
	);
};

OtpLogin.defaultProps = {};

export default OtpLogin;
