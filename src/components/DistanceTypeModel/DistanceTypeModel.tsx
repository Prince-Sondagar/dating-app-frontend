import React from "react";
import {
	IonButtons,
	IonContent,
	IonHeader,
	IonIcon,
	IonItem,
	IonLabel,
	IonList,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import CheckIcon from "../../assets/icons/checkIcon";
import useUser from "../../hooks/useUser";

type Props = {
	onClose: () => any;
};

const DistanceTyoeModel: React.FC<Props> = ({ onClose }) => {
	const { user, updateUserInfo, getNearbyUsers } = useUser();

	const handleClickOnControlProfile = async (key: string, value: string) => {
		await updateUserInfo({ [key]: value });
		await getNearbyUsers("");
	};
	return (
		<>
			<IonHeader className="header-custom">
				<IonToolbar className="toolbar-no-border">
					<IonButtons slot="start" onClick={onClose}>
						<IonIcon icon={chevronBack} color="primary" slot="icon-only" />
					</IonButtons>
					<IonTitle>
						<div className="title">Show Distance in</div>
					</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<div style={{ marginTop: "10px" }}>
					<IonList className="list-custom">
						<IonItem lines="full" onClick={() => handleClickOnControlProfile("distanceType", "miles")}>
							<IonLabel>Miles</IonLabel>
							{user?.distanceType === "miles" && <CheckIcon color="#2b86f9" />}
						</IonItem>
						<IonItem lines="full" onClick={() => handleClickOnControlProfile("distanceType", "km")}>
							<IonLabel>Kilometers</IonLabel>
							{user?.distanceType === "km" && <CheckIcon color="#2b86f9" />}
						</IonItem>
					</IonList>
				</div>
			</IonContent>
		</>
	);
};

export default DistanceTyoeModel;
