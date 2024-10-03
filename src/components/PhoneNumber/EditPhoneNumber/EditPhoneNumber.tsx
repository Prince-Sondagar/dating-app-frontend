import React, { useState } from "react";
import PhoneInput, { CountryData } from "react-phone-input-2";
import OtpInput from "react-otp-input";
import { IonIcon, IonLabel, IonText, IonButton } from "@ionic/react";
import { close } from "ionicons/icons";
import { PhoneModelTypes, PhoneNumberType } from "../ViewPhoneNumber/ViewPhoneNumber";
import useAuth from "../../../hooks/useAuth";
import { updatePhoneNumberAction, verifyNewPhoneNumberOtpAction } from "../../../store/actions/user.action";
import TradLifeIcon from "../../../assets/icons/tradlifeIcon";

type Props = {
	phoneModel: PhoneModelTypes;
	onChangeInput: (inputValues: { name: string; value: string | PhoneNumberType | boolean }) => void;
	onClose: () => void;
};

const EditPhoneNumber: React.FC<Props> = ({ phoneModel, onChangeInput, onClose }) => {
	const {
		phoneNumber: { countryCode, phoneNumber },
	} = phoneModel;
	const [otp, setOtp] = useState("");
	const { updatePhoneNumber, verifyNewPhoneNumberOtp } = useAuth();

	const onSubmitClick = async () => {
		try {
			if (!phoneModel.isOtpSent) {
				const { type } = await updatePhoneNumber({ countryCode, phoneNumber });
				if (type !== updatePhoneNumberAction.rejected.type) onChangeInput({ name: "isOtpSent", value: true });
			} else {
				const { type } = await verifyNewPhoneNumberOtp({ otp, phoneNumber, countryCode });
				if (type !== verifyNewPhoneNumberOtpAction.rejected.type) {
					onChangeInput({ name: "isOtpSent", value: false });
					onClose();
				}
			}
		} catch (error: any) {
			console.log("error", error);
		}
	};

	const onResendClick = async () => {
		try {
			await updatePhoneNumber({ countryCode, phoneNumber });
		} catch (error: any) {}
	};

	const onUpdateContactClick = async () => {
		onChangeInput({ name: "isOtpSent", value: false });
	};

	return (
		<div className="modal-new-account ion-padding">
			<div className="ac-header">
				<div style={{ margin: "auto" }}>
					<TradLifeIcon color="var(--ion-color-gold-shade)" />
				</div>
				<IonIcon icon={close} color="medium" size="large" onClick={onClose} />
			</div>
			<IonText className="text-lg ion-text-center">
				{phoneModel.isOtpSent ? "Enter OTP" : "Edit your mobile number"}{" "}
			</IonText>
			{phoneModel.isOtpSent && (
				<div className="otp-wrap">
					<div className="otp-title">
						<IonLabel>+{phoneNumber}</IonLabel>
						<p onClick={onResendClick}>Resend</p>
					</div>
					<div className="otp-sect">
						<OtpInput
							numInputs={6}
							renderSeparator={<span />}
							value={otp}
							onChange={setOtp}
							renderInput={(props) => <input {...props} />}
							containerStyle={{ justifyContent: "space-between", margin: "12px 0" }}
						/>
					</div>
					<p onClick={onUpdateContactClick}>Update Contact Info</p>
				</div>
			)}
			{!phoneModel.isOtpSent && (
				<div>
					<PhoneInput
						country={"in"}
						onChange={(value: string, country: CountryData) =>
							onChangeInput({ name: "phoneNumber", value: { countryCode: country.dialCode, phoneNumber: value } })
						}
					/>
					<IonLabel className="ion-padding">
						When you tap "Continue", TradLife will send a text with verification code. Message and data rates may apply.
						The verified phone number can be used to login.
						<span> Learn what happens when your number changes.</span>
					</IonLabel>
				</div>
			)}
			<div className="btn-continue ion-margin-vertical">
				<IonButton shape="round" disabled={phoneModel.isOtpSent ? otp.length !== 6 : false} onClick={onSubmitClick}>
					Continue
				</IonButton>
			</div>
		</div>
	);
};

EditPhoneNumber.defaultProps = {};

export default EditPhoneNumber;
