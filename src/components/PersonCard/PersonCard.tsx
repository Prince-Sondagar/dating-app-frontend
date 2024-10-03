import React from "react";
import { IonIcon } from "@ionic/react";
import { ellipse, heart } from "ionicons/icons";
import swipeCheckMark from '../../assets/img/swipe_check_mark.svg'
import "./PersonCard.scss";

type Props = {
	user: {
		profile_image_url: string;
		name: string;
		age: number;
		firstname: string;
		lastname: string;
		createdAt: string;
		avatar: string;
		profileMedias: any;
	};
	type: string;
	setOpenSubscriptionModel: any;
	isOpenSubscriptionModel: {
		superLike: boolean;
	};
	createdAt: string;
	subscriptionDetail: any;
};

const PersonCard: React.FC<Props> = ({
	user,
	type,
	setOpenSubscriptionModel,
	isOpenSubscriptionModel,
	subscriptionDetail,
	createdAt,
}) => {
	let userData = (
		<div className="card-caption">
			<div className="bg-overlay-bottom">
				<div className="font-dosis ion-no-margin ion-flex ion-justify-content-start like-info">
					{user?.firstname} {user?.lastname} <span className="ion-align-items-center"><IonIcon icon={ellipse} />{user?.age}<img src={swipeCheckMark} alt="swipeCheckMark" className="swipe-check-mark" /></span>
				</div>
				<div>yhth</div>
				<div className="heart-icon" >
					<IonIcon icon={heart} />
				</div>
			</div>
		</div>
	);
	return (
		<div className={`person-card background-img bg-overlay-sect`}>
			{type === "LIKES" && subscriptionDetail?.type !== "gold" ? (
				<>
					<div className="bg-overlay-img">
						<img src={user?.avatar || "assets/img/noImage.png"} alt="No Image Available" />
					</div>
					<div className="bg-overlay-bottom">
						<div className="font-dosis ion-no-margin ion-flex ion-justify-content-start like-info">
							{user?.firstname} {user?.lastname} <span className="ion-align-items-center"><IonIcon icon={ellipse} />{user?.age}<img src={swipeCheckMark} alt="swipeCheckMark" className="swipe-check-mark" /></span>
						</div>
						<div></div>
						<div className="heart-icon ion-flex ion-justify-content-center ion-align-items-center" >
							<IonIcon icon={heart} />
						</div>
					</div>
				</>
			) : (
				<div className="bg-overlay-img bg-with-subs">
					<img
						src={user?.profileMedias?.[0]?.url || "assets/img/noImage.png"}
						width={"100%"}
						height={"100%"}
						alt="No Image Available"
					/>
				</div>
			)}
			{type === "TOPPICKS" ? userData : type === "LIKES" && subscriptionDetail?.type === "gold" && userData}
		</div>
	);
};

PersonCard.defaultProps = {};

export default PersonCard;
