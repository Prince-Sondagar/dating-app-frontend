import React, { useState } from "react";
import {
	IonHeader,
	IonToolbar,
	IonButtons,
	IonModal,
	IonTitle,
	IonContent,
	IonList,
	IonListHeader,
	IonLabel,
	IonItem,
	IonNote,
	IonIcon,
} from "@ionic/react";
import { chevronBack, checkmark } from "ionicons/icons";
import EditPhoneNumber from "../EditPhoneNumber/EditPhoneNumber";
import useAuth from "../../../hooks/useAuth";

export interface PhoneNumberType {
	countryCode: string;
	phoneNumber: string;
}

export type PhoneModelTypes = {
	isOpen: boolean;
	isOtpSent: boolean;
	isResendOtp: boolean;
	otp: number | null;
	phoneNumber: PhoneNumberType;
};

type Props = {
	onClose: () => void;
};

const initState: PhoneModelTypes = {
	isOpen: false,
	isOtpSent: false,
	isResendOtp: false,
	otp: null,
	phoneNumber: { countryCode: "", phoneNumber: "" },
};

const PhoneNumber: React.FC<Props> = ({ onClose }) => {
	const { user } = useAuth();

	const [phoneModel, setPhoneModel] = useState<PhoneModelTypes>(initState);
	const [isEditPhoneNumber, setIsEditPhoneNumber] = useState(false);

	const onChangeInput = ({ name, value }: { name: string; value: string | PhoneNumberType | boolean }) => {
		setPhoneModel({ ...phoneModel, [name]: value });
	};

	const onPhoneNumberModelClose = () => {
		setIsEditPhoneNumber(false);
		setPhoneModel({ ...initState });
	};

	return (
		<>
			<IonHeader className="header-custom">
				<IonToolbar className="toolbar-no-border">
					<IonButtons slot="start" onClick={onClose}>
						<IonIcon icon={chevronBack} color="primary" slot="icon-only" />
					</IonButtons>
					<IonTitle>
						<div className="title">Account</div>
					</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList className="list-custom">
					<IonListHeader>
						<IonLabel>Phone Number</IonLabel>
					</IonListHeader>
					<IonItem>
						<IonLabel>+{user?.mobile}</IonLabel>
						<IonNote slot="end">{user?.isValidMobile && <IonIcon icon={checkmark} color="secondary" />}</IonNote>
					</IonItem>
					<IonListHeader>
						<IonLabel>Verified Phone Number</IonLabel>
					</IonListHeader>
					<IonItem onClick={() => setIsEditPhoneNumber(true)}>
						<IonLabel color="primary">Update My Phone Number</IonLabel>
					</IonItem>
				</IonList>
			</IonContent>

			<IonModal isOpen={isEditPhoneNumber} onDidDismiss={onPhoneNumberModelClose}>
				<EditPhoneNumber onClose={onPhoneNumberModelClose} phoneModel={phoneModel} onChangeInput={onChangeInput} />
			</IonModal>
		</>
	);
};

PhoneNumber.defaultProps = {};

export default PhoneNumber;
