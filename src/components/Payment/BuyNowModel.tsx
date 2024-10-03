import React, { useEffect } from "react";
import { IonButton, IonButtons, IonContent, IonIcon, IonText } from "@ionic/react";
import { close, flame } from "ionicons/icons";
import UserSubscription from "../../hooks/userSubscription";
import { Link } from "react-router-dom";

type Props = {
	SelectedSubscription: any;
	onClose: () => void;
	purchasedPlan: any;
};

const BuyNowModel: React.FC<Props> = ({ SelectedSubscription, purchasedPlan, onClose }) => {
	const { subscriptionType } = SelectedSubscription;
	const { currency, amount, month, boosts } = SelectedSubscription || {};

	const { getUserPerchasedSubscription } = UserSubscription();

	useEffect(() => {
		getUserPerchasedSubscription();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [subscriptionType]);

	return (
		<IonContent>
			<div className="ion-padding-bottom">
				<div className="buy-header ion-text-center">
					<IonButtons onClick={onClose}>
						<IonIcon className="close-button" icon={close} />
					</IonButtons>
					<IonText>
						<h5 className="ion-text-center">Thank You For Your Order</h5>
						<p className="ion-no-margin">Your credit card has been successfully charged.</p>
						<p className="ion-no-margin">An email receipt is on its way to developer.milankoladiya@gmail.com.</p>
					</IonText>
				</div>
				<div className="ion-text-center ion-padding-horizontal ion-padding-bottom">
					<div>
						<img src="assets/img/order-verify.png" alt="" width={120} height={120} />
					</div>
					{/* <IonText>
						<h5>Order Number</h5>
					</IonText>
					<div className="flex copy-text ion-justify-content-center ion-margin-vertical">
						<IonInput name="orderNo" type="text"></IonInput>`
						<IonButton>
							<IonIcon icon={reader} slot="icon-only" />
						</IonButton>
					</div> */}
					<IonButton shape="round" onClick={onClose} className="btn-get-started">
						GET STARTED
					</IonButton>
					<IonText>
						<p>
							At the end of your subscription term, and each renewal period thereafter, your subscription package will
							automatically continue for the same period of time at ${amount}, until you cancel. You may view the terms
							and conditions of your purchase at
							<Link to=""> https://policies.tinder.com/terms</Link>. To cancel, visit your Account Settings.
						</p>
					</IonText>
				</div>
				<div className="payment-detail">
					<div className="ion-flex">
						{purchasedPlan === "superLike" ? (
							<h5>Super Likes</h5>
						) : purchasedPlan === "boosts" ? (
							<h5>Boosts</h5>
						) : (
							<div className="plan-trade-title ion-text-center">
								<IonIcon icon={flame} className={`color-gold-${purchasedPlan} color-gold`} />
								TradLife
								<span className={`color-gold-${purchasedPlan} color-gold`}>
									{purchasedPlan === "platinum" ? "PLATINUM" : purchasedPlan === "plus" ? "+" : "GOLD"}
								</span>
							</div>
						)}
						<div>
							<IonText>
								<h4 className="ion-text-end">
									{currency}
									{amount}
								</h4>
							</IonText>
							<IonText>
								<h3 className="ion-text-end">
									{currency}
									{(amount / (month || boosts)).toFixed(2)}/
									{subscriptionType === "superLike" || subscriptionType === "boosts"
										? `${boosts} Boosts`
										: `${month} Month`}
								</h3>
							</IonText>
						</div>
					</div>
					<div className="ion-flex">
						<IonText>
							<h3>Sales Tax</h3>
						</IonText>
						<IonText>
							<h3 className="ion-text-end">{currency}0.00</h3>
						</IonText>
					</div>
					<div className="ion-flex">
						<IonText>
							<h4>Total</h4>
						</IonText>
						<IonText>
							<h4 className="ion-text-end">
								{currency}
								{amount}
							</h4>
						</IonText>
					</div>
				</div>
			</div>
		</IonContent>
	);
};

export default BuyNowModel;
