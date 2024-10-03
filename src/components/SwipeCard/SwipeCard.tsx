import React, { useState } from "react";
import { IonRow, IonCol, IonIcon, IonButton, IonModal } from "@ionic/react";
import { ellipse, briefcaseOutline, locationOutline, informationCircleSharp } from "ionicons/icons";
import "./SwipeCard.scss";
import ProfileImageSlides from "../ProfileImageSlides/ProfileImageSlides";
import ProfileDetails from "../PersonCard/ProfileDetails/ProfileDetails";
import SuperLikesModal from "../../pages/Settings/SubscriptionModals/SuperLikesModal";
import swipeCheckMark from '../../assets/img/swipe_check_mark.svg'

type Props = {
	user?:
		| {
				profileMedias: string | any;
				firstname: string;
				lastname: string;
				age: number;
				isVerified: boolean;
				isActive: boolean;
				job_title: any;
				passionlist: string[];
				aboutMe: string;
		  }
		| any;
	isPreview?: boolean;
	onNoMoreSlide?: (l: boolean) => void;
};

const SwipeCard: React.FC<Props> = ({ user, isPreview, onNoMoreSlide }) => {
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const [isOpenProfileDetails, setOpenProfileDetails] = useState(false);
	const [isSubscriptionOpen, setIsSubscriptionOpen] = useState({
		superLike: false,
		gold: false,
	});
	const handleNoMoreSlide = (isOnTheLeft: boolean) => {
		if (onNoMoreSlide) onNoMoreSlide(isOnTheLeft);
	};

	const handleSlideChange = (index: number) => {
		setCurrentIndex(index);
	};

	return (
		<div className="swipe-card">
			<ProfileImageSlides
				images={user?.profileMedias?.length > 0 ? user?.profileMedias : [{ url: "assets/img/noImage.png" }]}
				isClickable
				onNoMoreSlide={handleNoMoreSlide}
				onChange={handleSlideChange}
				currentIndex={currentIndex}
			/>
			<div className="card-caption">
				<IonRow className="ion-justify-content-center ion-align-items-center">
					<IonCol>
						<div className="card-title flex ion-justify-content-between ion-align-items-center">
							<div className="ion-align-items-center flex">
								<span className="card-user-name font-dosis">
									{user?.firstname} {user?.lastname}
								</span>
								<span className="card-user-age font-dosis flex ion-align-items-center">
									<IonIcon icon={ellipse} color={user?.isActive ? "success" : "#ffffff"} />
									{user?.age}</span>
								<span className="icon-verified card-user-icon">
									<img src={swipeCheckMark} alt="swipeCheckMark" className="swipe-check-mark" />
								</span>
							</div>
						</div>
						<IonIcon icon={informationCircleSharp} onClick={() => setOpenProfileDetails(true)} className="ion-info" />

						{currentIndex === 0 && (
							<div className="card-user-info">
								<div className="flex ion-align-items-center">
									<IonIcon icon={ellipse} color={user?.isActive ? "success" : "#ffffff"} />
									Recently active
								</div>
								{user?.job !== "" && (
									<div>
										<IonIcon icon={briefcaseOutline} />
										{user?.job}
									</div>
								)}
								{user?.distance?.toFixed(0) > 0 && (
									<div>
										<IonIcon icon={locationOutline} />
										{user?.distance?.toFixed(0)} kilometers away
									</div>
								)}
							</div>
						)}

						{currentIndex === 1 && (
							<div className="card-user-info">
								<div className="passion-list">
									{(user?.passionlist || user?.passions)?.map((item: { passion: string }) => (
										<IonButton fill="outline" shape="round" color="white" size="small" key={item?.passion}>
											{item?.passion}
										</IonButton>
									))}
								</div>
							</div>
						)}

						{currentIndex > 1 && (
							<div className="card-user-info">
								<p>{user?.aboutMe}</p>
							</div>
						)}
					</IonCol>
				</IonRow>
			</div>
			<IonModal
				isOpen={isOpenProfileDetails}
				onDidDismiss={() => setOpenProfileDetails(false)}
				className="profile-details-model"
			>
				<ProfileDetails
					profileDetails={user}
					onClose={() => setOpenProfileDetails(false)}
					setOpenSubscriptionModel={setIsSubscriptionOpen}
					isOpenSubscriptionModel={isSubscriptionOpen}
					type={"Matches"}
				/>
			</IonModal>

			<IonModal
				isOpen={isSubscriptionOpen?.superLike}
				onDidDismiss={() => setIsSubscriptionOpen({ ...isSubscriptionOpen, superLike: false })}
				className="super-likes-model"
			>
				<SuperLikesModal
					onClose={() => setIsSubscriptionOpen({ ...isSubscriptionOpen, superLike: false })}
					setOpenSubscriptionModel={setIsSubscriptionOpen}
					isOpenSubscriptionModel={isSubscriptionOpen}
					subscriptonType={{ type: "" }}
				/>
			</IonModal>
		</div>
	);
};

SwipeCard.defaultProps = {
	user: {},
	isPreview: false,
	onNoMoreSlide: () => {},
};

export default SwipeCard;
