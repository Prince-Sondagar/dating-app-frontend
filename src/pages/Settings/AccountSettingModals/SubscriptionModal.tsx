import React, { useState } from "react";
import {
	IonHeader,
	IonToolbar,
	IonButtons,
	IonTitle,
	IonContent,
	IonIcon,
	IonList,
	IonText,
	IonItem,
	IonLabel,
	IonNote,
    IonModal,
	IonToggle,
	IonButton,
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import { useDispatch } from "react-redux";
import { pausedUserSubscription, resumeUserSubscription, cancelUserSubscription } from "../../../store/actions/subscription.action";
import UserSubscription from "../../../hooks/userSubscription";
import ConfirmModal from "../../../components/ConfirmModal/ConfirmModal";

type Props = {
	onClose: () => void;
	subscriptionDetail: any;
};

const SubscriptionModal: React.FC<Props> = ({ onClose, subscriptionDetail}) => {

	const dispatch = useDispatch();
	const { getUserPerchasedSubscription } = UserSubscription();

	const [ confirmVisible, setConfirmVisible ] = useState<{name:string, open:boolean}>({
		name: "",
		open:false
	});

	const handleClcik = async () => {
		if(confirmVisible?.name === "toggle")
		{
			if (!subscriptionDetail?.isSubPaused) {
				await dispatch<any>(pausedUserSubscription());
			} else {
				await dispatch<any>(resumeUserSubscription());
			}
		}
		else{
			await dispatch<any>(cancelUserSubscription());
		}
		await getUserPerchasedSubscription();
		setConfirmVisible({name:"", open: false})
	};

	return (
		<>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Subscription</IonTitle>
					<IonButtons slot="start" onClick={onClose}>
						<IonIcon icon={chevronBack} slot="icon-only" />
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList>
					<div className="ion-margin-top">
						<IonText>
							<h5>{"Subscription"}</h5>
						</IonText>
						<IonItem lines="none">
							<IonLabel>Are you sure you want to renew the subscription from next month</IonLabel>
							<IonNote slot="end">
								<IonToggle color="primary" checked={subscriptionDetail?.isSubPaused} onIonChange={(e) => setConfirmVisible({name:"toggle", open: true})}/>
							</IonNote>
						</IonItem>
						<IonButton expand="block" className="ion-margin" onClick={() => setConfirmVisible({name:"cancel", open:true})}>
							Cancel
						</IonButton>
					</div>
				</IonList>

				<IonModal isOpen={confirmVisible?.open} onDidDismiss={() => setConfirmVisible({name:"", open: false})} className="confirm-modal">
					<ConfirmModal onClose={()=>setConfirmVisible({ name:"", open:false })} onSuccess={handleClcik} text="Are you sure?"/>
				</IonModal>
			</IonContent>
		</>
	);
};

SubscriptionModal.defaultProps = {};

export default SubscriptionModal;
