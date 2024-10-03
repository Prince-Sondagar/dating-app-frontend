import { IonCard, IonCardContent, IonCheckbox, IonIcon, IonModal } from "@ionic/react";
import { trash } from 'ionicons/icons';
import { useEffect, useState } from "react";
import UserSubscription from "../../hooks/userSubscription";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import "./CardDetails.scss";

type Props = {
	setSelectedValue: (i: string) => void;
	cards: any;
	setCards: (i: any) => void;
};

const CardDetails: React.FC<Props> = ({ setSelectedValue, cards, setCards }) => {
	const { subscription, getUserPaymentMethods, setDefaultCard, deleteUserSavedCard } = UserSubscription();
	const [confirmVisible, setConfirmVisible] = useState<{ name: string; text: string; open: boolean }>({
		name: "",
		text: "",
		open: false,
	});
	const [paymentId, setPaymentId] = useState("");

	const handleClcik = async () => {
		confirmVisible?.name === "delete"
			? await deleteUserSavedCard({ paymentId: paymentId })
			: await setDefaultCard({ paymentId: paymentId });
		await getUserPaymentMethods();
		setConfirmVisible({ name: "", text: "", open: false });
	};

	useEffect(() => {
		setCards(subscription?.paymentMethods);
	}, [subscription, setCards]);

	return (
		<>
			<div className="payment-method-card">
				{cards?.map((item: any, index: number) => (
					<IonCard className="ion-padding" key={index} style={{ border: item?.default ? "1px solid #cd9f0e" : "" }}>
						<IonCardContent className="flex ion-align-items-center ion-justify-content-between ion-no-padding">
							<div>
								<div>**** **** **** {item?.last4}</div>
								<div className="ion-margin-top">{item?.exp_month} / {item?.exp_year} </div>
							</div>
							<div>
								<div className="flex">
									<IonCheckbox
										checked={item?.default}
										onClick={() => {
											setPaymentId(item?.id);
											setConfirmVisible({ name: "default", text: "Are you sure want to set Default card?", open: true });
										}}
										onIonChange={() => setSelectedValue(item?.id)}
									/>
									<IonIcon
										icon={trash}
										onClick={() => {
											setPaymentId(item?.id);
											setConfirmVisible({ name: "delete", text: "Are you sure want to delete?", open: true });
										}}
										className="ion-margin-start trash-icon"
									/>
								</div>
								<div className="payment-title ion-margin-top">{item?.brand}</div>
							</div>
						</IonCardContent>
					</IonCard>
				))}
			</div>
			<IonModal
				isOpen={confirmVisible?.open}
				onDidDismiss={() => setConfirmVisible({ name: "", text: "", open: false })}
				className="confirm-modal"
			>
				<ConfirmModal
					onClose={() => setConfirmVisible({ name: "", text: "", open: false })}
					onSuccess={handleClcik}
					text={confirmVisible?.text}
				/>
			</IonModal>
		</>
	);
};

export default CardDetails;
