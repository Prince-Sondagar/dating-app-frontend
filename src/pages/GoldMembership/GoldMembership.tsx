import React from "react";
import { IonContent, IonText, IonButton } from "@ionic/react";
import {} from "ionicons/icons";
import PlusIntro from "../../components/PlusIntro/PlusIntro";
import "./GoldMembership.scss";

type Props = {
	onClose: () => void;
};

const GoldMembership: React.FC<Props> = ({ onClose }) => {
	return (
		<>
			<IonContent forceOverscroll={false} scrollY={false} className="gold-membership-page bg-light">
				<div className="header-title">
					<IonText color="gold">
						<strong>Get TradLife Gold</strong>
					</IonText>
				</div>
				<div className="slides-intro">
					{/* <PlusIntro
						setSelectedType={() => {}}
						selectedType={""}
            setSelectedButtonType={() => {}}
						isSubscriptionsOpen={{ platinum: false, getBoost: false, gold: false, upgradeLoveLife: false }}
					/> */}
				</div>

				<div className="price-tag">
					<div className="plan-name">
						<div className="number-big">1</div>
						<div>
							<strong>month</strong>
						</div>
						<IonText color="medium">$4.95/mo</IonText>
					</div>
					<div className="total">
						<div className="text-lg">
							<strong>$4.95</strong>
						</div>
					</div>
				</div>

				<div className="button-group">
					<IonButton shape="round" expand="block" color="gold" onClick={onClose}>
						<strong>CONTINUE</strong>
					</IonButton>

					<IonButton fill="clear" expand="block" color="medium" onClick={onClose}>
						<strong>No Thanks</strong>
					</IonButton>
				</div>
			</IonContent>
		</>
	);
};

GoldMembership.defaultProps = {};

export default GoldMembership;
