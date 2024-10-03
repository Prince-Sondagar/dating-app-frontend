import React, { useState } from "react";
import { IonContent, IonIcon, IonButtons, IonToolbar, IonText, IonButton, IonLabel, IonModal } from "@ionic/react";
import { close } from "ionicons/icons";
import { loadStripe } from "@stripe/stripe-js";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../../pages/Settings/Settings.scss";
import PaymentModel from "../../../components/Payment/PaymentModel";
import UserSubscription from "../../../hooks/userSubscription";
import { Elements } from "@stripe/react-stripe-js";
import GoldModal from "./GoldModal";
import API from "../../../utils/axios";

type Props = {
	onClose: () => void;
};

const boostData = [
	{ label: "", icon: "assets/img/boost_0.png", discount: "" },
	{ label: "POPULAR", icon: "assets/img/boost_1.png", discount: "25%" },
	{ label: "BEST VALUE", icon: "assets/img/boost_2.png", discount: "40%" },
];

const GetBoostModal: React.FC<Props> = ({ onClose }) => {
	const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY as string);
	const [openModel, setOpemModel] = useState({
		payment: false,
		gold: false,
	});
	const [selectBoost, setSelectBoost] = useState<any>({});
	const [clientSecretId, setClientSecretId] = useState<string>();
	const { subscription } = UserSubscription();
	const {
		boostSubscription: { subPlans },
	} = subscription;

	const handleOpenPaymentModel = async (card: { priceId: string }) => {
		setSelectBoost(card);
		const { data }: any = await API.post(`subscriptions/boost/checkout/${card?.priceId}`);
		setClientSecretId(data?.data?.client_secret);
		setOpemModel({ ...openModel, payment: true });
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
				<div>
					<IonToolbar className="toolbar-no-border">
						<IonButtons slot="start" onClick={onClose}>
							<IonIcon icon={close} slot="icon-only" />
						</IonButtons>
						<div className="ion-text-center ion-margin-top">
							<IonText>
								<h5>Be Seen</h5>
							</IonText>
							<IonText>
								<p className="ion-no-margin">Be a top profile in your area for 30 minutes to get more matches!</p>
							</IonText>
						</div>
					</IonToolbar>
					<div className="ion-slide-wrapper">
						<Swiper
							spaceBetween={30}
							centeredSlides
							initialSlide={1}
							breakpoints={{
								320: {
									slidesPerView: 1.5,
								},
								640: {
									slidesPerView: 2.5,
								},
							}}
						>
							{subPlans?.map((card: any, index: number) => (
								<SwiperSlide key={index}>
									<div
										className="boost-card"
										style={{
											border:
												boostData[index]?.label === "" ? "2px solid var(--ion-background-color)" : "2px solid #f6dcff",
										}}
									>
										{boostData[index]?.label !== "" && (
											<IonText>
												<h5 className="ion-no-margin">{boostData[index]?.label}</h5>
											</IonText>
										)}
										<div className={`${boostData[index]?.label === "" && "ion-margin-top"}`}>
											<IonText>
												<h4 className="text-gray">{card?.boosts} Boosts</h4>
											</IonText>
											<img src={boostData[index]?.icon} width={60} height={60} alt="boost" />
											<IonText>
												<p>
													${card?.amount}
													<span>/ea</span>
												</p>
											</IonText>
											{boostData[index]?.discount !== "" && <IonLabel>SAVE {boostData[index]?.discount}</IonLabel>}
										</div>
										<IonButton expand="block" onClick={() => handleOpenPaymentModel(card)} shape="round">
											Select
										</IonButton>
									</div>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
					<div className="or-sect">
						<div className="flex ion-align-items-center">
							<hr />
							or
							<hr />
						</div>
						<div className="select-boost-card ion-margin">
							<IonText>
								<h3 className="ion-text-center ion-no-margin">1 free Boost a month</h3>
							</IonText>
							<div className="flex ion-align-items-center ion-justify-content-between">
								<IonText className="flex ion-align-items-center">
									<img src="assets/img/gold.png" width={40} height={40} alt="boost" />
									Get TradLife Gold™
								</IonText>
								<IonButton
									expand="block"
									shape="round"
									fill="outline"
									onClick={() => setOpemModel({ ...openModel, gold: true })}
								>
									Select
								</IonButton>
							</div>
						</div>
					</div>
				</div>
			</IonContent>
			<IonModal
				isOpen={openModel?.payment}
				onDidDismiss={() => setOpemModel({ ...openModel, payment: false })}
				className="payment-model"
			>
				{clientSecretId && (
					<Elements stripe={stripePromise} options={options}>
						<PaymentModel
							clientSecretId={clientSecretId}
							onClose={() => {
								setOpemModel({ ...openModel, payment: false });
								onClose();
							}}
							subscriptionType={"boosts"}
							selectedPackage={selectBoost?.boosts}
							subscriptions={subPlans}
						/>
					</Elements>
				)}
			</IonModal>
			<IonModal
				isOpen={openModel?.gold}
				onDidDismiss={() => setOpemModel({ ...openModel, gold: false })}
				className="gold-model"
			>
				<GoldModal onClose={() => setOpemModel({ ...openModel, gold: false })} />
			</IonModal>
		</>
	);
};

GetBoostModal.defaultProps = {};

export default GetBoostModal;
