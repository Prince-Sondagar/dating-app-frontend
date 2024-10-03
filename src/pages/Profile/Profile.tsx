import React from "react";
import { IonHeader, IonToolbar, IonContent, IonFab, IonButton, IonIcon, IonText } from "@ionic/react";
import {
	arrowDown,
	briefcaseOutline,
	locationOutline,
	informationCircle,
	personOutline,
	schoolOutline,
	businessOutline,
} from "ionicons/icons";
import ProfileImageSlides from "../../components/ProfileImageSlides/ProfileImageSlides";
import "./Profile.scss";

type Props = {
	user: any;
	onClose: () => void;
};

const Profile: React.FC<Props> = ({ user, onClose }) => {
	if (!user) return null;

	return (
		<>
			<IonHeader>
				<IonToolbar className="toolbar-reduced toolbar-no-border" color="light" />
			</IonHeader>

			<IonContent className="profile-page">
				<div className="profile-header">
					<ProfileImageSlides images={user.profileMedias} currentIndex={0} />
					<IonFab vertical="bottom" horizontal="end" edge slot="fixed">
						<IonButton className="button-custom button-icon button-sm button-brand" onClick={onClose}>
							<IonIcon icon={arrowDown} slot="icon-only" />
						</IonButton>
					</IonFab>
				</div>

				<div className="profile-info border-bottom">
					<IonText className="text-black">
						<h3 className="ion-no-margin">
							{user?.firstname} {user?.lastname} <span>{user?.age}</span>
						</h3>
					</IonText>
					<div className="profile-user-info">
						{user?.school !== "" && (
							<div className="info-item">
								<IonIcon icon={schoolOutline} />
								{user?.school}
							</div>
						)}
						{user?.job !== "" && (
							<div className="info-item">
								<IonIcon icon={briefcaseOutline} />
								{user?.job}
							</div>
						)}
						{user?.company !== "" && (
							<div className="info-item">
								<IonIcon icon={businessOutline} />
								{user?.company}
							</div>
						)}
						{user?.distance?.toFixed(0) > 0 && (
							<div className="info-item border-bottom">
								<IonIcon icon={locationOutline} />
								{user?.distance?.toFixed(0)} kilometers away
							</div>
						)}
					</div>
				</div>
				{(user?.bio || user?.aboutMe) && (
					<div className="profile-info border-bottom">
						<div className="info-item">
							<IonIcon icon={personOutline} />
							{user?.bio}
						</div>
						<div className="info-item">
							<IonIcon icon={informationCircle} />
							{user?.aboutMe}
						</div>
					</div>
				)}
				{/* {instagram && (
					<div className="profile-info border-bottom">
						<IonText className="text-black">
							<h6 className="ion-no-margin">Insta id :- {instagram?.username}</h6>
						</IonText>
					</div>
				)} */}
				{user?.lookingFor?.for && (
					<div className="profile-info border-bottom">
						<IonText className="text-black">
							<h5 className="ion-no-margin">Relationship Goals</h5>
						</IonText>
						<IonButton className="text-black" fill="outline" shape="round" size="small">
							<img src="assets/img/relationship/cupid.png" alt="relationship" />
							{user?.lookingFor?.for}
						</IonButton>
					</div>
				)}
				{user?.relationShipType && (
					<div className="profile-info border-bottom">
						<IonText className="text-black">
							<h5 className="ion-no-margin">Relationship Type</h5>
						</IonText>
						<IonButton className="text-black" fill="outline" shape="round" size="small">
							<img src="assets/img/relationship/looking_for.png" alt="relationship" />
							{user?.relationShipType}
						</IonButton>
					</div>
				)}
				{user?.passions?.length > 0 && (
					<div className="profile-info border-bottom">
						<IonText className="text-black">
							<h5 className="ion-no-margin">Passions</h5>
						</IonText>
						<div className="passion-list">
							{user?.passions.map(({ passion }: any, index: number) => (
								<IonButton key={index} fill="outline" shape="round" color="medium" size="small">
									{passion}
								</IonButton>
							))}
						</div>
					</div>
				)}
				{/* {spotify && (
					<div className="profile-info border-bottom">
						<IonText className="text-black">
							<h5 className="ion-no-margin">My Anthem</h5>
						</IonText>
						<IonLabel>
							<div>{spotify?.selectedAnthem?.artist?.[0]?.name}</div>
							<div className="text-sm">
								<IonText color="medium">{spotify?.selectedAnthem?.name}</IonText>
							</div>
						</IonLabel>
					</div>
				)} */}
				<div className="profile-share border-bottom">
					<IonButton fill="clear" expand="block" color="primary" size="small">
						<div className="button-label">
							<div>SHARE SHONA FAITH'S PROFILE</div>
							<div>SEE WHAT A FRIEND THINKS</div>
						</div>
					</IonButton>
				</div>

				<div className="profile-footer border-bottom">
					<IonButton fill="clear" expand="block" color="medium" size="small">
						<div className="button-label">REPORT THIS PROFILE</div>
					</IonButton>
				</div>
			</IonContent>
		</>
	);
};

Profile.defaultProps = {};

export default Profile;
