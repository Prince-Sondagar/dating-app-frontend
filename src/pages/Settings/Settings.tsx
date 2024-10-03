import React, { useState, useEffect, useContext } from "react";
import {
	IonHeader,
	IonToolbar,
	IonModal,
	IonTitle,
	IonButtons,
	IonButton,
	IonContent,
	IonCard,
	IonCardContent,
	IonIcon,
	IonText,
	IonGrid,
	IonRow,
	IonCol,
	IonList,
	IonItem,
	IonLabel,
	IonToggle,
	IonListHeader,
	IonNote,
	IonRange,
} from "@ionic/react";
import { flame, flash, star, moonOutline } from "ionicons/icons";
import useAuth from "../../hooks/useAuth";
import ThemeService from "../../services/theme.service";
import ViewPhoneNumber from "../../components/PhoneNumber/ViewPhoneNumber/ViewPhoneNumber";
import useUser from "../../hooks/useUser";
import LookingForModal from "./DiscoverySettingModals/LookingForModal";
import UserSubscription from "../../hooks/userSubscription";
import LocationModal from "./DiscoverySettingModals/LocationModal";
import PlatinumModal from "./SubscriptionModals/PlatinumModal";
import GoldModal from "./SubscriptionModals/GoldModal";
import UpgradeLoveLifeModal from "./SubscriptionModals/UpgradeLoveLifeModal";
import ManagePaymentAcModal from "./AccountSettingModals/ManagePaymentAcModal";
import GetBoostModal from "./SubscriptionModals/GetBoostModal";
import SuperLikesModal from "./SubscriptionModals/SuperLikesModal";
import { useDebouncedCallback } from "use-debounce";

import "./Settings.scss";
import { SocketContext } from "../../contexts/socketContext";
import CheckIcon from "../../assets/icons/checkIcon";
import WebProfileModel from "../../components/WebProfile/WebProfileModel";
import TradLifeIcon from "../../assets/icons/tradlifeIcon";
import DistanceTyoeModel from "../../components/DistanceTypeModel/DistanceTypeModel";

type Props = {
	history: any;
	onClose: () => void;
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

const Settings: React.FC<Props> = ({ onClose, history }) => {
	const { socketClient } = useContext(SocketContext);
	const [isPhoneNumberOpen, setIsPhoneNumberOpen] = useState<boolean>(false);
	const [isManageAcOpen, setIsManageAcOpen] = useState<boolean>(false);
	const [isDiscoveryOpen, setIsDiscoveryOpen] = useState<DiscoveryModal>({
		lookingFor: false,
		location: false,
	});
	const [isCopyUrl, setCopyUrl] = useState(false);
	const [isOpenProfileModel, setOpenProfileModel] = useState({
		username: false,
		readReceipts: false,
		activeStatus: false,
	});
	const [isOpenDistanceTypeModel, setOpenDistanceTypeModel] = useState(false);

	useEffect(() => {
		getCurrentUser();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const [isSubscriptionOpen, setIsSubscriptionOpen] = useState<SubscriptionModal>({
		platinum: false,
		gold: false,
		upgradeLoveLife: false,
		getBoost: false,
		getSuperLikes: false,
	});

	const [subscriptionType, setSubscriptionType] = useState("");
	const { user, authLogout } = useAuth();
	const { subscription, getUserPaymentMethods } = UserSubscription();
	const {
		subscriptionDetail: { subscriptionDetail },
	} = subscription;

	const { updateDiscoverySetting, updateUserInfo, getCurrentUser } = useUser();
	const [discoverySetting, setDiscoverySetting] = useState<any>({
		...user?.discoverySetting,
		agePref: { lower: user?.discoverySetting?.agePref?.[0], upper: user?.discoverySetting?.agePref?.[1] },
	});

	const handleLogout = async () => {
		await authLogout();
		await socketClient?.disconnect();
	};

	const [dist, setDist] = useState(discoverySetting?.distancePrefShowOnlyThisRange);
	const [range, setRange] = useState<boolean>(discoverySetting?.agePrefShowOnlyThisRange);
	const [global, setGlobal] = useState<boolean>(discoverySetting?.global);
	const [showMeOnApp, setShowMeOnApp] = useState<boolean>(discoverySetting?.showMeOnApp);

	const updateUserInformation = async (body: any) => {
		await updateUserInfo(body);
		await getCurrentUser();
	};

	useEffect(() => {
		ThemeService.toggleDarkMode(user?.darkMode);
	}, [user]);

	const updateUserControls = async (body: any) => {
		if (subscriptionDetail?.type !== "plus") {
			setSubscriptionType("plus");
			setIsSubscriptionOpen({ ...isSubscriptionOpen, platinum: true });
		} else {
			await updateUserInfo(body);
			await getCurrentUser();
		}
	};

	const handleDiscoveryChange = useDebouncedCallback(async ({ key, value }: any) => {
		const updatedDiscoverySetting = { ...discoverySetting, [key]: value };
		setDiscoverySetting(updatedDiscoverySetting);
		const { id, location, agePref, ...resetSetting } = updatedDiscoverySetting;
		const agePrefArray = [agePref.lower, agePref.upper];
		const latLong = user?.latLong;
		await updateDiscoverySetting({ ...resetSetting, agePref: agePrefArray, latLong: latLong });
	}, 500);

	useEffect(() => {
		setTimeout(() => {
			setCopyUrl(false);
		}, 2000);
	}, [isCopyUrl]);

	return (
		<>
			<IonHeader>
				<IonToolbar className="toolbar-no-border">
					<IonTitle>Settings</IonTitle>
					<IonButtons slot="end">
						<IonButton color="primary" onClick={onClose}>
							Done
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>

			<IonContent className="settings-page bg-light">
				<div className="cards-wrapper">
					<IonCard
						className="card-custom"
						onClick={() => {
							setIsSubscriptionOpen({
								...isSubscriptionOpen,
								[subscriptionDetail?.type === "platinum" ? "upgradeLoveLife" : "platinum"]: true,
							});
							setSubscriptionType("platinum");
						}}
					>
						<IonCardContent>
							<div className="plan-title platinum-title">
								<IonIcon icon={flame} />
								TradLife
								<span>PLATINUM</span>
							</div>
							<div>
								<IonText color="medium">Level up every action you take on TradLife</IonText>
							</div>
						</IonCardContent>
					</IonCard>
					<IonCard
						className="card-custom"
						onClick={() => {
							setIsSubscriptionOpen({
								...isSubscriptionOpen,
								[subscriptionDetail?.type === "gold" ? "upgradeLoveLife" : "gold"]: true,
							});
							setSubscriptionType("gold");
						}}
					>
						<IonCardContent>
							<div className="plan-title">
								<IonIcon icon={flame} className="color-gold" />
								TradLife
								<span className="color-gold">GOLD</span>
							</div>
							<div>
								<IonText color="medium">Unlock Our Most Exclusive Features</IonText>
							</div>
						</IonCardContent>
					</IonCard>

					<IonCard
						className="card-custom"
						onClick={() => {
							setIsSubscriptionOpen({
								...isSubscriptionOpen,
								[subscriptionDetail?.type === "plus" ? "upgradeLoveLife" : "platinum"]: true,
							});
							setSubscriptionType("plus");
						}}
					>
						<IonCardContent>
							<div className="plan-title trade-plus">
								<IonIcon icon={flame} />
								TradLife
								<IonText>+</IonText>
							</div>
							<div>
								<IonText color="medium">Unlimited Likes & More!</IonText>
							</div>
						</IonCardContent>
					</IonCard>
					{!subscriptionDetail?.type && (
						<IonCard
							className="card-custom"
							onClick={() => setIsSubscriptionOpen({ ...isSubscriptionOpen, upgradeLoveLife: true })}
						>
							<IonCardContent>
								<div className="plan-title">
									<IonIcon icon={flame} className="color-gold" />
									<IonText className="upgrade-title">Upgrade Your Love Life</IonText>
								</div>
								<div>
									<IonText color="medium">Subscribe to TradLife for premium features</IonText>
								</div>
							</IonCardContent>
						</IonCard>
					)}

					<IonGrid className="grid-no-padding grid-half">
						<IonRow>
							<IonCol>
								<IonCard
									className="card-custom card-custom-half"
									onClick={() => setIsSubscriptionOpen({ ...isSubscriptionOpen, getBoost: true })}
								>
									<IonCardContent className="padding-reduced">
										<IonButton color="white" className="button-custom button-icon button-xs">
											<IonIcon slot="icon-only" icon={flash} className="color-purple" />
										</IonButton>
										<div>{user?.boosts} remaining</div>
										<div className="color-purple">Get Boosts</div>
									</IonCardContent>
								</IonCard>
							</IonCol>
							<IonCol>
								<IonCard
									className="card-custom card-custom-half"
									onClick={() => setIsSubscriptionOpen({ ...isSubscriptionOpen, getSuperLikes: true })}
								>
									<IonCardContent className="padding-reduced">
										<IonButton color="white" className="button-custom button-icon button-xs">
											<IonIcon slot="icon-only" icon={star} className="color-blue" />
										</IonButton>
										<div>{user?.superLikes} remaining</div>
										<div className="color-blue">Get Super Likes</div>
									</IonCardContent>
								</IonCard>
							</IonCol>
						</IonRow>
					</IonGrid>
				</div>

				<IonList className="list-custom control-header">
					<IonItem lines="none" className="ion-padding-start">
						<IonIcon icon={moonOutline} slot="start" />
						<IonLabel>Dark Mode</IonLabel>
						<IonToggle
							color="primary"
							checked={user?.darkMode}
							onIonChange={(e) => updateUserInformation({ darkMode: user?.darkMode ? false : true })}
						/>
					</IonItem>
				</IonList>

				<IonList className="list-custom control-header">
					<IonListHeader>
						<IonLabel>ACCOUNT SETTINGS</IonLabel>
					</IonListHeader>
					<IonItem
						detail
						onClick={() => {
							setIsManageAcOpen(true);
							getUserPaymentMethods();
						}}
					>
						<IonLabel>Manage Payment Account</IonLabel>
					</IonItem>
					<IonItem detail onClick={() => setIsPhoneNumberOpen(true)}>
						<IonLabel>Phone Number</IonLabel>
						<IonNote slot="end">+{user?.mobile}</IonNote>
					</IonItem>
					<IonItem detail lines="none">
						<IonLabel>Email</IonLabel>
						<IonNote slot="end" color="primary">
							{user?.email}
						</IonNote>
					</IonItem>
					<IonListHeader className="help-block">
						<IonLabel color="medium">A verified phone number and email help secure your account.</IonLabel>
					</IonListHeader>
				</IonList>

				<IonList className="list-custom control-header">
					<IonListHeader>
						<IonLabel>DISCOVERY</IonLabel>
					</IonListHeader>
					<IonItem detail onClick={() => setIsDiscoveryOpen({ ...isDiscoveryOpen, location: true })}>
						<div className="location-curr">
							<IonLabel>Location</IonLabel>
							<IonNote slot="end" className="ion-text-right">
								My Current Location
								<br />
								<span className="text-sm">{discoverySetting?.location}</span>
							</IonNote>
						</div>
					</IonItem>
					<IonItem lines="none">
						<IonLabel>Maximum Distance</IonLabel>
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
					<IonItem>
						<IonLabel>Only show people in this range</IonLabel>
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
					<IonItem detail onClick={() => setIsDiscoveryOpen({ ...isDiscoveryOpen, lookingFor: true })}>
						<IonLabel>Looking for</IonLabel>
						<IonNote slot="end">
							{lookingForList?.find((lookingFor) => lookingFor.actualName === user?.showMe)?.displayName}
						</IonNote>
					</IonItem>
					<IonItem lines="none">
						<IonLabel>Age Range</IonLabel>
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
						<IonLabel>Only show people in this range</IonLabel>
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
				</IonList>

				<IonList className="list-custom control-header">
					<IonItem lines="none">
						<IonLabel>Global</IonLabel>
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
					<IonItem lines="none">
						<IonLabel>Show me on TradLife</IonLabel>
						<IonToggle
							color="primary"
							name="showMeOnApp"
							checked={showMeOnApp}
							onIonChange={(e) => {
								handleDiscoveryChange({
									key: e.target.name,
									value: discoverySetting?.showMeOnApp ? false : true,
								});
								setShowMeOnApp(discoverySetting?.showMeOnApp ? false : true);
							}}
						/>
					</IonItem>
					<IonListHeader className="help-block">
						<IonLabel className="subTitle ion-padding-end">
							Going global will allow you to see people from around the world after you’ve run out of profiles nearby.
						</IonLabel>
					</IonListHeader>
				</IonList>

				<IonList className="list-custom control-header">
					<IonListHeader className="listHeader">
						<IonLabel>Control Who You See</IonLabel>
						<IonButton fill="solid" className="button-custom">
							TradLife Plus®
						</IonButton>
					</IonListHeader>
					<div
						className="ion-padding-up"
						onClick={() =>
							updateUserControls({
								balancedRecommendations: user?.balancedRecommendations ? false : true,
							})
						}
					>
						<IonItem lines="none" className="balance-title">
							<IonLabel>
								Balanced Recommendations{" "}
								{user?.balancedRecommendations && <CheckIcon color="var(--ion-color-gold-shade)" />}
							</IonLabel>
						</IonItem>
						<IonItem lines="full" className="balance-title">
							<IonText className="ion-padding-start">See the most relevant people to you (default)</IonText>
						</IonItem>
					</div>
					<div
						className="ion-padding-up"
						onClick={() => updateUserControls({ recentlyActive: user?.recentlyActive ? false : true })}
					>
						<IonItem lines="none" className="balance-title">
							<IonLabel>
								Recently Active {user?.recentlyActive && <CheckIcon color="var(--ion-color-gold-shade)" />}
							</IonLabel>
						</IonItem>
						<IonItem lines="full" className="balance-title">
							<IonText className="ion-padding-start">See the most recently active people first</IonText>
						</IonItem>
					</div>
				</IonList>

				<IonList className="list-custom control-header">
					<IonListHeader className="listHeader">
						<IonLabel>Control Who See You</IonLabel>
						<IonButton fill="solid" className="button-custom">
							TradLife Plus®
						</IonButton>
					</IonListHeader>
					<div
						className="ion-padding-up"
						onClick={() => updateUserControls({ standard: user?.standard ? false : true })}
					>
						<IonItem lines="none" className="balance-title">
							<IonLabel>Standard {user?.standard && <CheckIcon color="var(--ion-color-gold-shade)" />}</IonLabel>
						</IonItem>
						<IonItem lines="full" className="balance-title">
							<IonText className="ion-padding-start">
								Only be shown to certain types of people for individual recommendations
							</IonText>
						</IonItem>
					</div>
					<div
						className="ion-padding-up"
						onClick={() => updateUserControls({ onlyPeopleLiked: user?.onlyPeopleLiked ? false : true })}
					>
						<IonItem lines="none" className="balance-title">
							<IonLabel>
								Only People I've Liked {user?.onlyPeopleLiked && <CheckIcon color="var(--ion-color-gold-shade)" />}
							</IonLabel>
						</IonItem>
						<IonItem lines="full" className="balance-title">
							<IonText className="ion-padding-start">Only people I've right swiped will see me</IonText>
						</IonItem>
					</div>
				</IonList>

				<IonListHeader className="help-block">
					<IonLabel className="subTitle">
						While turned off, you will not be shown in the card stack. You can still see and chat with your matches.
					</IonLabel>
				</IonListHeader>

				<IonList className="list-custom control-header">
					<IonListHeader className="listHeader">
						<IonLabel>Display Preference</IonLabel>
					</IonListHeader>
					<div>
						<IonItem detail lines="full">
							<IonLabel>Language</IonLabel>
							<IonNote slot="end">English</IonNote>
						</IonItem>
						<IonItem detail lines="none" onClick={() => setOpenDistanceTypeModel(true)}>
							<IonLabel>Show Distance in</IonLabel>
							<IonNote slot="end">{user?.distanceType}.</IonNote>
						</IonItem>
					</div>
				</IonList>

				<IonList className="list-custom control-header">
					<IonListHeader className="listHeader">
						<IonLabel>Web Profile</IonLabel>
					</IonListHeader>
					<div>
						<IonItem
							detail
							lines="full"
							onClick={() => {
								setOpenProfileModel({ ...isOpenProfileModel, username: true });
							}}
						>
							<IonLabel>Username</IonLabel>
							<IonNote slot="end">{user?.firstname}</IonNote>
						</IonItem>
						<IonItem
							lines="none"
							onClick={() => {
								setCopyUrl(true);
								navigator.clipboard.writeText(`${window.location.origin}/@${user?.email.split("@")[0]}`);
							}}
						>
							<IonLabel>{!isCopyUrl ? "Share My URL" : "Copied to Clipboard"}</IonLabel>
						</IonItem>
					</div>
				</IonList>

				<IonList className="list-custom control-header">
					<IonListHeader>
						<IonLabel>Read Receipts</IonLabel>
					</IonListHeader>
					<IonItem detail lines="none">
						<IonLabel>Manage Read Receipts</IonLabel>
					</IonItem>
				</IonList>

				<IonList className="list-custom">
					<IonListHeader>
						<IonLabel>Activity Status</IonLabel>
					</IonListHeader>
					<IonItem detail lines="none">
						<IonLabel>Recently Active Status</IonLabel>
					</IonItem>
				</IonList>

				<IonList className="list-custom">
					<IonListHeader>
						<IonLabel>TOP PICKS</IonLabel>
					</IonListHeader>
					<IonItem detail lines="none">
						<IonLabel>Manage Top Picks</IonLabel>
						<IonNote slot="end">Settings</IonNote>
					</IonItem>
				</IonList>

				<IonList className="list-custom control-header">
					<IonListHeader>
						<IonLabel>SWIPE SURGE</IonLabel>
					</IonListHeader>
					<IonItem detail lines="none">
						<IonLabel>Manage Swipe Surge</IonLabel>
						<IonNote slot="end">Settings</IonNote>
					</IonItem>
				</IonList>

				<IonList className="list-custom control-header">
					<IonListHeader>
						<IonLabel>FEED SETTINGS</IonLabel>
					</IonListHeader>
					<IonItem detail lines="none">
						<IonLabel>Shared Content</IonLabel>
					</IonItem>
				</IonList>

				<IonList className="list-custom control-header">
					<IonListHeader>
						<IonLabel>DATA USAGE</IonLabel>
					</IonListHeader>
					<IonItem detail lines="none">
						<IonLabel>Autoplay Videos</IonLabel>
					</IonItem>
				</IonList>

				{/* <IonList className="list-custom">
					<IonListHeader>
						<IonLabel>WEB PROFILE</IonLabel>
					</IonListHeader>
					<IonItem detail lines="none">
						<IonLabel>Username</IonLabel>
						<IonNote slot="end">Claim yours</IonNote>
					</IonItem>
					<IonListHeader className="help-block">
						<IonLabel color="medium">
							Create a public Username. Share your Username. Have people all over the world swipe you on TradLife.
						</IonLabel>
					</IonListHeader>
				</IonList> */}

				<IonList className="list-custom control-header">
					<IonListHeader>
						<IonLabel>NOTIFICATIONS</IonLabel>
					</IonListHeader>
					<IonItem detail>
						<IonLabel>Email</IonLabel>
					</IonItem>
					<IonItem detail>
						<IonLabel>Push Notifications</IonLabel>
					</IonItem>
					<IonItem detail lines="none">
						<IonLabel>Team TradLife</IonLabel>
					</IonItem>
					<IonListHeader className="help-block">
						<IonLabel color="medium">Pick which notifications to see while in app.</IonLabel>
					</IonListHeader>
				</IonList>

				<IonList className="list-custom control-header">
					<IonItem className="ion-text-center" button detail={false}>
						<IonLabel>Restore Purchases</IonLabel>
					</IonItem>
				</IonList>

				<IonList className="list-custom control-header">
					<IonItem className="ion-text-center" button detail={false} lines="none">
						<IonLabel>Share TradLife</IonLabel>
					</IonItem>
				</IonList>

				<IonList className="list-custom control-header">
					<IonListHeader>
						<IonLabel>CONTACT US</IonLabel>
					</IonListHeader>
					<IonItem detail lines="none">
						<IonLabel>Help & Support</IonLabel>
					</IonItem>
				</IonList>

				<IonList className="list-custom control-header">
					<IonListHeader>
						<IonLabel>COMMUNITY</IonLabel>
					</IonListHeader>
					<IonItem detail>
						<IonLabel>Community Guidelines</IonLabel>
					</IonItem>
					<IonItem detail lines="none">
						<IonLabel>Safety Tips</IonLabel>
					</IonItem>
				</IonList>

				<IonList className="list-custom control-header">
					<IonListHeader>
						<IonLabel>LEGAL</IonLabel>
					</IonListHeader>
					<IonItem detail>
						<IonLabel>Privacy Policy</IonLabel>
					</IonItem>
					<IonItem detail>
						<IonLabel>Terms of Service</IonLabel>
					</IonItem>
					<IonItem detail>
						<IonLabel>Licenses</IonLabel>
					</IonItem>
				</IonList>

				<IonList className="list-custom">
					<IonItem className="ion-text-center" button detail={false} onClick={handleLogout}>
						<IonLabel>Logout</IonLabel>
					</IonItem>
				</IonList>

				<div className="ion-text-center ion-padding">
					<div>
						<TradLifeIcon color="var(--ion-color-gold-shade)" />
					</div>
					<div>Version 1.0.0</div>
				</div>

				<div className="safe-area-bottom">
					<IonList className="list-custom">
						<IonItem className="ion-text-center" button detail={false} lines="none">
							<IonLabel>Delete Account</IonLabel>
						</IonItem>
					</IonList>
				</div>
			</IonContent>
			<IonModal isOpen={isManageAcOpen} onDidDismiss={() => setIsManageAcOpen(false)} className="manage-ac-model">
				<ManagePaymentAcModal
					onClose={() => setIsManageAcOpen(false)}
					subscriptionDetail={subscription?.subscriptionDetail}
					cardDetails={subscription?.paymentMethods}
				/>
			</IonModal>

			<IonModal isOpen={isPhoneNumberOpen} onDidDismiss={() => setIsPhoneNumberOpen(false)}>
				<ViewPhoneNumber onClose={() => setIsPhoneNumberOpen(false)} />
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
				isOpen={isDiscoveryOpen?.location}
				onDidDismiss={() => setIsDiscoveryOpen({ ...isDiscoveryOpen, location: false })}
				className="location-model"
			>
				<LocationModal user={user} onClose={() => setIsDiscoveryOpen({ ...isDiscoveryOpen, location: false })} />
			</IonModal>

			<IonModal
				isOpen={isSubscriptionOpen?.platinum}
				onDidDismiss={() => setIsSubscriptionOpen({ ...isSubscriptionOpen, platinum: false })}
				className={`platinum-model  ${subscriptionType === "plus" && "plus-model"} ${
					subscriptionDetail?.id ? "platinum-subscribe-model" : ""
				}`}
			>
				<PlatinumModal
					subscriptionType={subscriptionType}
					onClose={() => setIsSubscriptionOpen({ ...isSubscriptionOpen, platinum: false })}
				/>
			</IonModal>
			<IonModal
				isOpen={isSubscriptionOpen?.gold}
				onDidDismiss={() => setIsSubscriptionOpen({ ...isSubscriptionOpen, gold: false })}
				className="gold-model"
			>
				<GoldModal onClose={() => setIsSubscriptionOpen({ ...isSubscriptionOpen, gold: false })} />
			</IonModal>
			<IonModal
				isOpen={isSubscriptionOpen?.upgradeLoveLife}
				onDidDismiss={() => setIsSubscriptionOpen({ ...isSubscriptionOpen, upgradeLoveLife: false })}
				className="upgrade-model"
			>
				<UpgradeLoveLifeModal
					onClose={() => setIsSubscriptionOpen({ ...isSubscriptionOpen, upgradeLoveLife: false })}
					getSubscriptionDetails={subscription?.subscription}
					subscriptionType={subscriptionType}
					setSubscriptionType={setSubscriptionType}
					purchasedPlan={subscription?.subscriptionDetail}
				/>
			</IonModal>
			<IonModal
				isOpen={isSubscriptionOpen?.getBoost}
				onDidDismiss={() => setIsSubscriptionOpen({ ...isSubscriptionOpen, getBoost: false })}
				className="boost-model"
			>
				<GetBoostModal onClose={() => setIsSubscriptionOpen({ ...isSubscriptionOpen, getBoost: false })} />
			</IonModal>

			<IonModal
				isOpen={isSubscriptionOpen?.getSuperLikes}
				onDidDismiss={() => setIsSubscriptionOpen({ ...isSubscriptionOpen, getSuperLikes: false })}
				className="super-likes-model"
			>
				<SuperLikesModal
					onClose={() => setIsSubscriptionOpen({ ...isSubscriptionOpen, getSuperLikes: false })}
					setOpenSubscriptionModel={setIsSubscriptionOpen}
					isOpenSubscriptionModel={{ gold: true }}
					subscriptonType={{ type: "" }}
				/>
			</IonModal>

			<IonModal
				className="web-profile-model"
				isOpen={isOpenProfileModel?.username}
				onDidDismiss={() => setOpenProfileModel({ ...isOpenProfileModel, username: false })}
			>
				<WebProfileModel onClose={() => setOpenProfileModel({ ...isOpenProfileModel, username: false })} user={user} />
			</IonModal>

			<IonModal isOpen={isOpenDistanceTypeModel} onDidDismiss={() => setOpenDistanceTypeModel(false)}>
				<DistanceTyoeModel onClose={() => setOpenDistanceTypeModel(false)} />
			</IonModal>
		</>
	);
};

Settings.defaultProps = {};

export default Settings;
