const FavouriteIcon = () => {
	return (
		<svg focusable="false" aria-hidden="true" role="presentation" viewBox="0 0 24 24" width="52px" height="52px" className="Expand">
			<defs>
				<linearGradient id="a" x1="51.617%" x2="29.582%" y1="17.649%" y2="100%">
					<stop offset="0%" stopColor="#26e4f0" />
					<stop offset="100%" stopColor="#43b3f7" />
				</linearGradient>
			</defs>
			<path d="M21.06 9.06l-5.47-.66c-.15 0-.39-.25-.47-.41l-2.34-5.25c-.47-.99-1.17-.99-1.56 0L8.87 7.99c0 .16-.23.4-.47.4l-5.47.66c-1.01 0-1.25.83-.46 1.65l4.06 3.77c.15.16.23.5.15.66L5.6 20.87c-.16.98.4 1.48 1.33.82l4.69-2.79h.78l4.69 2.87c.78.58 1.56 0 1.25-.98l-1.02-5.75s0-.4.23-.57l3.91-3.86c.78-.82.78-1.64-.39-1.64v.08z" fill="url(#a)"></path>
		</svg>
	);
};
export default FavouriteIcon;
