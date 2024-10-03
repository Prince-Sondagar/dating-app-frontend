import React from "react";
import {
	IonHeader,
	IonButton,
	IonContent,
	IonText,
	IonList,
	IonListHeader,
	IonLabel,
	IonIcon,
} from "@ionic/react";
import { close } from "ionicons/icons";
import useOnboarding from "../../hooks/useOnboarding";
import "./Passions.scss";

type Props = {
	handlePassionsChange: (id: string) => void;
	selectedPassions?: string[];
	onClose: () => void;
};

const Passions: React.FC<Props> = ({ handlePassionsChange, selectedPassions, onClose }) => {
	const { passions } = useOnboarding();

	return (
		<>
			<IonHeader className="pass-toolbar">
				<IonText className="font-dosis">Passions</IonText>
				<IonIcon icon={close} onClick={onClose} />
			</IonHeader>
			<IonContent className="passions-page bg-light">
				<div className="ion-padding">
					<IonText className="passion-desc">Select passions that you'd like to share. Choose a minimum of 3.</IonText>
				</div>
				<IonList className="list-custom passion-list">
					<IonListHeader>
						<IonLabel className="font-dosis">Passions</IonLabel>
						<IonText color="medium" className="tag-count">
							({selectedPassions?.length}/5)
						</IonText>
					</IonListHeader>
					<div className="ion-padding">
						{passions?.map((passion, index) => {
							const isSelectedPassion = !!selectedPassions?.find((selectedPassion) => selectedPassion === passion.id);
							return (
								<IonButton
									key={index}
									shape="round"
									fill="outline"
									size="small"
									className={isSelectedPassion ? "selected-passion" : ""}
									onClick={() => handlePassionsChange(passion.id)}
								>
									{passion?.passion}
								</IonButton>
							);
						})}
					</div>
				</IonList>
			</IonContent>
		</>
	);
};

Passions.defaultProps = {};

export default Passions;
