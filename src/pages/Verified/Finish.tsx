import { IonButton } from "@ionic/react";
import { Dispatch, FC, SetStateAction } from "react";
import { VerifyUserStepsType } from "./Verified";

type Props = {
	onContinue: Dispatch<SetStateAction<VerifyUserStepsType>>;
};

const Finish: FC<Props> = ({ onContinue }) => {
	return (
		<div className="verified-page confirmImg ion-align-items-center">
			<div>
				<img src="assets/img/profile/verified.png" width={50} alt="verify" />
				<h5>Thanks for verify your account</h5>
			</div>
			<IonButton shape="round" fill="solid" expand="block" className="btnContinue" onClick={() => onContinue("finish")}>
				Finish
			</IonButton>
		</div>
	);
};

export default Finish;
