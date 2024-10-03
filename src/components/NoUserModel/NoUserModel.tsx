import React from "react";
import { IonIcon, IonContent, IonToolbar, IonButtons, IonButton } from "@ionic/react";
import { close } from "ionicons/icons";
import "./NoUserModel.scss";

type Props = {
	onClose: () => void;
	onDisable: () => void;
};

const NoUserModel: React.FC<Props> = ({ onClose, onDisable }) => {
	return (
		<>
			<IonContent>
				<IonToolbar className="toolbar-no-border">
					<IonButtons slot="end" onClick={onDisable}>
						<IonIcon icon={close} slot="icon-only" />
					</IonButtons>
				</IonToolbar>
				<div className="user-content">
					<h2>There's no one new in your area.</h2>
					<h3>Expand your distance preferences to see more people.</h3>
				</div>
				<IonButton fill="solid" expand="block" shape="round" className={`ion-no-margin`} onClick={onClose}>
					Back to Discovery
				</IonButton>
			</IonContent>
		</>
	);
};

export default NoUserModel;
