import { IonButton, IonText } from "@ionic/react";
import { Dispatch, FC, SetStateAction } from "react";
import { VerifyUserStepsType } from "./Verified";

type Props = {
	onContinue: Dispatch<SetStateAction<VerifyUserStepsType>>;
};

const GetVerified: FC<Props> = ({ onContinue }) => {
	return (
		<div className="verified-page">
			<img src="assets/img/profile/verified.png" alt="verify" />
			<IonText className="ion-margin-vertical">
				<h2>Get Verified</h2>
			</IonText>
			<div>
				<p>
					Help us protect the TradLife community by showing that you're the person in your profile. All you need to do is
					take a video selfie. If your video selfie matches the photos in your profile, boom, you're verified!
				</p>
				<IonButton
					shape="round"
					fill="solid"
					expand="block"
					className="btnContinue"
					onClick={() => onContinue("how-it-works")}
				>
					Continue
				</IonButton>
			</div>
		</div>
	);
};

export default GetVerified;
