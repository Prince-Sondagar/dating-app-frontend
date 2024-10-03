import { IonButton, IonText } from "@ionic/react";
import { Dispatch, FC, SetStateAction } from "react";
import { VerifyUserStepsType } from "./Verified";

type Props = {
	onContinue: Dispatch<SetStateAction<VerifyUserStepsType>>;
};

const Retry: FC<Props> = ({ onContinue }) => {
	return (
		<div className="verified-page">
			<IonText className="ion-margin-vertical">
				<h2>Oops!</h2>
			</IonText>
			<div>
				<p>We were unable to capture your video. Please try to complete the process again.</p>
				<IonButton
					shape="round"
					fill="solid"
					expand="block"
					className="btnRetry"
					onClick={() => onContinue("capture-image")}
				>
					Retry
				</IonButton>
			</div>
		</div>
	);
};

export default Retry;
