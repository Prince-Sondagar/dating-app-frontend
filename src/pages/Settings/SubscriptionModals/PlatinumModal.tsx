import React, { useState } from "react";
import { IonContent, IonText, IonButton, IonModal, IonIcon, IonHeader, IonRadioGroup, IonItem, IonRadio, IonLabel } from "@ionic/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentModel from "../../../components/Payment/PaymentModel";
import API from "../../../utils/axios";
import UserSubscription from "../../../hooks/userSubscription";
import { close, lockClosed } from "ionicons/icons";
import LogoSovereignIcon from "../../../assets/icons/logoSovereignIcon";
import CheckIcon from "../../../assets/icons/checkIcon";
import BannerPlanIcon from "../../../assets/icons/bannerPlanIcon";

import fav_new from "../../../assets/img/fav_new.svg";
import plus_new from "../../../assets/img/plus_new.svg";
import "../../../pages/Settings/Settings.scss";

type Props = {
	subscriptionType: any;
	onClose: () => void;
};

const goldDetails = [
	{ title: "Unlimited Likes", desc: "", type: "isUnlimitedLikes" },
	{ title: "See Who Likes You", desc: "", type: "seeWhoLikesYou" },
	{ title: "Unlimited Rewinds", desc: "", type: "UnlimitedRewinds" },
	{ title: "1 Free Boost per month", desc: "", type: "free1BoostPerMonth" },
	{ title: "5 Free Super Likes per week", desc: "", type: "free5SuperLikesPerWeek" },
	{ title: "Passport", desc: "Match and chat with people anywhere in the world.", type: "passport" },
	{ title: "Control Your Profile", desc: "Only show what you want them to know.", type: "controlYourProfile" },
	{ title: "Control Who Sees You", desc: "Manage who you're seen by.", type: "controlWhoSeesYou" },
	{
		title: "Control Who You See",
		desc: "Choose the type of people you want to connect with.",
		type: "controlWhoYouSee",
	},
	{ title: "Hide Ads", desc: "", type: "HideAds" },
];

const PlatinumModal: React.FC<Props> = ({ subscriptionType, onClose }) => {
	const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY as string);
	const [clientSecretId, setClientSecretId] = useState("");
	const { subscription } = UserSubscription();
	const {
		subscriptionDetail: { subscriptionDetail },
	} = subscription;

	const [selectedPackage, setSelectedPackage] = useState(subscriptionDetail?.month || 6);
	const [isOpenPaymentModel, setOpenPaymentModel] = useState(false);

	const getSubscriptionDetails = subscription?.subscription?.find(
		(item: any) => item?.type === subscriptionType && item,
	);
	const getUserSubscriptionPlan = subscriptionDetail?.id
		? getSubscriptionDetails?.prices?.filter((item: any) => item?.month === subscriptionDetail?.month)
		: getSubscriptionDetails;

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

	const getSelectedPackage = getSubscriptionDetails?.prices?.find((item: any) => item?.month === selectedPackage);

	const handleCreateNewSubscription = async () => {
		const { data, error }: any = await API.post("subscriptions", {
			priceId: getSelectedPackage?.priceId || getSubscriptionDetails?.[0]?.priceId,
		});
		if (error) {
			console.log("error in generate clientScretch");
		}
		setClientSecretId(data?.data?.clientSecret);
		setOpenPaymentModel(true);
	};

	return (
		<>
			<IonHeader className="plan-header flex ion-align-items-center ion-justify-content-between">
				<div className="flex ion-align-items-center">
					<LogoSovereignIcon color={subscriptionType === 'gold' ? "#e6b32e" : subscriptionType === 'platinum' ? "var(--ion-text-new-dark)" : "#5C26DA"} />
					<IonText className="font-dosis" style={{ color: subscriptionType === 'gold' ? "#e6b32e" : subscriptionType === 'platinum' ? "var(--ion-text-new-dark)" : "#5C26DA" }}>Sovereign</IonText>
				</div>
				<IonIcon icon={close} onClick={onClose} />
			</IonHeader>
			<IonContent>
				<div className="platinum-wrap">
					<IonText className="plan-title">
						<h6 className="font-dosis ion-no-margin">{subscriptionType === 'plus' ? "Go Plus and send as many likes as you want"
							: subscriptionType === 'platinum' ? "Go Platinum and level up every action you take on Sovereign"
								: subscriptionType === 'gold' ? "Go Gold and see who likes you and match with them" : ""}</h6>
					</IonText>
					<IonRadioGroup name="subscription" className={`select-subs-plan tabs-plan-${subscriptionType} ${!getUserSubscriptionPlan.prices ? "subscribe-tabs" : ""}`}>
						{getUserSubscriptionPlan &&
							(subscriptionDetail?.id ? getUserSubscriptionPlan : getUserSubscriptionPlan.prices)?.map((card: any) => (
								<IonItem
									lines="none"
									key={card?.month}
									className={`ion-item-${card?.month} ${selectedPackage === card?.month ? "selected-card-item" : ""}`}
									onClick={() => setSelectedPackage(card?.month)}
								>
									<IonLabel>{card?.month} {card?.month > 1 ? "Months" : "Month"}</IonLabel>
									{card?.month === 6 ?
										<IonIcon icon={plus_new} />
										: card?.month === 12 ? <IonIcon icon={fav_new} /> : ""
									}
									<IonRadio value={card?.month} />
								</IonItem>
							))
						}
					</IonRadioGroup>
					{subscriptionDetail?.id ?
						<div className="plan-content ion-text-center subscribe-plan-content">
							<IonText>
								<h5 className="font-dosis ion-no-margin">
									{getSelectedPackage?.currency}
									{(getSelectedPackage?.amount / getSelectedPackage?.month).toFixed(2)}/mo
								</h5>
							</IonText>
							<IonText><h6 className="font-dosis ion-no-margin">For an extra</h6></IonText>
							<IonText><h4 className="font-dosis ion-no-margin">{Math.abs(getSelectedPackage?.amount - subscriptionDetail?.amount).toFixed(2)}/mo</h4></IonText>
						</div>
						:
						<div className="plan-content ion-text-center">
							<div className="ion-text-right">
								{getSelectedPackage?.month !== 1 && (
									<span>SAVE {getSelectedPackage?.discount}</span>
								)}
							</div>
							<IonText>
								<h5 className="font-dosis ion-no-margin">
									{getSelectedPackage?.currency}
									{(getSelectedPackage?.amount / getSelectedPackage?.month).toFixed(2)}/mo
								</h5>
							</IonText>
							{getSelectedPackage?.month !== 1 && (
								<IonText><h6 className="font-dosis ion-no-margin">{getSelectedPackage?.label}</h6></IonText>
							)}
						</div>
					}
					{goldDetails?.map((data: any, index: number) => {
						const subscriptionDetails = Object.entries(
							(subscriptionDetail?.id
								? subscriptionDetail
								: getUserSubscriptionPlan) || {},
						)?.find(([key, value]) => key === data?.type && value === true);
						return (
							<div key={index} className="included-data">
								{subscriptionDetails?.length ? (
									<CheckIcon color="#0a0d13b3" />
								) : (
									<IonIcon icon={lockClosed} slot="icon-only" />
								)}
								<div>
									<IonText>
										<h5>{data?.title}</h5>
									</IonText>
									<p>{data?.desc}</p>
								</div>
							</div>
						);
					})}
					<IonButton className={`btnThemePrimary btn-continue-${subscriptionType}`} expand="block" shape="round" onClick={handleCreateNewSubscription}>
						Continue
					</IonButton>
					<p className="bottom-text ion-text-center">By tapping Continue, you will be charged, your subscription will auto-renew for the same price and package length until you cancel via Play Store settings, and you agree to our Terms</p>
				</div>
				<div className="banner-img">
					<BannerPlanIcon color={subscriptionType === 'gold' ? "#FFC93E" : subscriptionType === 'platinum' ? "var(--ion-text-new-dark)" : "#5C26DA"} />
				</div>
			</IonContent>
			<IonModal isOpen={isOpenPaymentModel} onDidDismiss={() => setOpenPaymentModel(false)} className="payment-model">
				{clientSecretId && (
					<Elements stripe={stripePromise} options={options}>
						<PaymentModel
							clientSecretId={clientSecretId}
							onClose={() => {
								setOpenPaymentModel(false);
								onClose();
							}}
							subscriptionType={subscriptionType}
							selectedPackage={selectedPackage}
							subscriptions={getUserSubscriptionPlan}
						/>
					</Elements>
				)}
			</IonModal>
		</>
	);
};

PlatinumModal.defaultProps = {};

export default PlatinumModal;
