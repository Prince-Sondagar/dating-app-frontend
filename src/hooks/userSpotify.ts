import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { SocialMediaState } from "../store/reducers/socialMedia.reducer";
import {
	connectWithInstagram,
	connectWithSpotify,
	disconnectSoicalMediaAccount,
	fetchConnectedUser,
	fetchSpotifyArtist,
	refreshAnthem,
	refreshArtist,
	selectSpotifyAnthem,
	updateSpotifyArtist,
} from "../store/actions/socialMedia.action";

export interface UpdateBody {
	id: string;
	isSelected: boolean;
}

const UserSpotify = () => {
	const { spotify, artist, anthem, instagram, connected } = useSelector<RootState, SocialMediaState>(
		(state: any) => state?.socialMedia,
	);
	const getSpotifyData = connected.find(
		(item: { type: string; metadata: any }) => item?.type === "spotify" && item?.metadata,
	);
	const dispatch = useDispatch();
	const disconnectAccount = (appType: string) => {
		return dispatch<any>(disconnectSoicalMediaAccount({ appType }));
	};

	const getSpotifyArtist = () => {
		return dispatch<any>(fetchSpotifyArtist());
	};

	const getConnectedUser = () => {
		return dispatch<any>(fetchConnectedUser());
	};

	const updateArtists = async ({ id, isSelected }: UpdateBody) => {
		return dispatch<any>(updateSpotifyArtist({ id, isSelected }));
	};

	const refreshSpotifyArtist = () => {
		return dispatch<any>(refreshArtist());
	};

	const fetchSpotifyAnthem = async (search: string) => {
		return dispatch<any>(refreshAnthem({ search }));
	};

	const selectAnthem = async (type: string, selectedAnthem: any) => {
		await dispatch<any>(selectSpotifyAnthem({ type, selectedAnthem }));
	};

	const connectWithSocialMedia = async (code: string, type: string) => {
		if (type === "spotify") {
			await dispatch<any>(connectWithSpotify({ code: code, date: new Date() }));
			if (!getSpotifyData) await getConnectedUser();
		} else {
			if (code) {
				await dispatch<any>(connectWithInstagram({ code: code }));
				await getConnectedUser();
			}
		}
		if (window.location.search.includes("?code=")) {
			window.history.replaceState({}, document.title, window.location.pathname);
		}
	};
	return {
		spotify,
		instagram,
		artist,
		connected,
		anthem,
		getSpotifyArtist,
		disconnectAccount,
		updateArtists,
		connectWithSocialMedia,
		refreshSpotifyArtist,
		getConnectedUser,
		fetchSpotifyAnthem,
		selectAnthem,
	};
};

export default UserSpotify;
