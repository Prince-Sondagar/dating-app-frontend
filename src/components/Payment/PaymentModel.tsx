import React, { useEffect, useState } from "react";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import {
	IonButton,
	IonButtons,
	IonCheckbox,
	IonContent,
	IonIcon,
	IonInput,
	IonItemDivider,
	IonSpinner,
	IonLabel,
	IonModal,
	IonText,
	useIonToast,
} from "@ionic/react";
import { close, flame, lockClosed } from "ionicons/icons";
import "./PaymentModel.scss";
import { Link } from "react-router-dom";
import BuyNowModel from "./BuyNowModel";
import UserSubscription from "../../hooks/userSubscription";
import CardDetails from "../CardDetails/CardDetails";
import { getUserPurchasedSubscriptionDetails } from "../../store/actions/subscription.action";
import { useDispatch } from "react-redux";
interface ISelectSubScription {
	currency: string;
	amount: number;
	month: number;
	boosts: number;
}
interface Item {
	month: number;
	boosts: number;
}

type Props = {
	onClose: () => void;
	subscriptionType: string;
	selectedPackage: Object;
	subscriptions: any;
	clientSecretId: string;
};

const PaymentModel: React.FC<Props> = ({
	onClose,
	selectedPackage,
	subscriptionType,
	subscriptions,
	clientSecretId,
}) => {
	const SelectedSubscription: ISelectSubScription = (subscriptions?.prices || subscriptions)?.find(
		(item: Item) => (item?.month || item?.boosts) === selectedPackage,
	);
	const { currency, amount, month, boosts } = SelectedSubscription || {};
	const { subscription, getUserPaymentMethods } = UserSubscription();
	const stripe = useStripe();
	const dispatch = useDispatch();
	const elements: any = useElements();
	const [present] = useIonToast();
	const [loading, setLoading] = useState(false);
	const [cardHoldername, setCardHolderName] = useState("");
	const [isOpenOerderModel, setOpenOerderModel] = useState<boolean>(false);
	const [changePaymentElement, setChangePaymentElement] = useState<Object | any>("");
	const [openpaymentModel, setOpenPaymentModel] = useState(false);
	const [selectedValue, setSelectedValue] = useState("");
	const [cards, setCards] = useState(subscription?.paymentMethods);

	useEffect(() => {
		getUserPaymentMethods();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const disableTrue = cards?.find((item: { default: boolean }) => item?.default);

	const handleSubmit = async (event: any) => {
		event.preventDefault();
		setLoading(true);

		if (!stripe || !elements) return;

		const formData = new FormData(event.currentTarget);
		const billing_details: any = { name: formData.get("cardholderName") };

		const confirmParams: any = {
			payment_method_data: { billing_details },
			save_payment_method: !!formData.get("save-card"),
		};

		const result = changePaymentElement?.complete
			? await stripe.confirmPayment({
					elements,
					confirmParams,
					redirect: "if_required",
			  })
			: await stripe.confirmCardPayment(clientSecretId, {
					payment_method: selectedValue || disableTrue?.id || undefined,
			  });
		if (result?.error) {
			present({
				message: "Something is Wrong Please Check Your Details!",
				duration: 3000,
				position: "bottom",
				cssClass: "my-custom-class",
			});
			elements.getElement(PaymentElement)?.clear();
			setCardHolderName("");
			setLoading(false);
		} else {
			setLoading(false);
			setOpenOerderModel(true);
			elements.getElement(PaymentElement)?.clear();
			setCardHolderName("");
		}
	};

	const handlePaymentSuccessClose = () => {
		setOpenOerderModel(false);
		onClose();
		dispatch<any>(getUserPurchasedSubscriptionDetails());
	};

	return (
		<>
			<IonContent>
				<div className="payment-header">
					<IonButtons slot="start" onClick={onClose}>
						<IonIcon icon={close} slot="icon-only" />
					</IonButtons>
					<IonText>
						<h5 className="ion-text-center">Payment Methods</h5>
					</IonText>
				</div>
				<div className="payment-detail">
					<div className="ion-flex">
						{subscriptionType === "superLike" ? (
							<h5>Super Likes</h5>
						) : subscriptionType === "boosts" ? (
							<h5>Boosts</h5>
						) : (
							<div className="plan-trade-title ion-text-center">
								<IonIcon icon={flame} className={`color-gold-${subscriptionType} color-gold`} />
								TradLife
								<span className={`color-gold-${subscriptionType} color-gold`}>
									{subscriptionType === "platinum" ? "PLATINUM" : subscriptionType === "plus" ? "+" : "GOLD"}
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
				{!openpaymentModel && <CardDetails setSelectedValue={setSelectedValue} cards={cards} setCards={setCards} />}
				{!openpaymentModel && <IonItemDivider className="ion-margin-vertical" children={"OR"} />}
				{cards?.length > 0 && (
					<IonText
						style={{ color: "#cd9f0e", cursor: "pointer", textDecoration: "underline" }}
						onClick={() => setOpenPaymentModel(!openpaymentModel)}
						className="ion-margin"
					>
						{openpaymentModel ? "Make payment via Saved cards" : "Make payment via new Debit/Credit card"}
					</IonText>
				)}
				{openpaymentModel && <IonItemDivider className="ion-margin-vertical" children={"OR"} />}
				<form className="ion-padding-horizontal" onSubmit={handleSubmit}>
					{!cards?.length || openpaymentModel ? (
						<>
							<div className="ion-margin-bottom">
								<IonLabel position="floating" className="cardholder">
									Cardholder Name
								</IonLabel>
								<IonInput
									name="cardholderName"
									value={cardHoldername}
									onIonChange={(e: any) => setCardHolderName(e.target.value)}
									type="text"
								/>
							</div>
							<div>
								<PaymentElement onChange={(e) => setChangePaymentElement(e)} />
								<div className="flex ion-margin-top">
									<IonCheckbox name="save-card" />
									<IonLabel className="ion-margin-start">Save this Card as default card</IonLabel>
								</div>
							</div>
						</>
					) : (
						<></>
					)}
					<IonText>
						<p className="ion-no-margin">You'll be able to delete your card details at any time from your settings.</p>
					</IonText>
					<IonText>
						<h6 className="ion-text-center">
							By tapping BUY NOW, we will charge your card, your subscription will automatically renew for the same
							package length you selected at the same package price <b>{`(${amount})`}</b> until you cancel via Account
							Settings, and you agree to our <Link to={""}>Terms</Link>.
						</h6>
					</IonText>
					<IonButton
						disabled={!(changePaymentElement?.complete || disableTrue)}
						expand="block"
						shape="round"
						type="submit"
						className={`${`bg-gradient-${subscriptionType || "gold"}`}`}
					>
						{loading ? <IonSpinner name="crescent"></IonSpinner> : "Buy Now"}
					</IonButton>
					<div className="flex ion-justify-content-center secure-check ion-margin-bottom">
						<IonIcon icon={lockClosed}></IonIcon> Secure Checkout
					</div>
				</form>
			</IonContent>
			<IonModal isOpen={isOpenOerderModel} onDidDismiss={handlePaymentSuccessClose} className="buy-now-model">
				<BuyNowModel
					SelectedSubscription={{ ...SelectedSubscription, subscriptionType: subscriptionType }}
					purchasedPlan={subscriptionType}
					onClose={handlePaymentSuccessClose}
				/>
			</IonModal>
		</>
	);
};

export default PaymentModel;
