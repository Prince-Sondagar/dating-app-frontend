import React from "react";
import {
	locationOutline,
	schoolOutline,
	briefcaseOutline,
	businessOutline,
	ellipse,
} from "ionicons/icons";
import { IonButton, IonIcon, IonContent, IonFab, IonText, IonModal } from "@ionic/react";
import ProfileImageSlides from "../../ProfileImageSlides/ProfileImageSlides";
import GoldModal from "../../../pages/Settings/SubscriptionModals/GoldModal";
import swipeCheckMark from '../../../assets/img/swipe_check_mark.svg'
import angleDown from '../../../assets/img/angle_down.svg'
import profileReport from '../../../assets/img/profile_report.svg'
import profilePassion from '../../../assets/img/profile_passion.svg'
import dogIcon from '../../../assets/img/dog_icon.svg'
import occasionsIcon from '../../../assets/img/occasions-icon.svg'
import smokerIcon from '../../../assets/img/smoker-icon.svg'
import workoutsIcon from '../../../assets/img/Workouts-icon.svg'
import birdIcon from '../../../assets/img/bird-icon.svg'
import veganIcon from '../../../assets/img/Vegan-icon.svg'
import activeIcon from '../../../assets/img/active-icon.png'
import cancerIcon from '../../../assets/img/Cancer-icon.svg'
import childrenIcon from '../../../assets/img/childreicon.svg'
import vaccinatedIcon from '../../../assets/img/Vaccinated-icon.svg'
import infpIcon from '../../../assets/img/INFP-icon.svg'
import phoneCallerIcon from "../../../assets/img/Phone-caller-icon.svg"
import thoughtfulGesturesIcon from "../../../assets/img/Thoughtful-gestures-icon.svg"
import "./ProfileDetails.scss";

type Props = {
	profileDetails: any;
	onClose: any;
	setOpenSubscriptionModel: any;
	isOpenSubscriptionModel: any;
	type: string;
};

const ProfileDetails: React.FC<Props> = ({
	profileDetails,
	onClose,
	setOpenSubscriptionModel,
	isOpenSubscriptionModel,
}) => {
	const {
		profileMedias,
		firstname,
		lastname,
		aboutMe,
		age,
		job,
		distance,
		school,
		relationShipType,
		passions,
		passionlist,
		company,
	} = profileDetails;

	return (
		<>
			<IonContent>
				<div>
					<div className="profile-header">
						<ProfileImageSlides
							images={
								profileMedias?.length
									? profileMedias
									: [
										{
											url: "assets/img/noImage.png",
										},
									]
							}
							currentIndex={0}
						/>
						<IonFab vertical="bottom" horizontal="end" edge slot="fixed">
							<IonButton className="button-custom button-icon button-sm button-brand" onClick={onClose}>
								<img src={angleDown} alt="angleDown" />
							</IonButton>
						</IonFab>
					</div>
					<div className="profile-info">
						<IonText className="text-black">
							<h3 className="ion-no-margin ion-flex ion-justify-content-start">
								{firstname} {lastname} <span className="ion-align-items-center"><IonIcon icon={ellipse} />{age}<img src={swipeCheckMark} alt="swipeCheckMark" className="swipe-check-mark" /></span>
								<img src={profileReport} alt="profileReport" className="profile-report" />
							</h3>
						</IonText>
						<div className="profile-user-info">
							{distance?.toFixed(0) > 0 && (
								<div className="info-item">
									<IonIcon icon={locationOutline} />
									{distance?.toFixed(0)} kilometers away
								</div>
							)}
							{relationShipType && (
								<div>
									<IonText className="info-item">
										<img className="profile-relationship" src="assets/img/relationship/looking_for.png" alt="relationship" />
										{relationShipType}
									</IonText>
								</div>
							)}
							{job !== "" && (
								<div className="info-item">
									<IonIcon icon={briefcaseOutline} />
									{job}
								</div>
							)}
							{company && (
								<div className="info-item">
									<IonIcon icon={businessOutline} />
									{company}
								</div>
							)}
							{school !== "" && (
								<div className="info-item">
									<IonIcon icon={schoolOutline} />
									{school}
								</div>
							)}
							{(passionlist || passions)?.length > 0 && (
								<div >
									<IonText className="text-black info-item">
										<img src={profilePassion} alt="profilePassion" className="profile-passion" />
										Passions
									</IonText>
									{(passionlist || passions)?.map((passion: any) => (
										<IonButton key={passion?.passion} className="text-black" fill="outline" shape="round" size="small">
											{passion?.passion}
										</IonButton>
									))}
								</div>
							)}
						</div>
					</div>
					<div className="ion-flex ion-justify-content-between lifestyle-info">
						<div className="lifestyle-main">
							<div className="profile-info">
								<div className="info-item">
									<h5 className="ion-no-margin font-dosis">Lifestyle</h5>
								</div>
								<div className="info-item"><img src={dogIcon} alt="dogIcon" />Has a dog</div>
								<div className="info-item"><img src={occasionsIcon} alt="occasionsIcon" />On special occasions</div>
								<div className="info-item"><img src={smokerIcon} alt="smokerIcon" />Non-smoker</div>
								<div className="info-item"><img src={workoutsIcon} alt="workoutsIcon" />Workouts often</div>
								<div className="info-item"><img src={birdIcon} alt="birdIcon" />Early bird</div>
								<div className="info-item"><img src={veganIcon} alt="veganIcon" />Vegan</div>
								<div className="info-item"><img src={activeIcon} alt="activeIcon" />Socially active</div>
							</div>
						</div>
						<div className="basics-main">
							<div className="profile-info">
								<div className="info-item">
									<h5 className="ion-no-margin font-dosis">{aboutMe}Basics</h5>
								</div>
								<div className="info-item"><img src={cancerIcon} alt="cancerIcon" />Cancer</div>
								<div className="info-item"><img src={childrenIcon} alt="childrenIcon" />Wants children</div>
								<div className="info-item"><img src={vaccinatedIcon} alt="vaccinatedIcon" />Vaccinated</div>
								<div className="info-item"><img src={infpIcon} alt="infpIcon" />INFP</div>
								<div className="info-item"><img src={phoneCallerIcon} alt="phoneCallerIcon" />Phone caller</div>
								<div className="info-item"><img src={thoughtfulGesturesIcon} alt="thoughtfulGesturesIcon" />Thoughtful gestures</div>
							</div>
						</div>
					</div>
					{aboutMe && (
						<div className="profile-info">
							<div className="info-item d-block">
								<h5 className="ion-no-margin font-dosis">About me</h5>
								<p>{aboutMe}</p>
							</div>
						</div>
					)}
				</div>
			</IonContent>
			<IonModal
				isOpen={isOpenSubscriptionModel?.gold}
				onDidDismiss={() => setOpenSubscriptionModel({ ...isOpenSubscriptionModel, gold: false })}
				className="gold-model"
			>
				<GoldModal onClose={() => setOpenSubscriptionModel({ ...isOpenSubscriptionModel, gold: false })} />
			</IonModal>
		</>
	);
};

ProfileDetails.defaultProps = {};

export default ProfileDetails;
