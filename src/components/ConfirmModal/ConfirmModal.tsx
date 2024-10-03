import React from "react";
import { IonIcon, IonButton, IonText } from "@ionic/react";
import { close } from "ionicons/icons";
import "./ConfirmModal.scss";

type Props = {
	text: string;
	onSuccess: () => void;
	onClose: () => void;
};

const ConfirmModal: React.FC<Props> = ({ onSuccess, onClose, text }) => {
	return (
		<div>
			<div className="ac-header">
				<IonIcon icon={close} color="medium" size="large" onClick={onClose} />
			</div>
			<div className="ion-margin-top">
				<IonText>
					<p>{text}</p>
				</IonText>
			</div>
			<div className="ion-margin-vertical">
				<IonButton expand="block" fill="solid" shape="round" onClick={onSuccess}>
					YES
				</IonButton>
				<IonButton expand="block" fill="clear" shape="round" onClick={onClose}>
					NO
				</IonButton>
			</div>
		</div>
	);
};

ConfirmModal.defaultProps = {};

export default ConfirmModal;
