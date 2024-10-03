import React, { useState } from "react";
import {
	IonIcon,
	IonButton,
	IonText,
	IonContent,
	IonToolbar,
	IonButtons,
	IonItem,
	IonLabel,
	IonNote,
	IonRange,
	IonCheckbox,
	IonModal,
} from "@ionic/react";
import { close } from "ionicons/icons";
import "./GroupYourLikesModal.scss";
import UserLikes from "../../hooks/userLike";
import AddPassions from "../../pages/OnBoarding/AddPassions";
import useOnboarding from "../../hooks/useOnboarding";

type Props = {
	onClose: () => void;
	setOpenSubscriptionModel: any;
	subscriptionDetail: {
		type: string;
	};
	isOpenSubscriptionModel: {
		gold: boolean;
		platinum: boolean;
	};
};

const photosNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const GroupYourLikesModal: React.FC<Props> = ({
	onClose,
	setOpenSubscriptionModel,
	subscriptionDetail,
	isOpenSubscriptionModel,
}) => {
	const [selectPassions, setSelectPassions] = useState<any>([]);
	const { passions } = useOnboarding();
	const [isApply, setApply] = useState<any>();
	const [openPassionsModel, setOpenPassiosModel] = useState(false);
	const [filterQuery, setFilterQuery] = useState<any>({});
	const handleSelectPassions = (passion: any) => {
		const alreadySelected = selectPassions?.find((item: any) => item === passion);
		setSelectPassions(
			alreadySelected ? selectPassions?.filter((item: any) => item !== passion) : [...selectPassions, passion],
		);
	};
	const { getUserLikes } = UserLikes();
	const handleApplyGroups = async () => {
		if (subscriptionDetail?.type === "gold") {
			await getUserLikes({
				...filterQuery,
				ageRange: filterQuery?.ageRange && `${filterQuery?.ageRange?.lower},${filterQuery?.ageRange?.upper}`,
				passions: selectPassions,
			});
			onClose();
		} else {
			setOpenSubscriptionModel({ ...isOpenSubscriptionModel, gold: true });
		}
	};

	const handleOpenPassionsModel = () => {
		setOpenPassiosModel(true);
	};

	return (
		<>
			<IonContent>
				<IonToolbar className="toolbar-no-border">
					<IonButtons slot="end" onClick={onClose}>
						<IonIcon icon={close} slot="icon-only" />
					</IonButtons>
					<IonText className="ion-text-center text-black">
						<h2>Group Your Likes</h2>
					</IonText>
				</IonToolbar>
				<IonItem lines="none">
					<IonLabel className="text-black">Maximum Distance</IonLabel>
					<IonNote slot="end" className="text-gray">
						{filterQuery?.maxDistance || 0} km.
					</IonNote>
				</IonItem>
				<IonItem lines="none" className="border-b">
					<IonRange
						min={0}
						max={161}
						name="distancePref"
						value={filterQuery?.maxDistance}
						onIonChange={(e) => {
							setFilterQuery({ ...filterQuery, maxDistance: e.detail.value });
							setApply({ ...isApply, maxDistance: e.target.value });
						}}
						color="primary"
					/>
				</IonItem>
				<IonItem lines="none">
					<IonLabel className="text-black">Age Range</IonLabel>
					<IonNote slot="end" className="text-gray">
						{filterQuery?.ageRange?.upper > 18
							? `${filterQuery?.ageRange?.lower} - ${filterQuery?.ageRange?.upper}`
							: 18}
					</IonNote>
				</IonItem>
				<IonItem lines="none" className="border-b">
					<IonRange
						dualKnobs
						name="agePref"
						inputMode="numeric"
						min={18}
						max={100}
						value={filterQuery?.ageRange}
						onPointerUp={(e: any) => {
							setFilterQuery({ ...filterQuery, ageRange: e.target.value });
							setApply({ ...isApply, ageRange: e.target.value });
						}}
						color="primary"
					/>
				</IonItem>
				<IonItem lines="none">
					<IonLabel className="text-black">Minimum Number of Photos</IonLabel>
				</IonItem>
				<IonItem lines="none" className="border-b photo-num-item">
					<div>
						{photosNumber?.map((num) => (
							<IonButton
								key={num}
								shape="round"
								fill="outline"
								className={`${filterQuery?.minPhotos === num ? "border-active text-black" : "text-gray"}`}
								onClick={() => {
									setFilterQuery({ ...filterQuery, minPhotos: num });
									setApply({ ...isApply, minPhotos: num });
								}}
							>
								{num}
							</IonButton>
						))}
					</div>
				</IonItem>
				<IonItem lines="none">
					<IonLabel className="text-black">Passions</IonLabel>
				</IonItem>
				<IonItem lines="none">
					<div>
						{passions
							?.filter((_, index) => index < 5)
							?.map((item: any, index) => (
								<IonButton
									key={index}
									shape="round"
									fill="outline"
									className={selectPassions?.includes(item?.id) ? "border-active text-black" : `text-gray`}
									onClick={() => {
										handleSelectPassions(item?.id);
									}}
								>
									{item?.passion}
								</IonButton>
							))}
					</div>
				</IonItem>
				<IonItem lines="none" className="border-b">
					<div>
						<IonButton fill="clear" onClick={handleOpenPassionsModel}>
							See All Passions
						</IonButton>
					</div>
				</IonItem>
				<IonItem lines="none" className="border-b verified-sect">
					<IonLabel className="text-black">Is Verified</IonLabel>
					<IonCheckbox
						slot="end"
						onClick={() => {
							setFilterQuery({ ...filterQuery, isVerified: filterQuery?.isVerified ? false : true });
							setApply({ ...isApply, isVerified: filterQuery?.isVerified ? false : true });
						}}
					></IonCheckbox>
				</IonItem>
				<IonItem lines="none" className="border-b verified-sect">
					<IonLabel className="text-black">Has a Bio</IonLabel>
					<IonCheckbox
						slot="end"
						onClick={() => {
							setFilterQuery({ ...filterQuery, hasBio: filterQuery?.hasBio ? false : true });
							setApply({ ...isApply, hasBio: filterQuery?.hasBio ? false : true });
						}}
					></IonCheckbox>
				</IonItem>
				<IonItem lines="none" className="btn-bottom-sect">
					<div className="flex" style={{ width: "100%", minHeight: "50px" }}>
						<IonButton fill="clear" className="text-gray ion-no-margin" onClick={onClose}>
							Clear
						</IonButton>
						<IonButton
							fill="clear"
							slot="end"
							className="btn-active ion-no-margin"
							disabled={
								!isApply?.maxDistance &&
								!(isApply?.ageRange?.upper > 18) &&
								!isApply?.minPhotos &&
								!(selectPassions?.length > 0) &&
								!isApply?.isVerified &&
								!isApply?.hasBio
							}
							onClick={handleApplyGroups}
						>
							Apply
						</IonButton>
					</div>
				</IonItem>
			</IonContent>
			<IonModal
				isOpen={openPassionsModel}
				onDidDismiss={() => setOpenPassiosModel(false)}
				className="add-passions-modal"
			>
				<AddPassions
					onClose={() => setOpenPassiosModel(false)}
					onSelectValues={setSelectPassions}
					data={passions}
					selectedValues={selectPassions}
					type={"group"}
				/>
			</IonModal>
		</>
	);
};

GroupYourLikesModal.defaultProps = {};

export default GroupYourLikesModal;
