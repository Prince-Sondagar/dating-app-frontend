import React, { useState } from "react";
import {
	IonHeader,
	IonToolbar,
	IonButtons,
	IonTitle,
	IonContent,
	IonIcon,
	IonText,
	IonLabel,
	IonItem,
	IonNote,
	IonList,
	IonModal,
	IonButton,
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import HelpIcon from "../../../assets/icons/helpIcon";
import UserSubscription from "../../../hooks/userSubscription";
import SubscriptionModal from "./SubscriptionModal";
import CardDetails from "../../../components/CardDetails/CardDetails";

type Props = {
	onClose: () => void;
	subscriptionDetail: any;
	cardDetails: any;
};

const ManagePaymentAcModal: React.FC<Props> = ({ onClose, subscriptionDetail, cardDetails }) => {
	const { subscription } = UserSubscription();
	const [subscriptionVisible, setSubscriptionVisible] = useState<boolean>(false);
	const [openCardModel, setCardModel] = useState(false);
	const [cards, setCards] = useState();
	const [selectedValue, setSelectedValue] = useState("");

	const accountData = [
		{
			name: "Your Subscriptions",
			img: true,
			title: `TradLife ${subscription?.subscriptionDetail?.subscriptionDetail?.type}®`,
			desc: "",
			button: true,
			detail: true,
			onClick: () => setSubscriptionVisible(true),
		},
		{
			name: "Email Address",
			img: false,
			title: "Email",
			desc: "developer.milankoladiya@gmail.com",
			button: false,
			detail: true,
		},
		{ name: "Contact Us", img: false, title: "Help", desc: <HelpIcon />, button: false, detail: false },
	];

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
					{!cardDetails?.length ? (
						<IonText>
							<h3>You have no cards saved. To add a card, make a purchase.</h3>
						</IonText>
					) : (
						<div className="ion-margin-top">
							<IonText>
								<h5>Manage Your Card</h5>
							</IonText>
							<IonItem detail={true} lines="none">
								<IonLabel onClick={() => setCardModel(true)}>Cards</IonLabel>
							</IonItem>
						</div>
					)}
				</IonList>
				<>
					{subscription?.subscriptionDetail?.subStatus === "active" ? (
						<IonList>
							{accountData?.map((info) => (
								<div key={info?.name} className="ion-margin-top">
									<IonText>
										<h5>{info?.name}</h5>
									</IonText>
									<IonItem detail={info?.detail} lines="none" onClick={info?.onClick}>
										<IonLabel>
											{info?.img && <img src="assets/img/logo_small.png" width={16} height={16} alt="" />}
											{info?.title}
										</IonLabel>
										<IonNote slot="end">{info?.desc}</IonNote>
									</IonItem>
									{info?.button && (
										<IonButton expand="block" className="ion-margin">
											Cancel
										</IonButton>
									)}
								</div>
							))}
						</IonList>
					) : (
						<IonList>
							<div className="ion-margin-top">
								<IonText>
									<h5>Contact us</h5>
								</IonText>
								<IonItem detail={true} lines="none">
									<IonLabel>Help</IonLabel>
									<IonNote>
										<HelpIcon />
									</IonNote>
								</IonItem>
							</div>
						</IonList>
					)}
				</>
				<IonText>
					<h6>Get answers to any of your questions about your purchases or payments.</h6>
				</IonText>

				<IonModal
					isOpen={subscriptionVisible}
					onDidDismiss={() => setSubscriptionVisible(false)}
					className="manage-ac-model"
				>
					<SubscriptionModal onClose={() => setSubscriptionVisible(false)} subscriptionDetail={subscriptionDetail} />
				</IonModal>
				<IonModal isOpen={openCardModel} onDidDismiss={() => setCardModel(false)} className="manage-ac-model">
					<IonHeader>
						<IonToolbar>
							<IonTitle>Card Details</IonTitle>
							<IonButtons slot="start" onClick={onClose}>
								<IonIcon icon={chevronBack} slot="icon-only" />
							</IonButtons>
						</IonToolbar>
					</IonHeader>
					<CardDetails setSelectedValue={setSelectedValue} cards={cardDetails} setCards={setCards} />
				</IonModal>
			</IonContent>
		</>
	);
};

ManagePaymentAcModal.defaultProps = {};

export default ManagePaymentAcModal;
