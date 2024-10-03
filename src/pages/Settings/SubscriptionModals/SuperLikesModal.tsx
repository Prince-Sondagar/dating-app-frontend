import React, { useState } from "react";
import { IonContent, IonText, IonButton, IonModal } from "@ionic/react";
import FavouriteIcon from "../../../assets/icons/favouriteIcon";
import API from "../../../utils/axios";
import { loadStripe } from "@stripe/stripe-js";
import "../Settings.scss";
import UserSubscription from "../../../hooks/userSubscription";
import { Elements } from "@stripe/react-stripe-js";
import PaymentModel from "../../../components/Payment/PaymentModel";

type Props = {
	onClose: () => void;
	setOpenSubscriptionModel: any;
	isOpenSubscriptionModel: {
		gold: boolean;
	};
	subscriptonType: {
		type: string;
	};
};

const SuperLikesModal: React.FC<Props> = ({
	onClose,
	setOpenSubscriptionModel,
	isOpenSubscriptionModel,
	subscriptonType,
}) => {
	const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY as string);
	const [selectedPackage, setSelectedPackage] = useState(15);
	const [openModel, setOpemModel] = useState(false);
	const { subscription } = UserSubscription();
	const [clientSecretId, setClientSecretId] = useState<string>();
	const {
		superLikeSubscription: { subPlans },
	} = subscription;

	const handleOpenPaymentModel = async () => {
		const getSelectedPackage = subPlans?.find((item: any) => item?.boosts === selectedPackage);
		const { data }: any = await API.post(`subscriptions/superlike/checkout/${getSelectedPackage?.priceId}`);
		setClientSecretId(data?.data?.client_secret);
		setOpemModel(true);
	};

	const appearance = {
		theme: "stripe",
		variables: {
			colorBackground: "#f5f5f5",
			colorText: "#5c5c5e",
		},
	};

	const options: any = {
		clientSecret: clientSecretId,
		appearance: appearance,
	};
	return (
		<>
			<IonContent>
				<div className="likes-wrapper ion-text-center flex ion-justify-content-between">
					<div className="likes-toolbar ion-padding">
						<div className="bg-slide-icon">
							<FavouriteIcon />
						</div>
						<IonText>
							<h6>Stand out with Super Like</h6>
						</IonText>
						<p className="slide-desc ion-no-margin">You're 3x more likely to get a match!</p>
					</div>
					<div className="likes-card flex ion-align-items-end ion-justify-content-center">
						{subPlans?.map((card: any, index: number) => (
							<div
								className={`likes-package ${selectedPackage === card?.boosts ? "selected-card" : ""}`}
								onClick={() => setSelectedPackage(card?.boosts)}
								key={index}
							>
								<div className="likes-wrap">
									<IonText>
										<h4 className="ion-no-margin">{card?.boosts}</h4>
									</IonText>
									<IonText>
										<h6 className="ion-no-margin">Super Likes</h6>
									</IonText>
									{card?.boosts !== 3 ? (
										<IonText>
											<h3>Save {((card?.amount - 5) / 5) * 10}%</h3>
										</IonText>
									) : (
										<hr />
									)}
									<IonText>
										<h2 className="ion-no-margin">
											<span>${card?.amount}</span>/ea
										</h2>
									</IonText>
								</div>
							</div>
						))}
					</div>
					<div className="bottom-sect">
						<IonButton expand="block" fill="solid" shape="round" onClick={handleOpenPaymentModel}>
							Get More Super Likes
						</IonButton>
						<div className="flex ion-align-items-center ion-margin-vertical">
							<hr />
							OR
							<hr />
						</div>
						{subscriptonType?.type !== "gold" && (
							<IonButton
								expand="block"
								fill="outline"
								shape="round"
								onClick={() => setOpenSubscriptionModel({ ...isOpenSubscriptionModel, superLike: false, gold: true })}
							>
								Get TradLife Gold™
							</IonButton>
						)}
						<IonButton expand="block" fill="clear" shape="round" onClick={onClose}>
							NO THANKS
						</IonButton>
					</div>
				</div>
			</IonContent>
			<IonModal isOpen={openModel} onDidDismiss={() => setOpemModel(false)} className="payment-model">
				{clientSecretId && (
					<Elements stripe={stripePromise} options={options}>
						<PaymentModel
							clientSecretId={clientSecretId}
							onClose={() => { setOpemModel(false); onClose(); }}
							subscriptionType={"superLike"}
							selectedPackage={selectedPackage}
							subscriptions={subPlans}
						/>
					</Elements>
				)}
			</IonModal>
		</>
	);
};

SuperLikesModal.defaultProps = {};

export default SuperLikesModal;
