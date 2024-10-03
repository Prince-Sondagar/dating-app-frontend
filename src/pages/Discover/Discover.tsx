import React, { useState } from "react";
import {
	IonPage,
	IonHeader,
	IonContent,
	IonRow,
	IonCol,
	IonModal,
	useIonViewWillEnter,
	IonText,
	IonLabel,
	IonButton,
} from "@ionic/react";
import EventCard from "../../components/EventCard/EventCard";
import Testcard from "../../components/Vibecard/Vibecard";
import DiscoveryModel from "../../components/DiscoveyModel/DiscoveryModel";
import useUser from "../../hooks/useUser";
import useAuth from "../../hooks/useAuth";
import ProfileEdit from "../ProfileEdit/ProfileEdit";
import "./Discover.scss";

const Discover: React.FC = () => {
	const { user: userProfile } = useAuth();
	const { user, getUserSuperPassions } = useUser();
	const [isOpenExplorModel, setOpenExplorModel] = useState(false);
	const [selectedType, setSelectedType] = useState<any>("");
	const { userSuperPassions }: any = user;
	useIonViewWillEnter(() => {
		getUserSuperPassions();
	}, []);
	const [isDiscoveryOpen, setIsDiscoveryOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	return (
		<IonPage>
			<IonHeader className="header-custom"></IonHeader>

			<IonContent className="discover-page ion-padding">
				<div className="section">
					<div className="title">
						<IonText>Welcome to Discover</IonText>
						<IonLabel>My Vibe... </IonLabel>
					</div>

					<div>
						<IonRow className="passionExplore">
							{userSuperPassions?.myVibe?.map((event: any, index: number) => (
								<IonCol
									size="6"
									sizeMd="4"
									sizeLg="3"
									key={index}
									onClick={() => {
										setOpenExplorModel(true);
										setSelectedType(event);
									}}
								>
									<Testcard events={event} />
								</IonCol>
							))}
							{!userSuperPassions?.myVibe?.length && !userSuperPassions?.forYou?.length && (
								<div className="passionNoExplore">
									<IonText>
										<h5>No Data Available</h5>
									</IonText>
									<IonText>
										<h6>Please select different passions</h6>
									</IonText>
									<IonButton
										fill="solid"
										shape="round"
										className={`ion-no-margin btn-gradient`}
										onClick={() => setIsDiscoveryOpen(true)}
									>
										Setting
									</IonButton>
								</div>
							)}
						</IonRow>
					</div>
				</div>

				{(userSuperPassions?.forYou?.length && (
					<div className="section">
						<div className="title">
							<IonText>For You</IonText>
							<IonLabel>Recommendations based on your profile</IonLabel>
						</div>

						<div>
							<IonRow className="passionExplore">
								{userSuperPassions?.forYou?.map((event: any) => (
									<IonCol
										size="6"
										sizeMd="4"
										sizeLg="3"
										key={event.id}
										onClick={() => {
											setOpenExplorModel(true);
											setSelectedType(event);
										}}
									>
										<EventCard events={event} />
									</IonCol>
								))}
							</IonRow>
						</div>
					</div>
				)) ||
					null}
			</IonContent>
			<IonModal
				className="explore-bg explore-page discovery-bg-gradient"
				isOpen={isOpenExplorModel}
				onDidDismiss={() => setOpenExplorModel(false)}
			>
				<DiscoveryModel type={"discovery"} onClose={() => setOpenExplorModel(false)} selectedType={selectedType} isLoading={isLoading} setIsLoading={setIsLoading} />
			</IonModal>
			<IonModal isOpen={isDiscoveryOpen} onDidDismiss={() => setIsDiscoveryOpen(false)}>
				<ProfileEdit user={userProfile} onClose={() => setIsDiscoveryOpen(false)} />
			</IonModal>
		</IonPage>
	);
};

Discover.defaultProps = {};

export default Discover;
