import React, { useEffect, useState } from "react";
import {
	IonPage,
	IonHeader,
	IonToolbar,
	IonContent,
	IonButton,
	IonRow,
	IonCol,
	IonModal,
	IonText,
	IonIcon,
	IonSegment,
	IonSegmentButton,
} from "@ionic/react";
import PersonCard from "../../components/PersonCard/PersonCard";
import UserLikes from "../../hooks/userLike";
import ProfileDetails from "../../components/PersonCard/ProfileDetails/ProfileDetails";
import GroupYourLikesModal from "../../components/GroupYourLikesModal/GroupYourLikesModal";
import UserSubscription from "../../hooks/userSubscription";
import GoldModal from "../Settings/SubscriptionModals/GoldModal";
import PlatinumModal from "../Settings/SubscriptionModals/PlatinumModal";
import SuperLikesModal from "../Settings/SubscriptionModals/SuperLikesModal";
import useOnboarding from "../../hooks/useOnboarding";
import logo from '../../assets/img/logo-blue.svg'
import likeReceived from '../../assets/img/like-sent.svg'
import likeReceivedActive from '../../assets/img/like-sent-active.svg'
import { send } from "ionicons/icons";
import likeTextBg from '../../assets/img/like_text_bg.svg'
import "./Highlights.scss";

type Props = {};

interface IUserLikes {
	id: string;
	user: {
		profile_image_url: string;
		name: string;
		age: number;
		firstname: string;
		lastname: string;
		createdAt: string;
		avatar: any;
		profileMedias: string[];
	};
	createdAt: string;
}

const Highlights: React.FC<Props> = () => {
	const [isGroupLikesOpen, setIsGroupLikesOpen] = useState(false);
	const { passions } = useOnboarding();
	const [segmentView, setSegmentView] = useState<string>("LIKES");
	const [openProfileDetaiModel, setOpenProfileDetailModel] = useState(false);
	const [profileDetails, setProfileDetails] = useState({});
	const [selectPassions, setSelectPassions] = useState<any>([]);
	const [isOpenSubscriptionModel, setOpenSubscriptionModel] = useState({
		gold: false,
		platinum: false,
		superLike: false,
	});
	const { subscription } = UserSubscription();
	const { subscriptionDetail } = subscription;

	const { like, getUserSendedLikes, getUserLikes } = UserLikes();
	const { sentLike } = like;
	const userLikes = like?.like;

	useEffect(() => {
		segmentView === "LIKES"
			? selectPassions?.length > 0
				? getUserLikes({
					passions: selectPassions,
				})
				: getUserLikes({})
			: getUserSendedLikes({});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [segmentView, selectPassions]);

	const handleOpenProfileDetailsModel = (user: any) => {
		if (segmentView === "LIKES" && subscriptionDetail?.subscriptionDetail?.type !== "gold") {
			setOpenSubscriptionModel({ ...isOpenSubscriptionModel, gold: true });
		} else {
			setOpenProfileDetailModel(true);
			setProfileDetails(user);
		}
	};

	const handleFilterWithPassions = async (type: any, index: number) => {
		if (subscriptionDetail?.subscriptionDetail?.type !== "gold") {
			setOpenSubscriptionModel({ ...isOpenSubscriptionModel, gold: true });
		} else {
			const alreadySelected = selectPassions?.find((item: any) => item === type);
			setSelectPassions(
				alreadySelected ? selectPassions?.filter((item: any) => item !== type) : [...selectPassions, type],
			);
		}
	};

	const handleScroll = (event: any) => {
		const { scrollTop, scrollHeight, offsetHeight } = event.target;
		if (
			scrollTop + offsetHeight >= scrollHeight &&
			segmentView === "LIKES" &&
			subscriptionDetail?.subscriptionDetail?.type !== "gold"
		) {
			setOpenSubscriptionModel({ ...isOpenSubscriptionModel, gold: true });
		}
	};

	return (
		<>
			<IonPage className="heighlights-main">
				<IonHeader>
					<div className="ion-padding-start likes-logo">
						<img src={logo} alt="logo" />
					</div>
					<IonToolbar className="toolbar-no-border toolbar-no-safe-area">

						<div className="ion-flex ion-justify-content-between ion-align-items-center like-header">

							<IonSegment
								className="segment-custom"
								value={segmentView}
								mode="md"
								onIonChange={(e) => setSegmentView(e.detail.value as string)}
							>
								<IonSegmentButton value="LIKES">
									{segmentView === "LIKES" && (
										<IonButton className=" likes-received like-button" fill="clear"><img src={likeReceivedActive} alt="likeReceivedActive" />Likes received</IonButton>
									)}
									{segmentView === "TOPPICKS" && (
										<img src={likeReceived} alt="likeReceived" />
									)}
								</IonSegmentButton>
								<IonSegmentButton value="TOPPICKS">
									{segmentView === "TOPPICKS" && (
										<IonButton className="like-sent like-button" fill="clear"><IonIcon icon={send} />Likes sent</IonButton>
									)}
									{segmentView === "LIKES" && (
										<IonIcon icon={send} className="like-sent-active-icon" />
									)}
								</IonSegmentButton>
							</IonSegment>
							<IonText class="font-dosis">Likes</IonText>
						</div>
					</IonToolbar>
				</IonHeader>

				<IonContent className="highlights-page" onScroll={handleScroll}>
					<div className="safe-area-bottom">
						{segmentView === "LIKES" && (
							<>
								<div className="segment-view">
									<IonRow>
										{userLikes?.map((item: IUserLikes) => (
											<IonCol
												key={item.id}
												size="6"
												sizeMd="4"
												sizeLg="3"
												onClick={() => handleOpenProfileDetailsModel(item?.user)}
											>
												<PersonCard
													user={item?.user}
													subscriptionDetail={subscriptionDetail?.subscriptionDetail}
													type={segmentView}
													setOpenSubscriptionModel={setOpenSubscriptionModel}
													isOpenSubscriptionModel={isOpenSubscriptionModel}
													createdAt={item?.createdAt}
												/>
											</IonCol>
										))}
									</IonRow>
									<div className="like-text-bg-main">
										<div className="like-bg-desc">
											<IonText >Be seen faster. With Soveraign Platinum ™ we’ll prioritaze your likes.</IonText>
										</div>
										<div className="like-bg-title">
											<img src={likeTextBg} alt="likeTextBg" className="like-text-bg" />
											<IonText >Upgrade <br /> likes</IonText>
										</div>
									</div>
								</div>
							</>
						)}

						{segmentView === "TOPPICKS" && (
							<>
								<div className="segment-view">
									<IonRow>
										{sentLike.map((user: any) => (
											<IonCol
												size="6"
												sizeMd="4"
												sizeLg="3"
												key={user.id}
												onClick={() => handleOpenProfileDetailsModel(user?.interestedUser)}
											>
												<PersonCard
													user={user?.interestedUser}
													type={segmentView}
													subscriptionDetail={subscriptionDetail?.subscriptionDetail}
													setOpenSubscriptionModel={setOpenSubscriptionModel}
													isOpenSubscriptionModel={isOpenSubscriptionModel}
													createdAt={user?.createdAt}
												/>
											</IonCol>
										))}
									</IonRow>
								</div>
							</>
						)}
					</div>
				</IonContent>
			</IonPage>
			<IonModal isOpen={isGroupLikesOpen} onDidDismiss={() => setIsGroupLikesOpen(false)} className="group-likes-modal">
				<GroupYourLikesModal
					onClose={() => setIsGroupLikesOpen(false)}
					setOpenSubscriptionModel={setOpenSubscriptionModel}
					isOpenSubscriptionModel={isOpenSubscriptionModel}
					subscriptionDetail={subscriptionDetail?.subscriptionDetail}
				/>
			</IonModal>
			<IonModal
				isOpen={openProfileDetaiModel}
				onDidDismiss={() => setOpenProfileDetailModel(false)}
				className="profile-details-model"
			>
				<ProfileDetails
					profileDetails={profileDetails}
					onClose={() => setOpenProfileDetailModel(false)}
					setOpenSubscriptionModel={setOpenSubscriptionModel}
					isOpenSubscriptionModel={isOpenSubscriptionModel}
					type="Metches"
				/>
			</IonModal>
			<IonModal
				isOpen={isOpenSubscriptionModel?.gold}
				onDidDismiss={() => setOpenSubscriptionModel({ ...isOpenSubscriptionModel, gold: false })}
				className="gold-model"
			>
				<GoldModal onClose={() => setOpenSubscriptionModel({ ...isOpenSubscriptionModel, gold: false })} />
			</IonModal>
			<IonModal
				isOpen={isOpenSubscriptionModel?.platinum}
				onDidDismiss={() => setOpenSubscriptionModel({ ...isOpenSubscriptionModel, platinum: false })}
				className={`platinum-model ${subscriptionDetail?.subscriptionDetail?.id ? "platinum-subscribe-model" : ""}`}
			>
				<PlatinumModal
					subscriptionType={"platinum"}
					onClose={() => setOpenSubscriptionModel({ ...isOpenSubscriptionModel, platinum: false })}
				/>
			</IonModal>
			<IonModal
				isOpen={isOpenSubscriptionModel?.superLike}
				onDidDismiss={() => setOpenSubscriptionModel({ ...isOpenSubscriptionModel, superLike: false })}
				className="super-likes-model"
			>
				<SuperLikesModal
					onClose={() => setOpenSubscriptionModel({ ...isOpenSubscriptionModel, superLike: false })}
					setOpenSubscriptionModel={setOpenSubscriptionModel}
					isOpenSubscriptionModel={isOpenSubscriptionModel}
					subscriptonType={subscriptionDetail?.subscriptionDetail}
				/>
			</IonModal>
		</>
	);
};

Highlights.defaultProps = {};

export default Highlights;
