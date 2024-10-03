import React, { useState } from "react";
import { IonPage, IonContent, IonButtons, IonAvatar, IonText } from "@ionic/react";
import useAuth from "../../hooks/useAuth";
import DiscoveryModel from "../../components/DiscoveyModel/DiscoveryModel";
import logo from '../../assets/img/Logo.svg'
import exploreHeaderBg from '../../assets/img/explore-header-bg.svg'
import exploreHeaderBg1 from '../../assets/img/explore-header-bg1.svg'
import "../Explore/Explore.scss";

type Props = {
	history: any;
};

const Explore: React.FC<Props> = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { user: userProfile } = useAuth();

	return (
		<IonPage>
			<div>
				<img src={exploreHeaderBg} alt="exploreHeaderBg" className="explore-header-bg" />
				<img src={exploreHeaderBg1} alt="exploreHeaderBg1" className="explore-header-bg1" />
				<div className="expolre-toolbar toolbar-no-border toolbar-no-safe-area ion-padding-vertical">
					<div className="ion-flex ion-justify-content-between ion-align-items-center">
						<img src={logo} alt="logo" />
						<IonButtons>
							<IonAvatar>
								<img src={`${userProfile?.profileMedias?.[0]?.url ?? "assets/img/profile/noProfile.jpg"}`} alt="" />
							</IonAvatar>
						</IonButtons>
					</div>
					{(isLoading &&
						<div className="expolre-heading">
							<IonText className="font-dosis">Hold on there <br /> a second!</IonText>
						</div>) || null}
					{(!isLoading &&
						null) || null}
				</div>
			</div>
			<IonContent className="explore-bg explore-page" forceOverscroll={false}>
				<DiscoveryModel type={"explor"} onClose={() => { }} selectedType={""} isLoading={isLoading} setIsLoading={setIsLoading} />
			</IonContent>
		</IonPage>
	);
};

export default Explore;
