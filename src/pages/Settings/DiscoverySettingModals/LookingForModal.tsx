import React from "react";
import { IonHeader, IonToolbar, IonButtons, IonTitle, IonContent, IonList, IonIcon } from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import CheckIcon from "../../../assets/icons/checkIcon";
import "../Settings.scss";

type Props = {
	dataList: Array<{ displayName: string; actualName: string }>;
	modalFooter: any;
	modalTitle: string;
	selectedValue?: string;
	onClose: () => void;
	updateUserInfo: (selectedValue: string) => void;
};

export const lookingForList = [
	{
		displayName: "Men",
		actualName: "male",
	},
	{
		displayName: "Women",
		showMe: "female",
	},
	{
		displayName: "Everyone",
		showMe: "everyone",
	},
];

const LookingForModal: React.FC<Props> = ({
	dataList = [],
	selectedValue,
	modalFooter = "",
	modalTitle = "",
	onClose,
	updateUserInfo,
}) => {
	return (
		<>
			<IonHeader className="header-custom">
				<IonToolbar className="toolbar-no-border">
					<IonButtons slot="start" onClick={onClose}>
						<IonIcon icon={chevronBack} color="primary" slot="icon-only" />
					</IonButtons>
					<IonTitle>
						<div className="title">{modalTitle}</div>
					</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<div className="list-items ion-margin-top">
					{dataList.map((data, index) => (
						<IonList className="list-items ion-padding" key={index} onClick={() => updateUserInfo(data?.actualName)}>
							{data?.displayName}
							{selectedValue === data?.actualName && <CheckIcon color="var(--ion-color-gold-shade)" />}
						</IonList>
					))}
				</div>
				{modalFooter}
			</IonContent>
		</>
	);
};

LookingForModal.defaultProps = {};

export default LookingForModal;
