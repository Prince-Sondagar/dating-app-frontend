import React, { useState } from "react";
import { IonContent, IonButton, useIonToast } from "@ionic/react";
import GetVerified from "./GetVerified";
import HowItWorks from "./HowItWorks";
import BeforeYouContinue from "./BeforeContinue";
import Retry from "./Retry";
import CaptureImage from "./CaptureImage";
import ConfirmImage from "./ConfirmImage";
import Finish from "./Finish";
import "./Verified.scss";
import useUser from "../../hooks/useUser";
import { verifyUserAction } from "../../store/actions/user.action";

type Props = {
	onClose: () => void;
};

export type VerifyUserStepsType =
	| "get-verified"
	| "how-it-works"
	| "before-continue"
	| "capture-image"
	| "confirm-image"
	| "finish"
	| "retry";

const Verified: React.FC<Props> = ({ onClose }) => {
	const { verifyUser } = useUser();
	const [verifyUserSteps, setVerifyUserSteps] = useState<VerifyUserStepsType>("get-verified");
	const [userAvatar, setUserAvatar] = useState<Blob | any>();
	const [present] = useIonToast();

	const onCaptureImage = (file?: Blob) => {
		if (!file) setVerifyUserSteps("retry");
		else {
			setUserAvatar(file);
			setVerifyUserSteps("confirm-image");
		}
	};

	const onConfirmImage = async (file?: string) => {
		if (!file) setVerifyUserSteps("capture-image");
		else {
			present({ message: "Checking user image...", duration: 3000 });
			const file = new File([userAvatar], "user-image.png", { type: userAvatar.type });
			const { type } = await verifyUser({ avatar: file });
			if (type !== verifyUserAction.rejected.type) setVerifyUserSteps("finish");
		}
	};

	return (
		<IonContent forceOverscroll={false} scrollY={false} className="bg-light ion-text-center">
			{verifyUserSteps === "get-verified" && <GetVerified onContinue={setVerifyUserSteps} />}
			{verifyUserSteps === "how-it-works" && <HowItWorks onContinue={setVerifyUserSteps} />}
			{verifyUserSteps === "before-continue" && <BeforeYouContinue onContinue={setVerifyUserSteps} />}
			{verifyUserSteps === "capture-image" && <CaptureImage onContinue={onCaptureImage} />}
			{verifyUserSteps === "confirm-image" && <ConfirmImage file={userAvatar ? URL.createObjectURL(userAvatar) : ""} onContinue={onConfirmImage} />}
			{verifyUserSteps === "finish" && <Finish onContinue={onClose} />}
			{verifyUserSteps === "retry" && <Retry onContinue={setVerifyUserSteps} />}
			{verifyUserSteps === "get-verified" ||
				verifyUserSteps === "how-it-works" ||
				verifyUserSteps === "before-continue" ? (
				<IonButton shape="round" fill="outline" expand="block" className="ion-margin-top btnMayBe" onClick={onClose}>
					Maybe Later
				</IonButton>
			) : (
				""
			)}
		</IonContent>
	);
};

Verified.defaultProps = {};

export default Verified;
