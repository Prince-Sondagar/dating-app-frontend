import { IonButton, IonIcon, IonLabel, IonText } from "@ionic/react";
import { checkmarkCircle } from "ionicons/icons";
import { Dispatch, FC, SetStateAction } from "react";
import { VerifyUserStepsType } from "./Verified";

const listData = [
	{
		title: "Prep your lighting",
		listItems: ["Choose a well-lit environment", "Turn up your brightness", "Avoid harsh glare and backlighting"],
	},
	{ title: "Show your face", listItems: ["Face the camera directly", "Remove hats, sunglasses, and face coverings"] },
];

type Props = {
	onContinue: Dispatch<SetStateAction<VerifyUserStepsType>>;
};

const BeforeYouContinue: FC<Props> = ({ onContinue }) => {
	return (
		<div className="verified-page">
			<IonText className="ion-margin-vertical">
				<h2>'Before you continue...</h2>
			</IonText>
			<div>
				<div className="ion-padding-bottom">
					{listData.map((item, key) => (
						<div key={key} className="ion-text-left list-items-con">
							<div className="flex">
								<IonIcon icon={checkmarkCircle} slot="icon-only" /> <h6>{item.title}</h6>
							</div>
							<div className="list-items">
								{item.listItems.map((items, key) => (
									<IonLabel key={key}>{items}</IonLabel>
								))}
							</div>
						</div>
					))}
				</div>
				<IonButton shape="round" fill="solid" expand="block" onClick={() => onContinue("capture-image")}>
					Continue
				</IonButton>
			</div>
		</div>
	);
};

export default BeforeYouContinue;
