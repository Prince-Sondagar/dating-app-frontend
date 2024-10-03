import React, { useState, useRef, useEffect } from "react";
import {
	IonHeader,
	IonButton,
	IonLabel,
	IonContent,
	IonGrid,
	IonRow,
	IonCol,
	IonIcon,
	IonList,
	IonItem,
	IonToggle,
	IonTextarea,
	IonNote,
	IonText,
	IonModal,
} from "@ionic/react";
import {
	close,
	moonOutline,
	schoolOutline,
	manOutline,
	medkitOutline,
	extensionPuzzle,
	chatboxEllipsesOutline,
	heartHalfOutline,
	footstepsOutline,
	beerOutline,
	logoNoSmoking,
	barbellOutline,
	pizzaOutline,
	atOutline,
	sunnyOutline,
	closeCircleSharp,
	addCircleOutline,
	briefcaseOutline,
	businessOutline,
	locationSharp
} from "ionicons/icons";
import Passions from "../Passions/Passions";
import useUser from "../../hooks/useUser";
import ImageCropper from "../OnBoarding/ImageCropper";
import { User } from "../../store/reducers/user.reducer";
import UserSubscription from "../../hooks/userSubscription";
import PlatinumModal from "../Settings/SubscriptionModals/PlatinumModal";
import { Basics, LifeStyle } from "../../utils/basics-lifestyle";
import BasicLifestyleModel from "../../components/BasicLifestyleModel/BasicLifestyleModel";
import { useHistory } from "react-router";
import UserSpotify from "../../hooks/userSpotify";
import { useDebouncedCallback } from "use-debounce";

import LanguageIcon from "../../assets/icons/languageIcon";
import LookingForIcon from "../../assets/icons/lookingForIcon";
import gender from "../../assets/img/gender.svg";
import sovereing from "../../assets/img/sovereing.svg";
import "./ProfileEdit.scss";

type Props = {
	user: User | undefined;
	onClose: () => void;
};

type isImageCroper = {
	isOpen: boolean;
	file: any;
};

const ProfileEdit: React.FC<Props> = ({ user, onClose }) => {
	const { discoverySetting }: any = user;
	const imagesInputRef: any = useRef();
	const lifestyleItems = [
		{
			label: "Pets",
			type: "pets",
			value: discoverySetting?.pets,
			icon: moonOutline,
		},
		{
			label: "Drinking",
			type: "drinking",
			value: discoverySetting?.drinking,
			icon: schoolOutline,
		},
		{
			label: "Smoking",
			type: "smoking",
			value: discoverySetting?.smoking,
			icon: manOutline,
		},
		{
			label: "Workout",
			type: "workout",
			value: discoverySetting?.workout,
			icon: medkitOutline,
		},
		{
			label: "Dietary Preference",
			type: "dietaryPreference",
			value: discoverySetting?.dietaryPreference,
			icon: extensionPuzzle,
		},
		{
			label: "Social Media",
			type: "socialMedia",
			value: discoverySetting?.socialMedia,
			icon: chatboxEllipsesOutline,
		},
		{
			label: "Sleeping Habits",
			type: "sleepingHabits",
			value: discoverySetting?.sleepingHabits,
			icon: heartHalfOutline,
		},
	];
	const basicItems = [
		{
			label: "Zodiac",
			type: "zodiacSign",
			value: discoverySetting?.zodiacSign,
			icon: footstepsOutline,
		},
		{
			label: "Education",
			type: "educationLevel",
			value: discoverySetting?.educationLevel,
			icon: beerOutline,
		},
		{
			label: "Family Plans",
			type: "childrens",
			value: discoverySetting?.childrens,
			icon: logoNoSmoking,
		},
		{
			label: "COVID Vaccine",
			type: "vaccinated",
			value: discoverySetting?.vaccinated,
			icon: barbellOutline,
		},
		{
			label: "Personality Type",
			type: "personalityType",
			value: discoverySetting?.personalityType,
			icon: pizzaOutline,
		},
		{
			label: "Communication Style",
			type: "communicationStyle",
			value: discoverySetting?.communicationStyle,
			icon: atOutline,
		},
		{
			label: "Love Style",
			type: "receiveLove",
			value: discoverySetting?.receiveLove,
			icon: sunnyOutline,
		},
	];
	const history = useHistory();
	const { updateUserInfo, getUserProfileMedia, removeUserProfileMedia, getCurrentUser } = useUser();
	const { artist, getSpotifyArtist, connected, connectWithSocialMedia } =
		UserSpotify();
	const [userProfile, setUserProfile] = useState<any>({
		...user,
		passions: user?.passions?.map(({ id }) => id),
	});
	const { subscription, getUserPerchasedSubscription } = UserSubscription();
	const [isPassionsOpen, setIsPassionsOpen] = useState<boolean>(false);
	const [isImageCroper, setIsImageCroper] = useState<isImageCroper>({
		isOpen: false,
		file: undefined,
	});
	const [openPlusModel, setOpenPlusModel] = useState(false);
	const [isOpenBasicLifeStyleModel, setOpenBasicLifeStyleModel] = useState(false);
	const [selectedType, setSelectedType] = useState("");
	const [isScrollType, setScrollType] = useState("");
	const {
		subscriptionDetail: { subscriptionDetail },
	} = subscription;

	const {
		zodiacSign,
		educationLevel,
		communicationStyle,
		childrens,
		personalityType,
		receiveLove,
		vaccinated,
		dietaryPreference,
		drinking,
		pets,
		sleepingHabits,
		smoking,
		socialMedia,
		workout,
	} = discoverySetting || {};

	useEffect(() => {
		setUserProfile({ ...user, passionlist: user?.passions, passions: user?.passions?.map(({ id }) => id) });
	}, [user]);

	const getTypeData = (data: any, type: string) => {
		const result = data?.find((obj: { type: string }) => obj.type === type);
		return result ? result?.metadata : null;
	};

	const spotifyMetadata = getTypeData(connected, "spotify");

	const handleOpenPassions = () => {
		setIsPassionsOpen(true);
	};

	const removeSelectedImage = async (id: string) => {
		await removeUserProfileMedia({ profileMediaIds: id });
		await getUserProfileMedia();
	};

	const onSelectProfilePhoto = async (blob: any) => {
		const file = new File([blob], isImageCroper?.file?.name ?? blob.name, { type: blob.type });

		await updateUserInfo({ profileImages: [file] });
		await getUserProfileMedia();
	};

	const handleChangeProfile = async (key: string, value: any, shouldCallAPI: boolean = true) => {
		setUserProfile({ ...userProfile, [key]: value });
		if (shouldCallAPI) {
			await updateUserInfo({ [key]: value });
			await getCurrentUser();
		}
	};

	const handlePassionsChange = (id: string) => {
		const getPassion = userProfile?.passions?.find((passionId: string) => passionId === id);
		const editedPassion =
			getPassion || userProfile?.passions?.length === 5
				? userProfile?.passions?.filter((passionId: string) => passionId !== id)
				: [...(userProfile?.passions ?? []), id];
		handleChangeProfile("passions", editedPassion, false);
	};

	useEffect(() => {
		getUserPerchasedSubscription();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleClickOnControlProfile = async (key: string, value: boolean) => {
		if (subscriptionDetail?.type === "plus") {
			setUserProfile((prevCheckControls: any) => ({ ...prevCheckControls, [key]: !prevCheckControls[key] }));
			await updateUserInfo({ [key]: value });
		} else {
			setOpenPlusModel(true);
		}
	};

	const handleOpenTypesModel = (open: boolean, type: string, scrollType: string) => {
		if (type === "Basic") {
			setSelectedType(type);
		} else {
			setSelectedType(type);
		}
		setScrollType(scrollType);
		setOpenBasicLifeStyleModel(open);
	};
	const code: any = history?.location?.search?.split("?code=")?.[1]?.split("&")?.[0];
	const state = history?.location?.search?.split("&state=")?.[1];

	useEffect(() => {
		connectWithSocialMedia(code, state);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [code]);

	const getArtist = useDebouncedCallback(async () => {
		await getSpotifyArtist();
	}, 500);

	useEffect(() => {
		if (spotifyMetadata && !artist?.length) {
			getArtist();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [spotifyMetadata]);

	return (
		<>
			<IonHeader className="profile-edit-header">
				<IonIcon icon={close} onClick={onClose} />
				<IonText className="font-dosis">Edit profile</IonText>
			</IonHeader>
			<IonContent className="profile-edit-page bg-light">
				<div className="full-height">
					<div className="photos-edit">
						<div className="flex ion-align-items-center ion-justify-content-between chip-toolbar">
							<div className="flex ion-align-items-center">
								<h6 className="ion-no-margin">Media</h6>
								<span>IMPORTANT</span>
							</div>
							<h5 className="ion-no-margin">+40%</h5>
						</div>
						<IonGrid>
							<IonRow>
								{userProfile?.profileMedias?.map((image: any, i: number) => (
									<IonCol size="4" className="photo-item" key={i}>
										<div className="photo-image background-img" style={{ backgroundImage: `url(${image?.url})` }} />
										{userProfile?.profileMedias && userProfile?.profileMedias?.length > 2 && (
											<div className="photo-button" onClick={() => removeSelectedImage(image?.id)}>
												<IonIcon icon={closeCircleSharp} />
											</div>
										)}
									</IonCol>
								))}
								{Array.from({
									length: 6 - (userProfile?.profileMedias ? userProfile?.profileMedias?.length : 0),
								}).map((_, i) => (
									<IonCol size="4" className="photo-item no-photo" key={i}>
										<div className="photo-image background-img" />
										<div
											className="photo-button photo-button-invert"
											onClick={() => imagesInputRef.current.click()}
										>
											<IonIcon icon={addCircleOutline} />
										</div>
									</IonCol>
								))}
							</IonRow>
							<input
								type="file"
								ref={imagesInputRef}
								hidden
								name="profileImages"
								accept="image/*"
								onChange={({ target }) => {
									setIsImageCroper({ isOpen: true, file: target.files?.[0] });
									if (imagesInputRef.current) imagesInputRef.current.value = "";
								}}
							/>
						</IonGrid>
					</div>
					<div className="profile-list-items">
						<IonList className="list-about-me ion-no-margin">
							<div className="flex ion-align-items-center ion-justify-content-between chip-toolbar">
								<div className="flex ion-align-items-center">
									<h6 className="ion-no-margin">About me</h6>
									<span>IMPORTANT</span>
								</div>
								<h5 className="ion-no-margin">+25%</h5>
							</div>
							<div className="textarea-about">
								<IonTextarea
									rows={3}
									value={userProfile?.aboutMe}
									name="aboutMe"
									placeholder="Let people know a little more about you"
									onIonChange={(e) => handleChangeProfile(e.target.name, e.target.value, false)}
									onBlur={() => handleChangeProfile("aboutMe", userProfile?.aboutMe)}
								/>
								<IonNote slot="end">{500 - userProfile?.aboutMe?.length}</IonNote>
							</div>
						</IonList>
						<div className="passion-list">
							<IonLabel className="block common-title">Passions</IonLabel>
							<div className="orientation-sect">
								{user?.passions?.map((passion, index) =>
									<IonButton
										key={index}
										fill="outline"
										shape="round"
										className="passion-item"
									>
										{passion.passion}
									</IonButton>
								)}
								<IonButton
									className="btn-passions"
									fill="outline"
									onClick={handleOpenPassions}
								>
									<IonIcon icon={addCircleOutline} size="small" /> Add Passion
								</IonButton>
							</div>
						</div>
						<div className="title-wrapper">
							<IonText className="common-title">Looking for</IonText>
							<IonItem detail lines="none">
								<IonLabel className="ion-align-items-center">
									<LookingForIcon color="var(--ion-text-new-dark)" />
									Short-term, open to long
								</IonLabel>
								<IonNote slot="end"></IonNote>
							</IonItem>
						</div>
						<div className="title-wrapper">
							<IonText className="common-title">Languages I know</IonText>
							<IonItem detail lines="none">
								<IonLabel className="ion-align-items-center">
									<LanguageIcon color="var(--ion-text-new-dark)" />
									English, Spanish
								</IonLabel>
								<IonNote slot="end"></IonNote>
							</IonItem>
						</div>
						<IonList className="basic-detail">
							<div className="flex ion-align-items-center ion-justify-content-between chip-toolbar">
								<div className="flex ion-align-items-center">
									<h6 className="ion-no-margin">Basics</h6>
									{(!(zodiacSign || educationLevel || communicationStyle || childrens || personalityType || receiveLove || vaccinated) && (
										<span>IMPORTANT</span>)) || null}
								</div>
								{(!(zodiacSign || educationLevel || communicationStyle || childrens || personalityType || receiveLove || vaccinated) &&
									(<h5 className="ion-no-margin">+3%</h5>
									)) || null}
							</div>
							<div className="title-wrapper">
								{basicItems.map((item, index) => (
									<IonItem key={index} detail lines="none" className="basic-icons" onClick={() => handleOpenTypesModel(true, "Basic", item.type)}>
										<IonLabel className="ion-align-items-center">
											<IonIcon icon={item?.icon} />
											{item.label}
										</IonLabel>
										<IonNote slot="end">
											{item.value ? item.value : "Add"}
										</IonNote>
									</IonItem>
								))}
							</div>
						</IonList>
						<IonList className="basic-detail">
							<div className="flex ion-align-items-center ion-justify-content-between chip-toolbar">
								<div className="flex ion-align-items-center">
									<h6 className="ion-no-margin">Lifestyle</h6>
									{(!(dietaryPreference || drinking || pets || sleepingHabits || smoking || socialMedia || workout) && (
										<span>IMPORTANT</span>)) || null}
								</div>
								{(!(dietaryPreference || drinking || pets || sleepingHabits || smoking || socialMedia || workout) &&
									(<h5 className="ion-no-margin">+3%</h5>)) || null}
							</div>
							<div className="title-wrapper">
								{lifestyleItems.map((item, index) => (
									<IonItem key={index} detail lines="none" className="basic-icons" onClick={() => handleOpenTypesModel(true, "Lifestyle", item.type)}>
										<IonLabel className="ion-align-items-center">
											<IonIcon icon={item?.icon} />
											{item.label}
										</IonLabel>
										<IonNote slot="end">
											{item.value ? item.value : "Add"}
										</IonNote>
									</IonItem>
								))}
							</div>
						</IonList>
						<IonList className="job-list ion-margin-bottom">
							<div className="flex ion-align-items-center ion-justify-content-between chip-toolbar">
								<div className="flex ion-align-items-center">
									<h6 className="ion-no-margin">Job</h6>
								</div>
								{(!(user?.job || user?.company) && (<h5 className="ion-no-margin">+5%</h5>)) || null}
							</div>
							<div className="title-wrapper">
								<IonItem detail lines="none">
									<IonLabel className="ion-align-items-center"><IonIcon icon={briefcaseOutline} /> Job title</IonLabel>
									<IonNote slot="end">Designer</IonNote>
								</IonItem>
								<IonItem detail lines="none">
									<IonLabel className="ion-align-items-center"><IonIcon icon={businessOutline} /> Company</IonLabel>
									<IonNote slot="end">The Knifes</IonNote>
								</IonItem>
							</div>
						</IonList>
						<IonList className="job-list ion-margin-bottom">
							<div className="flex ion-align-items-center ion-justify-content-between chip-toolbar">
								<div className="flex ion-align-items-center">
									<h6 className="ion-no-margin">School</h6>
								</div>
								{!user?.school && (<h5 className="ion-no-margin">+5%</h5>)}
							</div>
							<div className="title-wrapper">
								<IonItem detail lines="none">
									<IonLabel className="ion-align-items-center"><IonIcon icon={schoolOutline} /> School</IonLabel>
									<IonNote slot="end">Harvard</IonNote>
								</IonItem>
							</div>
						</IonList>
						<IonList className="job-list ion-margin-bottom">
							<div className="flex ion-align-items-center ion-justify-content-between chip-toolbar">
								<div className="flex ion-align-items-center">
									<h6 className="ion-no-margin">Living In</h6>
								</div>
								<h5 className="ion-no-margin">+5%</h5>
							</div>
							<div className="title-wrapper">
								<IonItem detail lines="none">
									<IonLabel className="ion-align-items-center"><IonIcon icon={locationSharp} /> City</IonLabel>
									<IonNote slot="end">Barcelona</IonNote>
								</IonItem>
							</div>
						</IonList>
						<IonList className="job-list ion-margin-bottom">
							<div className="flex ion-align-items-center ion-justify-content-between chip-toolbar">
								<div className="flex ion-align-items-center">
									<h6 className="ion-no-margin">Gender</h6>
								</div>
							</div>
							<div className="title-wrapper">
								<IonItem detail lines="none">
									<IonLabel className="ion-align-items-center"><IonIcon icon={gender} /> Gender</IonLabel>
									<IonNote slot="end">Male</IonNote>
								</IonItem>
							</div>
						</IonList>
						<IonList className="control-list">
							<div className="flex ion-align-items-center ion-justify-content-between chip-toolbar">
								<div className="flex ion-align-items-center">
									<h6 className="ion-no-margin">Control your profile</h6>
									<span className="font-dosis"><IonIcon icon={sovereing} /> Plus option</span>
								</div>
							</div>
							<div className="title-wrapper">
								<div className="flex ion-align-items-center ion-justify-content-between ion-margin-bottom">
									<IonLabel>Do not show my age</IonLabel>
									<IonToggle
										color="primary"
										checked={userProfile?.showMyAge}
										onClick={() => handleClickOnControlProfile("showMyAge", userProfile?.showMyAge ? false : true)}
									/>
								</div>
								<div className="flex ion-align-items-center ion-justify-content-between">
									<IonLabel>Do not show my distance</IonLabel>
									<IonToggle
										color="primary"
										checked={userProfile?.showMyDistance}
										onClick={() =>
											handleClickOnControlProfile("showMyDistance", userProfile?.showMyDistance ? false : true)
										}
									/>
								</div>
							</div>
						</IonList>
					</div>
				</div>
				<IonModal isOpen={isPassionsOpen}>
					<Passions
						selectedPassions={userProfile?.passions}
						handlePassionsChange={handlePassionsChange}
						onClose={() => {
							handleChangeProfile("passions", userProfile?.passions, true);
							setIsPassionsOpen(false);
						}}
					/>
				</IonModal>
				<IonModal
					isOpen={isImageCroper.isOpen}
					onDidDismiss={() => setIsImageCroper({ ...isImageCroper, isOpen: false })}
					className="image-cropper-modal"
				>
					<ImageCropper
						selectedValue={isImageCroper.file && URL.createObjectURL(isImageCroper.file)}
						onCompleteImageCrop={onSelectProfilePhoto}
						onClose={() => setIsImageCroper({ ...isImageCroper, isOpen: false })}
					/>
				</IonModal>
			</IonContent>
			<IonModal
				isOpen={openPlusModel}
				onDidDismiss={() => setOpenPlusModel(false)}
				className={`platinum-model plus-model ${subscriptionDetail?.id ? "platinum-subscribe-model" : ""}`}
			>
				<PlatinumModal subscriptionType={"plus"} onClose={() => setOpenPlusModel(false)} />
			</IonModal>
			<IonModal
				isOpen={isOpenBasicLifeStyleModel}
				onDidDismiss={() => setOpenBasicLifeStyleModel(false)}
				className="basic-lifestyle-modal"
			>
				<BasicLifestyleModel
					onClose={() => setOpenBasicLifeStyleModel(false)}
					data={selectedType === "Basic" ? Basics : LifeStyle}
					title={selectedType === "Basic" ? "Basic" : "Lifestyle"}
					subTitle={
						selectedType === "Basic"
							? "Bring your best self forward by adding more about you"
							: "Bring your best self forward by adding your lifestyle"
					}
					type={isScrollType}
				/>
			</IonModal>
		</>
	);
};

ProfileEdit.defaultProps = {};

export default ProfileEdit;
