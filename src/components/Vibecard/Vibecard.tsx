import React from "react";
import { IonRippleEffect } from "@ionic/react";
import "./Vibecard.scss";

type Props = {
	events: {
		image: string;
		type: string;
		description: string;
		superPassion: string;
	};
};

const Vibecard: React.FC<Props> = ({ events }) => {
	return (
		<div className="vibeCard">
			<div className="event-card background-img" style={{ backgroundImage: `url('${events.image}')` }}>
				<div className="card-inside flex al-center">
					<div className="card-title">
						<div className="btn flex al-center jc-center">
							{events.superPassion}
							<IonRippleEffect className="ripple-parent"></IonRippleEffect>
						</div>
					</div>
					<div className="bottom-holder">
						<div className="caption-title">{events.description}</div>
						<div className="caption-time">{events.type}</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Vibecard;
