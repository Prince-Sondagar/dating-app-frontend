import React, { useEffect, useState, useContext } from "react";
import {
	IonPage,
	IonContent,
	IonAvatar,
	IonIcon,
	IonButton,
	IonModal,
	IonHeader,
	IonList,
	IonListHeader,
	IonLabel,
	IonItem,
	IonNote,
	IonRange,
	IonToggle,
	IonText,
	IonRadioGroup,
	IonRadio,
} from "@ionic/react";
import { location, moonOutline } from "ionicons/icons";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import useAuth from "../../hooks/useAuth";
import PlusIntro from "../../components/PlusIntro/PlusIntro";
import ProfileEdit from "../ProfileEdit/ProfileEdit";
import AuthPage from "../../hocs/AuthPage";
import Verified from "../Verified/Verified";
import useUser from "../../hooks/useUser";
import UserVerifyIcon from "../../assets/icons/userVerifyIcon";
import PlatinumModal from "../Settings/SubscriptionModals/PlatinumModal";
import UserSubscription from "../../hooks/userSubscription";
import ProfileDetails from "../../components/PersonCard/ProfileDetails/ProfileDetails";
import AddMediaModel from "../../components/AddMediaModel/AddMediaModel";
import ViewPhoneNumber from "../../components/PhoneNumber/ViewPhoneNumber/ViewPhoneNumber";
import { useDebouncedCallback } from "use-debounce";
import LocationModal from "../Settings/DiscoverySettingModals/LocationModal";
import LookingForModal from "../Settings/DiscoverySettingModals/LookingForModal";
import CheckIcon from "../../assets/icons/checkIcon";
import LogoSovereignIcon from "../../assets/icons/logoSovereignIcon";
import { SocketContext } from "../../contexts/socketContext";
import BannerSlideIcon from "../../assets/icons/bannerSlideIcon";

import profileEditIcon from '../../assets/img/peofile-edit.svg';
import profileSettingLogo from '../../assets/img/profile-setting-logo.svg';
import logo from '../../assets/img/Logo.svg';
import "react-circular-progressbar/dist/styles.css";
import "./UserProfile.scss";

type Props = {
	history: any;
};

interface DiscoveryModal {
	lookingFor?: boolean;
	location?: boolean;
}

interface SubscriptionModal {
	platinum?: boolean;
	gold?: boolean;
	upgradeLoveLife?: boolean;
	getBoost?: boolean;
	getSuperLikes?: boolean;
}

export const lookingForList = [
	{
		displayName: "Men",
		actualName: "male",
	},
	{
		displayName: "Women",
		actualName: "female",
	},
	{
		displayName: "Everyone",
		actualName: "everyone",
	},
];

type UserProfileModals = {
	isProfileOpen: boolean;
	isVerifiedOpen: boolean;
	isProfileEditOpen: boolean;
	isAddMediaOpen: boolean;
};

type UserSubscriptionModals = {
	platinum: boolean;
	gold: boolean;
	upgradeLoveLife: boolean;
	getBoost: boolean;
};

const UserProfile: React.FC<Props> = ({ history }) => {
	const { user: userProfile } = useAuth();
	const { getDiscoverySetting, getUserProfileMedia } = useUser();
	const token: any = history?.location?.search?.split("?code=")?.[1]?.split("&")?.[0];

	const [selectedType, setSelectedType] = useState<any>("platinum");
	const [selectButtonType, setSelectedButtonType] = useState("platinum");
	const [userProfileModals, setUserProfileModals] = useState<UserProfileModals>({
		isProfileOpen: false,
		isVerifiedOpen: false,
		isProfileEditOpen: false,
		isAddMediaOpen: false,
	});
	const [isSubscriptionsOpen, setIsSubscriptionModelOpen] = useState<UserSubscriptionModals>({
		platinum: false,
		gold: false,
		upgradeLoveLife: false,
		getBoost: false,
	});

	const { subscription } = UserSubscription();
	const { subscriptionDetail } = subscription;
	const [percentage, setPercentage] = useState<any>(0);
	useEffect(() => {
		setTimeout(() => {
			setPercentage(userProfile?.discoverySetting?.isCompleted);
		}, 1000);
		if (!userProfile?.discoverySetting?.id) getDiscoverySetting();
		if (!userProfile?.profileMedias) getUserProfileMedia();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userProfile]);

	const handleUserProfileModals = (
		modalName: "isProfileOpen" | "isVerifiedOpen" | "isProfileEditOpen" | "isAddMediaOpen",
	) => {
		setUserProfileModals({ ...userProfileModals, [modalName]: !userProfileModals[modalName] });
	};


	useEffect(() => {
		if (token) {
			setUserProfileModals({ ...userProfileModals, isProfileEditOpen: true });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [token]);

	const [isPhoneNumberOpen, setIsPhoneNumberOpen] = useState<boolean>(false);
	const { user, authLogout } = useAuth();
	const [isDiscoveryOpen, setIsDiscoveryOpen] = useState<DiscoveryModal>({
		lookingFor: false,
		location: false,
	});

	const { updateDiscoverySetting, updateUserInfo, getCurrentUser } = useUser();
	const [discoverySetting, setDiscoverySetting] = useState<any>({
		...user?.discoverySetting,
		agePref: { lower: user?.discoverySetting?.agePref?.[0], upper: user?.discoverySetting?.agePref?.[1] },
	});
	const [range, setRange] = useState<boolean>(discoverySetting?.agePrefShowOnlyThisRange);
	const [dist, setDist] = useState(discoverySetting?.distancePrefShowOnlyThisRange);
	const [global, setGlobal] = useState<boolean>(discoverySetting?.global);

	const handleDiscoveryChange = useDebouncedCallback(async ({ key, value }: any) => {
		const updatedDiscoverySetting = { ...discoverySetting, [key]: value };
		setDiscoverySetting(updatedDiscoverySetting);
		const { id, location, agePref, ...resetSetting } = updatedDiscoverySetting;
		const agePrefArray = [agePref.lower, agePref.upper];
		const latLong = user?.latLong;
		await updateDiscoverySetting({ ...resetSetting, agePref: agePrefArray, latLong: latLong });
	}, 500);

	const updateUserInformation = async (body: any) => {
		await updateUserInfo(body);
		await getCurrentUser();
	};

	const [subscriptionType, setSubscriptionType] = useState("");

	const [isSubscriptionOpen, setIsSubscriptionOpen] = useState<SubscriptionModal>({
		platinum: false,
		gold: false,
		upgradeLoveLife: false,
		getBoost: false,
		getSuperLikes: false,
	});
	const updateUserControls = async (body: any) => {
		if (subscriptionDetail?.type !== "plus") {
			setSubscriptionType("plus");
			setIsSubscriptionOpen({ ...isSubscriptionOpen, platinum: true });
		} else {
			await updateUserInfo(body);
			await getCurrentUser();
		}
	};

	const { socketClient } = useContext(SocketContext);
	const handleLogout = async () => {
		await authLogout();
		await socketClient?.disconnect();
	};

	return (
		<IonPage>
			<IonContent force-overscroll="false" className="me-page">
				<div className="user-profile-header-main">
					<IonHeader className="no-border user-profile-header">
						<img src={logo} alt="logo" className="profile-logo" />
						<div className="me-header">
							<div style={{ position: "relative", width: "fit-content", margin: "auto" }} >
								<IonAvatar className="avatar" onClick={() => handleUserProfileModals("isProfileOpen")}>
									<img
										src={`${userProfile?.profileMedias?.[0]?.url ?? "assets/img/profile/noProfile.jpg"}`}
										alt="User"
									/>
								</IonAvatar>
								<div className="avtar-bg"></div>
								<div className="complete-point font-dosis">{userProfile?.discoverySetting?.isCompleted}%
									<div className="progress-bar">
										<CircularProgressbar
											value={Number(percentage)}
											circleRatio={1}
											styles={buildStyles({
												rotation: 1 / 2 + 1 / 2,
											})}
										/>
									</div>
								</div>
								<div>
									<IonButton
										fill="clear"
										className="button-custom button-icon profile-edit"
										onClick={() => handleUserProfileModals("isProfileEditOpen")}
									>
										<img src={profileEditIcon} alt="profileEditIcon" />
									</IonButton>
								</div>
								<div>
									<span className="me-title font-dosis">{userProfile?.firstname + " " + userProfile?.lastname}</span>
									<div className="me-profile-verified" onClick={() => userProfile?.isVerified || handleUserProfileModals("isVerifiedOpen")}>
										<UserVerifyIcon color={userProfile?.isVerified ? "#1786ff" : "#fff"} />
									</div>
								</div>
							</div>
							<div className="detail-holder"></div>
							<div className="me-level">{userProfile?.bio}</div>
						</div>
					</IonHeader>
				</div>
				<div className="vertical-layout safe-area-bottom">
					<div className="section-lower has-oval">
						<div className="slide-intro">
							<div className="profile-swiper-bg">
								<BannerSlideIcon color={selectButtonType === 'gold' ? "#FFC93E" : selectButtonType === 'platinum' ? "#0a0d13b3" : "#5C26DA"} />
							</div>
							<PlusIntro
								setSelectedType={setSelectedType}
								selectButtonType={selectButtonType}
								setSelectedButtonType={setSelectedButtonType}
								isSubscriptionsOpen={isSubscriptionsOpen}
							/>
						</div>

						<IonList className="list-custom control-header">
							<IonItem lines="none">
								<IonIcon icon={moonOutline} slot="start" />
								<IonLabel className="setting-main-heading">Dark Mode</IonLabel>
								<IonToggle
									color="primary"
									checked={user?.darkMode}
									onIonChange={(e) => updateUserInformation({ darkMode: !user?.darkMode })}
								/>
							</IonItem>
						</IonList>

						<IonList className="list-custom control-header">
							<IonListHeader>
								<IonLabel className="setting-main-heading">Account settings</IonLabel>
							</IonListHeader>
							<IonItem lines="none" detail onClick={() => setIsPhoneNumberOpen(true)}>
								<IonLabel className="setting-inner-heading">Phone Number</IonLabel>
								<IonNote className="setting-inner-heading" slot="end">+{user?.mobile}</IonNote>
							</IonItem>
							<IonListHeader className="help-block">
								<IonLabel className="setting-desc" color="medium">Verify a phone number to help secure your account</IonLabel>
							</IonListHeader>
						</IonList>

						<IonList className="list-custom control-header">
							<IonListHeader>
								<IonLabel className="setting-main-heading">Discover settings</IonLabel>
							</IonListHeader>
							<IonItem lines="none" onClick={() => setIsDiscoveryOpen({ ...isDiscoveryOpen, location: true })}>
								<IonLabel className="setting-inner-heading">Location</IonLabel>
								<IonNote slot="end" className="ion-text-right">
									Current Location
									<IonIcon icon={location} />
								</IonNote>
							</IonItem>
							<IonListHeader className="help-block">
								<IonLabel className="setting-desc" color="medium">Change your location to see Sovereign members in other cities</IonLabel>
							</IonListHeader>

							<IonItem lines="none">
								<IonLabel className="setting-inner-heading">Global</IonLabel>
								<IonToggle
									color="primary"
									name="global"
									checked={global}
									onIonChange={(e) => {
										handleDiscoveryChange({
											key: e.target.name,
											value: discoverySetting?.global ? false : true,
										});
										setGlobal(discoverySetting?.global ? false : true);
									}}
								/>
							</IonItem>
							<IonListHeader className="help-block">
								<IonLabel className="setting-desc" color="medium">Going global will allow you to see people nearby and from around the world</IonLabel>
							</IonListHeader>

							<IonItem lines="none">
								<IonLabel className="setting-inner-heading">Maximum Distance</IonLabel>
								<IonNote slot="end">
									{discoverySetting?.distancePref}
									{user?.distanceType}
								</IonNote>
							</IonItem>
							<IonItem lines="none">
								<IonRange
									min={2}
									max={160}
									name="distancePref"
									value={discoverySetting?.distancePref}
									onIonChange={(e) => handleDiscoveryChange({ key: e.target.name, value: e.detail.value as number })}
									color="primary"
								/>
							</IonItem>
							<IonItem lines="none">
								<IonLabel className="setting-desc setting-range-desc">Only show people in this range</IonLabel>
								<IonToggle
									color="primary"
									name="distancePrefShowOnlyThisRange"
									checked={dist}
									onIonChange={(e) => {
										handleDiscoveryChange({
											key: e.target.name,
											value: discoverySetting?.distancePrefShowOnlyThisRange ? false : true,
										});
										setDist(discoverySetting?.distancePrefShowOnlyThisRange ? false : true);
									}}
								/>
							</IonItem>


							<IonItem lines="none" detail onClick={() => setIsDiscoveryOpen({ ...isDiscoveryOpen, lookingFor: true })}>
								<IonLabel className="setting-inner-heading">Show me</IonLabel>
								<IonNote slot="end" className="setting-inner-heading">
									{lookingForList?.find((lookingFor) => lookingFor.actualName === user?.showMe)?.displayName}
								</IonNote>
							</IonItem>

							<IonItem lines="none">
								<IonLabel className="setting-inner-heading">Age Range</IonLabel>
								<IonNote slot="end">
									{discoverySetting.agePref.lower}-{discoverySetting.agePref.upper}
								</IonNote>
							</IonItem>
							<IonItem lines="none">
								<IonRange
									dualKnobs
									name="agePref"
									min={18}
									max={65}
									value={{ lower: discoverySetting.agePref.lower, upper: discoverySetting.agePref.upper }}
									onPointerUp={(e: any) => handleDiscoveryChange({ key: e.target.name, value: e.target.value as number })}
									color="primary"
								/>
							</IonItem>
							<IonItem lines="none">
								<IonLabel className="setting-desc setting-range-desc">Only show people in this range</IonLabel>
								<IonToggle
									color="primary"
									name="agePrefShowOnlyThisRange"
									checked={range}
									onIonChange={(e) => {
										handleDiscoveryChange({
											key: e.target.name,
											value: discoverySetting?.agePrefShowOnlyThisRange ? false : true,
										});
										setRange(discoverySetting?.agePrefShowOnlyThisRange ? false : true);
									}}
								/>
							</IonItem>

							<IonItem lines="none">
								<IonLabel className="setting-inner-heading">Enable discovery</IonLabel>
								<IonToggle
									color="primary"
									name="enableDiscoveryThisRange"
									onIonChange={(e) => {
										handleDiscoveryChange({
											key: e.target.name,
											value: discoverySetting?.enableDiscoveryThisRange ? false : true,
										});
									}}
								/>
							</IonItem>
							<IonListHeader className="help-block">
								<IonLabel className="setting-desc" color="medium">When turned off, your profile will be hidden from the card stack and Discovery will be disabled. <span>People you already liked</span> may still see and match with you.</IonLabel>
							</IonListHeader>
						</IonList>

						<IonList className="list-custom control-header">
							<IonListHeader>
								<IonLabel className="setting-main-heading">Chat settings</IonLabel>
							</IonListHeader>
							<IonItem lines="none">
								<IonLabel className="setting-inner-heading">Photo verified chat</IonLabel>
								<IonToggle
									color="primary"
									name="enableDiscoveryThisRange"
									onIonChange={(e) => {
										handleDiscoveryChange({
											key: e.target.name,
											value: discoverySetting?.enableDiscoveryThisRange ? false : true,
										});
									}}
								/>
							</IonItem>
							<IonListHeader className="help-block">
								<IonLabel className="setting-desc" color="medium">Photo verified members can enable this to only receive messages from other photo verified profiles</IonLabel>
							</IonListHeader>

							<IonItem lines="none">
								<IonLabel className="setting-inner-heading">Send read receipts</IonLabel>
								<IonToggle
									color="primary"
									name="enableDiscoveryThisRange"
									onIonChange={(e) => {
										handleDiscoveryChange({
											key: e.target.name,
											value: discoverySetting?.enableDiscoveryThisRange ? false : true,
										});
									}}
								/>
							</IonItem>
							<IonListHeader className="help-block">
								<IonLabel className="setting-desc" color="medium">Turning this off will prevent any matches from activating read receipts in your conversation from this moment forward.</IonLabel>
							</IonListHeader>
						</IonList>

						<IonList className="list-custom control-header">
							<IonItem lines="none" className="setting-main-heading">
								<IonLabel style={{ margin: '3px' }}>Control who you see</IonLabel>
								<IonButton fill="solid" className="button-custom setting-btn">
									<LogoSovereignIcon color="#fff" /> Plus option
								</IonButton>
							</IonItem>
							<div
								className="ion-padding-up"
								onClick={() => updateUserControls({ standard: user?.standard ? false : true })}
							>
								<IonItem lines="none" className="balance-title">
									<IonLabel className="setting-inner-heading">Balanced Recommendations </IonLabel>
									{user?.standard && <CheckIcon color="#5C26DA" />}
								</IonItem>
								<IonListHeader className="help-block">
									<IonLabel className="setting-desc" color="medium">See the most relevant people to you (default setting)</IonLabel>
								</IonListHeader>
							</div>
							<div
								className="ion-padding-up"
								onClick={() => updateUserControls({ onlyPeopleLiked: user?.onlyPeopleLiked ? false : true })}
							>
								<IonItem lines="none" className="balance-title">
									<IonLabel className="setting-inner-heading">
										Recently active{user?.onlyPeopleLiked && <CheckIcon color="var(--ion-color-gold-shade)" />}
									</IonLabel>
								</IonItem>
								<IonListHeader className="help-block">
									<IonLabel className="setting-desc" color="medium">See the most recently active people first</IonLabel>
								</IonListHeader>
							</div>
						</IonList>

						<IonList className="list-custom control-header">
							<IonListHeader>
								<IonLabel className="setting-main-heading">Notifications</IonLabel>
							</IonListHeader>
							<IonItem lines="none">
								<IonLabel className="setting-inner-heading">Email</IonLabel>
							</IonItem>
							<IonItem lines="none">
								<IonLabel className="setting-inner-heading">Push Notifications</IonLabel>
							</IonItem>
							<IonItem lines="none">
								<IonLabel className="setting-inner-heading">Team Sovereign</IonLabel>
							</IonItem>
						</IonList>

						<IonList className="list-custom control-header">
							<IonListHeader>
								<IonLabel className="setting-main-heading">Select distance unit</IonLabel>
							</IonListHeader>
							<IonRadioGroup className="distance-buttons" name="gender">
								<IonItem lines="none">
									<IonLabel>Miles (Mi)</IonLabel>
									<IonRadio value="male" />
								</IonItem>
								<IonItem lines="none">
									<IonLabel>Kilometers (Km)</IonLabel>
									<IonRadio value="female" />
								</IonItem>
							</IonRadioGroup>
						</IonList>

						<IonList className="list-custom control-header">
							<IonItem detail lines="none">
								<IonLabel className="setting-main-heading">Block contacts</IonLabel>
							</IonItem>
						</IonList>

						<IonList className="list-custom control-header">
							<IonListHeader>
								<IonLabel className="setting-main-heading">Payment account</IonLabel>
							</IonListHeader>
							<IonItem lines="none">
								<IonLabel className="setting-inner-heading">Manage Payment Account</IonLabel>
							</IonItem>
							<IonItem lines="none">
								<IonLabel className="setting-inner-heading">Restore purchase</IonLabel>
							</IonItem>
						</IonList>

						<IonList className="list-custom control-header">
							<IonListHeader>
								<IonLabel className="setting-main-heading">Contact Us</IonLabel>
							</IonListHeader>
							<IonItem lines="none">
								<IonLabel className="setting-inner-heading">Help & Support</IonLabel>
							</IonItem>
						</IonList>

						<IonList className="list-custom control-header">
							<IonListHeader>
								<IonLabel className="setting-main-heading">Community</IonLabel>
							</IonListHeader>
							<IonItem lines="none">
								<IonLabel className="setting-inner-heading">Community Guidelines</IonLabel>
							</IonItem>
							<IonItem lines="none">
								<IonLabel className="setting-inner-heading">Safety Tips</IonLabel>
							</IonItem>
							<IonItem lines="none">
								<IonLabel className="setting-inner-heading">Safety Center</IonLabel>
							</IonItem>
						</IonList>

						<IonList className="list-custom control-header">
							<IonListHeader>
								<IonLabel className="setting-main-heading">Privacy</IonLabel>
							</IonListHeader>
							<IonItem lines="none">
								<IonLabel className="setting-inner-heading">Cookie policy</IonLabel>
							</IonItem>
							<IonItem lines="none">
								<IonLabel className="setting-inner-heading">Privacy policy</IonLabel>
							</IonItem>
							<IonItem lines="none">
								<IonLabel className="setting-inner-heading">Privacy preferences</IonLabel>
							</IonItem>
						</IonList>

						<IonList className="list-custom control-header">
							<IonListHeader>
								<IonLabel className="setting-main-heading">Legal</IonLabel>
							</IonListHeader>
							<IonItem lines="none">
								<IonLabel className="setting-inner-heading">Licenses</IonLabel>
							</IonItem>
							<IonItem lines="none">
								<IonLabel className="setting-inner-heading">Terms of Service</IonLabel>
							</IonItem>
						</IonList>

						<IonList className="list-custom control-header">
							<IonItem detail lines="none">
								<IonLabel className="setting-main-heading">Share Sovereign</IonLabel>
							</IonItem>
						</IonList>

						<IonList className="list-custom" style={{ margin: '35px 0' }}>
							<IonItem lines="none" className="ion-text-center" detail={false} onClick={handleLogout}>
								<IonButton style={{ width: '100%', height: '42px' }} fill="solid" shape="round" className="font-dosis btnThemePrimary">Logout</IonButton>
							</IonItem>
						</IonList>

						<div className="ion-text-center ">
							<div>
								<img src={profileSettingLogo} alt="profileSettingLogo" />
							</div>
							<IonText className="setting-version-text">Version 10.1.0 (1010111)</IonText>
						</div>
					</div>
				</div>
			</IonContent>
			<IonModal isOpen={isPhoneNumberOpen} onDidDismiss={() => setIsPhoneNumberOpen(false)}>
				<ViewPhoneNumber onClose={() => setIsPhoneNumberOpen(false)} />
			</IonModal>

			<IonModal
				isOpen={isDiscoveryOpen?.location}
				onDidDismiss={() => setIsDiscoveryOpen({ ...isDiscoveryOpen, location: false })}
				className="location-model"
			>
				<LocationModal user={user} onClose={() => setIsDiscoveryOpen({ ...isDiscoveryOpen, location: false })} />
			</IonModal>

			<IonModal
				isOpen={isDiscoveryOpen?.lookingFor}
				onDidDismiss={() => setIsDiscoveryOpen({ ...isDiscoveryOpen, lookingFor: false })}
				className="discovery-model"
			>
				<LookingForModal
					dataList={lookingForList}
					selectedValue={user?.showMe}
					modalFooter={
						<IonText className="text-lg ion-text-center">
							<p>
								You will only see{" "}
								{lookingForList?.find((lookingFor) => lookingFor.actualName === user?.showMe)?.displayName} in
								discovery.
							</p>
						</IonText>
					}
					modalTitle="Discovery"
					updateUserInfo={(value: string) => updateUserInformation({ showMe: value })}
					onClose={() => setIsDiscoveryOpen({ ...isDiscoveryOpen, lookingFor: false })}
				/>
			</IonModal>

			<IonModal
				isOpen={isSubscriptionOpen?.platinum}
				onDidDismiss={() => setIsSubscriptionOpen({ ...isSubscriptionOpen, platinum: false })}
				className={`platinum-model`}
			>
				<PlatinumModal
					subscriptionType={subscriptionType}
					onClose={() => setIsSubscriptionOpen({ ...isSubscriptionOpen, platinum: false })}
				/>
			</IonModal>

			<IonModal
				isOpen={userProfileModals.isProfileOpen}
				onDidDismiss={() => userProfileModals.isProfileOpen && handleUserProfileModals("isProfileOpen")}
				className="profile-details-model"
			>
				<ProfileDetails
					profileDetails={{ ...userProfile, passionlist: userProfile?.passions }}
					onClose={() => handleUserProfileModals("isProfileOpen")}
					setOpenSubscriptionModel={""}
					isOpenSubscriptionModel={{ superLike: false }}
					type={"Preview"}
				/>
			</IonModal>

			<IonModal
				isOpen={userProfileModals.isProfileEditOpen}
				onDidDismiss={() => userProfileModals.isProfileEditOpen && handleUserProfileModals("isProfileEditOpen")}
			>
				<ProfileEdit user={userProfile} onClose={() => handleUserProfileModals("isProfileEditOpen")} />
			</IonModal>
			<IonModal
				isOpen={isSubscriptionsOpen?.platinum}
				onDidDismiss={() => setIsSubscriptionModelOpen({ ...isSubscriptionsOpen, platinum: false })}
				className={`platinum-model`}
			>
				<PlatinumModal
					subscriptionType={selectedType}
					onClose={() => setIsSubscriptionModelOpen({ ...isSubscriptionsOpen, platinum: false })}
				/>
			</IonModal>
			<IonModal
				isOpen={userProfileModals.isVerifiedOpen}
				onDidDismiss={() => userProfileModals.isVerifiedOpen && handleUserProfileModals("isVerifiedOpen")}
				className="verified-modal"
			>
				<Verified onClose={() => handleUserProfileModals("isVerifiedOpen")} />
			</IonModal>
			<IonModal
				isOpen={userProfileModals.isAddMediaOpen}
				onDidDismiss={() => userProfileModals.isAddMediaOpen && handleUserProfileModals("isAddMediaOpen")}
				className="add-media-modal"
			>
				<AddMediaModel
					onClose={() => handleUserProfileModals("isAddMediaOpen")}
					handleUserProfileModals={handleUserProfileModals}
				/>
			</IonModal>
		</IonPage>
	);
};

UserProfile.defaultProps = {};

export default AuthPage(UserProfile);
