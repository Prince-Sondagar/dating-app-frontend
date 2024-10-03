/**
  Random Avatar for Ionic 6 React
  v1.0.0 (27/04/2022)
  Ion Wizard (https://ionwizard.gumroad.com)
*/

import React from "react";
import "./Avatar.scss";

type Props = {
	size?: string;
	customSize?: number;
	imageUrl?: string | boolean
};

const RandomAvatar: React.FC<Props> = ({ size, customSize, imageUrl }) => {
	const styles = {
		backgroundImage: `url(${(imageUrl ? imageUrl: "assets/img/unknow_person.jpg")})`,
	} as React.CSSProperties;
	let classes = "avatar";

	if (size) {
		classes = `${classes} avatar-${size}`;
	}

	if (customSize) {
		styles.width = customSize;
		styles.height = customSize;
	}

	return (
		<div className="random-avatar">
			<div className={classes} style={styles} />
		</div>
	);
};

RandomAvatar.defaultProps = {};

export default RandomAvatar;
