import React, { useState } from "react";
import {
	IonButtons,
	IonContent,
	IonHeader,
	IonIcon,
	IonInput,
	IonItem,
	IonLabel,
	IonList,
	IonText,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import useUser from "../../hooks/useUser";
import "./WebProfileModel.scss";

type Props = {
	onClose: () => any;
	user: any;
};

const WebProfileModel: React.FC<Props> = ({ onClose, user }) => {
	const { updateUserInfo } = useUser();
	const [username, setUsername] = useState("");
	const handleClickOnControlProfile = async (key: string, value: string) => {
		await updateUserInfo({ [key]: value });
	};
	return (
		<>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Account</IonTitle>
					<IonButtons slot="start" onClick={onClose}>
						<IonIcon icon={chevronBack} slot="icon-only" />
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList>
					<div className="ion-margin-top">
						<IonText>
							<h5>Username</h5>
						</IonText>
						<IonItem detail={false} lines="none">
							<IonInput
								name="username"
								placeholder="Usermame"
								onIonChange={(e: any) => setUsername(e.target.value)}
								value={`${username ? username : user?.firstname}`}
							/>
						</IonItem>
					</div>
				</IonList>
				<IonList>
					<div className="ion-margin-top">
						<IonItem lines="none">
							<IonLabel
								color={username?.length > user?.firstname?.length ? "primary" : "var(--ion-text-dark-color)"}
								onClick={() => {
									handleClickOnControlProfile("firstname", username);
									onClose();
								}}
							>
								Confirm
							</IonLabel>
						</IonItem>
						<IonItem lines="none" className="delete-item">
							<IonLabel color={"primary"}>Delete</IonLabel>
						</IonItem>
					</div>
				</IonList>
			</IonContent>
		</>
	);
};

export default WebProfileModel;
