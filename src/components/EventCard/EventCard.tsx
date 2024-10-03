import React from "react";
import { IonRippleEffect } from "@ionic/react";
import "./EventCard.scss";

type Props = {
	events: {
		image: string;
		type: string;
		superPassion: string;
		description: string;
	};
};

const EventCard: React.FC<Props> = ({ events }) => {
	return (
		<div className="event-card eventCardWrap background-img" style={{ backgroundImage: `url('${events.image}')` }}>
			<div className="card-inside flex al-center">
				<div className="card-title">
					<div className="btn flex al-center jc-center">
						{events.superPassion}
						<IonRippleEffect className="ripple-parent"></IonRippleEffect>
					</div>
				</div>
				<div className="bottom-holder">
					<div className="caption-title">{events.description}</div>
					<div className="caption-time">{events?.type}</div>
				</div>
			</div>
		</div>
	);
};

EventCard.defaultProps = {};

export default EventCard;
