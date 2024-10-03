import React, { useEffect, useRef, useState } from "react";
import { IonContent, IonButton, IonIcon, IonButtons, IonToolbar, IonHeader, IonText, IonFooter, IonModal } from "@ionic/react";
import { closeCircleOutline, flame, lockClosed } from "ionicons/icons";
import API from "../../../utils/axios";
import "../../../pages/Settings/Settings.scss";
import PlatinumModal from "./PlatinumModal";
import GoldModal from "./GoldModal";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentModel from "../../../components/Payment/PaymentModel";
import CheckIcon from "../../../assets/icons/checkIcon";
import SwiperCore, {  Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

type Props = {
  onClose: () => void;
  getSubscriptionDetails: any;
  subscriptionType: any;
  setSubscriptionType: any;
  purchasedPlan: any;
};

const subscriptionPackage = [
  { text: "+", type: "®", name: "plus" },
  { text: "GOLD", type: "™", name: "gold" },
  { text: "PLATINUM", type: "™", name: "platinum" },
];

const includedData = [
  {
    heading: "Upgrade Your Likes",
    data: [
      { title: "Unlimited Likes", desc: "", type: "isUnlimitedLikes" },
      { title: "See Who Likes You", desc: "", type: "seeWhoLikesYou" },
      { title: "Priority Likes", desc: "Your Likes will be seen sooner with Priority Likes.", type: "priorityLikes" },
    ],
  },
  {
    heading: "Enhance Your Experience",
    data: [
      { title: "Unlimited Rewinds", desc: "", type: "UnlimitedRewinds" },
      { title: "1 Free Boost per month", desc: "", type: "free1BoostPerMonth" },
      { title: "5 Free Super Likes per week", desc: "", type: "free5SuperLikesPerWeek" },
      { title: "Message Before Matching", desc: "Add a note to your Super Likes.", type: "messageBeforeMatching" },
    ],
  },
  {
    heading: "Premium Discovery",
    data: [{ title: "Passport", desc: "Match and chat with people anywhere in the world.", type: "passport" }],
  },
  {
    heading: "Take Control",
    data: [
      { title: "Control Your Profile", desc: "Only show what you want them to know.", type: "controlYourProfile" },
      { title: "Control Who Sees You", desc: "Manage who you're seen by.", type: "controlWhoSeesYou" },
      {
        title: "Control Who You See",
        desc: "Choose the type of people you want to connect with.",
        type: "controlWhoYouSee",
      },
      { title: "Hide Ads", desc: "", type: "HideAds" },
    ],
  },
];

const UpgradeLoveLifeModal: React.FC<Props> = ({
  onClose,
  getSubscriptionDetails,
  setSubscriptionType,
  purchasedPlan,
}) => {
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY as string);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { subscriptionDetail } = purchasedPlan;
  const [selectedPackage, setSelectedPackage] = useState<any>({ value: "", index: "" });
  const slidesRef = useRef<SwiperCore | null>(null);
  const [clientSecretId, setClientSecretId] = useState("");
  const [model, setModel] = useState(false);

  const handleSlideDidChange = async () => {
    const index = await slidesRef.current?.realIndex;
    setCurrentIndex(index || 0);
  };

  useEffect(() => {
    setSelectedPackage((prevSelectedPackage: any) => {
      const updatedPackage = getSubscriptionDetails?.find((item: any, index: number) => index === (currentIndex || 0));
      return { ...prevSelectedPackage, value: updatedPackage, index: currentIndex || 0 };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  const getCurrentPrice = () => {
    return purchasedPlan?.subscriptionDetail
      ? selectedPackage?.value?.prices?.find((price: any) => price?.month === subscriptionDetail?.month)
      : selectedPackage?.value?.prices?.[0];
  };
  const handleOpenPaymentModel = async () => {
    setSubscriptionType(selectedPackage?.value?.type);
    const { data }: any = await API.post("subscriptions", {
      priceId: getCurrentPrice()?.priceId,
    });
    setClientSecretId(data?.data?.clientSecret);
    setModel(true);
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
          <div className="flex ion-align-items-center">
            <IonText className="ion-text-center">My Subscription</IonText>
            <IonButtons slot="end" onClick={onClose}>
              <IonIcon icon={closeCircleOutline} slot="icon-only" />
            </IonButtons>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="ion-slide-wrapper">
          <Swiper
		  pagination={true}
		  modules={[Pagination]}
            spaceBetween={10}
            slidesPerView={1.5}
            centeredSlides={true}
            onSlideChange={handleSlideDidChange}
            onSwiper={(swiper) => (slidesRef.current = swiper)}
          >
            {subscriptionPackage?.map((item, key) => (
              <SwiperSlide key={key} className={`gradient-${key}`}>
                <div className="flex ion-align-items-center">
                  <div className="plan-trade-title ion-text-center">
                    <IonIcon icon={flame} className={`color-gold-${key}`} />
                    TradLife
                    <span className={`color-gold-${key}`}>{item?.text}</span>
                  </div>
                  <sup>{item?.type}</sup>
                  {subscriptionDetail?.type === item?.name ? "Current Plan" : ""}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="ion-padding-top">
          {includedData?.map((data) => (
            <div key={data?.heading} className="included-detail">
              <span>{data?.heading}</span>
              {data?.data?.map((item) => {
                const subscriptionDetail = Object.entries(selectedPackage?.value || {}).find(
                  ([key, value]) => key === item?.type && selectedPackage?.index === currentIndex && value === true
                );
                return (
                  <div key={item?.title} className={`included-data ${!subscriptionDetail ? "data-secondary" : ""}`}>
                    {subscriptionDetail ? (
                      <CheckIcon color="var(--ion-color-gold-shade)" />
                    ) : (
                      <IonIcon icon={lockClosed} slot="icon-only" />
                    )}
                    <div className="ion-margin-start">
                      <IonText>
                        <h5>{item?.title}</h5>
                      </IonText>
                      <p>{item?.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </IonContent>
      <IonFooter>
        {subscriptionDetail?.type !== selectedPackage?.value?.type && (
          <IonToolbar className="toolbar-no-border ion-text-center ion-padding">
            <IonButton
              fill="solid"
              onClick={handleOpenPaymentModel}
              shape="round"
              className={`ion-no-margin btn-gradient-${currentIndex}`}
            >
              STARTING AT {getCurrentPrice()?.currency}
              {getCurrentPrice()?.amount}
            </IonButton>
          </IonToolbar>
        )}
      </IonFooter>
      {purchasedPlan?.subStatus === "active" ? (
        <IonModal isOpen={model} onDidDismiss={() => setModel(false)} className="payment-model">
          {clientSecretId && (
            <Elements stripe={stripePromise} options={options}>
              <PaymentModel
                clientSecretId={clientSecretId}
                onClose={() => {
                  setModel(false);
                  onClose();
                }}
                subscriptionType={selectedPackage?.value?.type}
                selectedPackage={subscriptionDetail?.month}
                subscriptions={selectedPackage?.value}
              />
            </Elements>
          )}
        </IonModal>
      ) : (
        <>
          <IonModal
            isOpen={model}
            onDidDismiss={() => setModel(false)}
            className={`platinum-model ${selectedPackage?.value?.type === "plus" && "plus-model"} ${
              subscriptionDetail?.id ? "platinum-subscribe-model" : ""
            }`}
          >
            <PlatinumModal subscriptionType={selectedPackage?.value?.type} onClose={() => setModel(false)} />
          </IonModal>
          {selectedPackage?.value?.type === "gold" && (
            <IonModal isOpen={model} onDidDismiss={() => setModel(false)} className="gold-model">
              <GoldModal onClose={() => setModel(false)} />
            </IonModal>
          )}
        </>
      )}
    </>
  );
};

UpgradeLoveLifeModal.defaultProps = {};

export default UpgradeLoveLifeModal;
