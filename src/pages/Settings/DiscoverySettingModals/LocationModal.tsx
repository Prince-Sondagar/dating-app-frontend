import React from "react";
import {
	IonHeader,
	IonToolbar,
	IonButtons,
	IonTitle,
	IonContent,
	IonIcon,
	IonText,
	IonButton,
	IonLabel,
} from "@ionic/react";
import { location } from "ionicons/icons";
import { User } from "../../../store/reducers/user.reducer";
import CheckIcon from "../../../assets/icons/checkIcon";
import "../../../pages/Settings/Settings.scss";

type Props = {
	onClose: () => void;
	user?: User;
};

const LocationModal: React.FC<Props> = ({ onClose, user }) => {
	return (
		<>
			<IonHeader>
				<IonToolbar className="toolbar-no-border">
					<IonTitle>Location</IonTitle>
					<IonButtons slot="end">
						<IonButton color="primary" onClick={onClose}>
							Done
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonText>
					<h3>Current Location</h3>
				</IonText>
				<div className="curr-location flex ion-justify-content-between">
					<div className="flex loc-content">
						<IonIcon icon={location} />
						<div className="ion-margin-horizontal">
							<IonText>
								<h6>My Current Location</h6>
							</IonText>
							<IonLabel>{user?.discoverySetting?.location}</IonLabel>
						</div>
					</div>
					<CheckIcon color="#2b86f9" />
				</div>
				<IonButton expand="block">
					<img src="assets/img/airplane.png" alt="check" />{" "}
					<IonLabel className="ion-margin-start">Add New Location</IonLabel>
				</IonButton>
			</IonContent>
		</>
	);
};

LocationModal.defaultProps = {};

export default LocationModal;
