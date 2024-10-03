import { IonButton, IonContent, IonIcon, IonPage, IonText } from "@ionic/react";
import messageCard1 from "../../assets/img/message_card1.svg";
import messageCard2 from "../../assets/img/message_card2.svg";
import messageCenterLogo from "../../assets/img/message_center_logo.svg";
import { arrowForward } from "ionicons/icons";
import { Link } from "react-router-dom";
import "./MatchedModal.scss";
import { User } from "../../store/reducers/user.reducer";
import useAuth from "../../hooks/useAuth";

type Props = {
	onClose: () => void;
	matchUser: User | null;
	setMatchUser: (user: User | null) => void;
};

const Message: React.FC<Props> = ({ onClose, matchUser, setMatchUser }) => {
	const { user } = useAuth();
	const userProfileURL = user?.profileMedias?.[0]?.url;
	const matchUserProfileURL = matchUser?.profileMedias?.[0]?.url;

	return (
		<div className="message-main">
			<div className="message-content" style={{ backgroundImage: `url("assets/img/message_bg.svg")` }}>
				<div className="h-overflow">
					<div className="match-heading ion-text-end">
						<IonText className="font-dosis">
							It’s a<br />
							match!
						</IonText>
					</div>
					<div className="ion-flex ion-align-items-center">
						<div className="match-heading match-name-heading ion-text-start">
							<IonText className="font-dosis">
								{matchUser?.firstname + " " + matchUser?.lastname} <br /> likes you <br /> too!
							</IonText>
						</div>
						<img src={userProfileURL} alt="messageCard1" className="message-card1" />
					</div>
					<div className="message-center-logo">
						<img src={messageCenterLogo} alt="messageCenterLogo" />
					</div>
					<img src={matchUserProfileURL} alt="messageCard2" className="message-card2" />
					<IonButton slot="start" className="font-dosis" fill="clear" href={`/tabs/chats/${matchUser?.threadId}`}>
						Message her
					</IonButton>
					<Link
						to="#"
						className="match-keep-swiping ion-text-end ion-flex ion-justify-content-end ion-align-items-center"
					>
						<IonText
							onClick={() => {
								onClose();
								setMatchUser(null);
							}}
						>
							Keep swiping
						</IonText>
						<IonIcon icon={arrowForward} />
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Message;
