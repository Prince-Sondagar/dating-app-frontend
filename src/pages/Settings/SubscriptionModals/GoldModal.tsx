import React, { useState } from "react";
import {
	IonContent,
	IonButton,
	IonIcon,
	IonButtons,
	IonToolbar,
	IonHeader,
	IonText,
	IonFooter,
	IonModal,
} from "@ionic/react";
import { checkmarkSharp, close, flame, lockClosed } from "ionicons/icons";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import LogoIcon from "../../../assets/icons/logoIcon";
import "../../../pages/Settings/Settings.scss";
import API from "../../../utils/axios";
import PaymentModel from "../../../components/Payment/PaymentModel";
import CheckIcon from "../../../assets/icons/checkIcon";
import UserSubscription from "../../../hooks/userSubscription";

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

type Props = {
	onClose: () => void;
};

const GoldModal: React.FC<Props> = ({ onClose }) => {
	const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY as string);
	const [scrollPosition, setScrollPosition] = useState(0);
	const [shouldChangeElement, setShouldChangeElement] = useState(false);
	const [clientSecretId, setClientSecretId] = useState("");
	const [isOpenPaymentModel, setOpenPaymentModel] = useState(false);
	const { subscription } = UserSubscription();
	const { subscriptionDetail } = subscription;
	const [selectedPlan, setSelectedPlan] = useState(
		subscriptionDetail?.subscriptionDetail ? subscriptionDetail?.subscriptionDetail?.month : 1,
	);

	const getSubscriptionDetails = subscription?.subscription?.find((item: any) => item?.type === "gold" && item);
	const getUserSubscriptionPlan = subscription?.subscriptionDetail?.subscriptionDetail?.id
		? getSubscriptionDetails?.prices?.filter(
			(item: any) => item?.month === subscription?.subscriptionDetail?.subscriptionDetail?.month,
		)
		: getSubscriptionDetails;
	const handleScroll = (event: any) => {
		setScrollPosition(event.target.scrollTop);
		if (scrollPosition > 300) {
			setShouldChangeElement(true);
		} else {
			setShouldChangeElement(false);
		}
	};

	const handleCreateNewSubscription = async () => {
		const getSelectedPackage = getUserSubscriptionPlan?.prices?.find((item: any) => item?.month === selectedPlan);
		const { data }: any = await API.post("subscriptions", {
			priceId: getSelectedPackage?.priceId || getUserSubscriptionPlan?.[0]?.priceId,
		});
		setClientSecretId(data?.data?.clientSecret);
		setOpenPaymentModel(true);
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
			<IonHeader>
				<IonToolbar className="toolbar-no-border">
					<IonButtons slot="start" onClick={onClose}>
						<IonIcon icon={close} slot="icon-only" />
					</IonButtons>
					<div className="plan-trade-title ion-text-center">
						<IonIcon icon={flame} className="color-gold" />
						TradLife
						<span className="color-gold">GOLD</span>
					</div>
				</IonToolbar>
			</IonHeader>
			<IonContent onScroll={handleScroll}>
				<div className="gold-wrap">
					<div className="gold-titlebar">
						<IonText>See Who Likes You and match with them instantly with TradLife Gold™.</IonText>
					</div>
					<div className="ion-padding-horizontal">
						<IonText>
							<h6>Select a plan</h6>
						</IonText>
						<div className="plan-wrapper ion-margin-top">
							{subscriptionDetail?.subscriptionDetail?.id
								? getUserSubscriptionPlan?.map((plan: any, index: number) => (
									<div className="plan-slide plan-subscribe-slide" key={index}>
										<div
											className="plan-sect"
											style={{ borderColor: selectedPlan === plan?.month ? "#ae830c" : "#b9bfc8" }}
											onClick={() => setSelectedPlan(plan?.month)}
										>
											<div className="plan-box">
												<div className="ion-flex">
													<div>
														<IonText>
															<h5>{plan?.title}</h5>
														</IonText>
														<IonText>
															<h4>{plan?.month} Month</h4>
														</IonText>
													</div>
													{selectedPlan === plan?.month && <IonIcon icon={checkmarkSharp} />}
												</div>
												<div className="ion-flex">
													<IonText>
														<h3>
															{plan?.currency}
															{(plan?.amount / plan?.month).toFixed(2)}/mo
														</h3>
													</IonText>
													<IonText>
														<p className="text-gray ion-no-margin">For an extra</p>
														<h2 className="ion-no-margin">
															{Math.abs(plan?.amount - subscriptionDetail?.subscriptionDetail?.amount).toFixed(2)}
															<span>/mo</span>
														</h2>
													</IonText>
												</div>
											</div>
										</div>
									</div>
								))
								: getUserSubscriptionPlan?.prices?.map((plan: any, index: string) => (
									<div className="plan-slide" key={index}>
										<div
											className="plan-sect"
											style={{ borderColor: selectedPlan === plan?.month ? "#ae830c" : "#b9bfc8" }}
											onClick={() => setSelectedPlan(plan?.month)}
										>
											<div className="plan-box">
												<div className="ion-flex">
													<div>
														<IonText>
															<h5>{plan?.title}</h5>
														</IonText>
														<IonText>
															<h4>{plan?.month} Month</h4>
														</IonText>
													</div>
													{selectedPlan === plan?.month && <IonIcon icon={checkmarkSharp} />}
												</div>
												<div className="ion-flex">
													<IonText>
														<h3>
															{plan?.currency}
															{(plan?.amount / plan?.month).toFixed(2)}/mo
														</h3>
													</IonText>
													{plan?.month !== 1 && <span className="month-label">Save {plan?.discount}</span>}
												</div>
											</div>
										</div>
									</div>
								))}
						</div>
						<div className="included-detail">
							<span>Included with TradLife Gold™</span>
							{goldDetails?.map((data: any, index: number) => {
								const subscriptionDetails = Object.entries(
									(subscriptionDetail?.subscriptionDetail?.id
										? subscriptionDetail?.subscriptionDetail
										: getUserSubscriptionPlan) || {},
								)?.find(([key, value]) => key === data?.type && value === true);
								return (
									<div key={index} className="included-data">
										{subscriptionDetails?.length ? (
											<CheckIcon color="var(--ion-color-gold-shade)" />
										) : (
											<IonIcon icon={lockClosed} slot="icon-only" />
										)}
										<div className="ion-margin-start">
											<IonText>
												<h5>{data?.title}</h5>
											</IonText>
											<p>{data?.desc}</p>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</IonContent>
			<IonFooter>
				<IonToolbar className="toolbar-no-border">
					<div className="flex ion-justify-content-between">
						{shouldChangeElement && (
							<div className="continue-sect">
								<div className="continue-flex">
									<LogoIcon color="#ebbb50" />
									{(subscriptionDetail?.subStatus ? getUserSubscriptionPlan : getUserSubscriptionPlan?.prices)?.map(
										(item: any, index: number) => {
											if (item?.month === selectedPlan) {
												return (
													<div className="ion-margin-start" key={index}>
														<IonText>
															<h4>{item?.month} Month</h4>
														</IonText>
														<IonText>
															<h2>
																{(item?.amount / item?.month).toFixed(2)}
																/mo
															</h2>
														</IonText>
													</div>
												);
											}
											return null;
										},
									)}
								</div>
							</div>
						)}
						<IonButton
							className={shouldChangeElement ? "continueScroll" : ""}
							expand="block"
							fill="solid"
							shape="round"
							onClick={handleCreateNewSubscription}
						>
							Continue
						</IonButton>
					</div>
				</IonToolbar>
			</IonFooter>
			<IonModal isOpen={isOpenPaymentModel} onDidDismiss={() => setOpenPaymentModel(false)} className="payment-model">
				{clientSecretId && (
					<Elements stripe={stripePromise} options={options}>
						<PaymentModel
							clientSecretId={clientSecretId}
							onClose={() => { setOpenPaymentModel(false); onClose(); }}
							subscriptionType={""}
							selectedPackage={selectedPlan}
							subscriptions={getUserSubscriptionPlan}
						/>
					</Elements>
				)}
			</IonModal>
		</>
	);
};

GoldModal.defaultProps = {};

export default GoldModal;
