import {
	IonButton,
	IonButtons,
	IonContent,
	IonFooter,
	IonHeader,
	IonIcon,
	IonItem,
	IonLabel,
	IonText,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import { checkmarkOutline, refreshOutline } from "ionicons/icons";
import React, { useEffect } from "react";
import UserSpotify from "../../../hooks/userSpotify";
import moment from "moment";
import { useDebouncedCallback } from "use-debounce";
import "../Spotify.scss";

type Props = {
	onClose: () => void;
};

const SpotifyArtistModel: React.FC<Props> = ({ onClose }) => {
	const {
		getSpotifyArtist,
		disconnectAccount,
		refreshSpotifyArtist,
		getConnectedUser,
		updateArtists,
		artist,
		connected,
	} = UserSpotify();
	const spotifyAnthem = connected?.find((obj: { type: string }) => obj.type === "spotify");
	const getSpotifyAntham = useDebouncedCallback(async () => {
		if (!artist.length) {
			getSpotifyArtist();
		}
	}, 500);

	useEffect(() => {
		getSpotifyAntham();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const refreshTime = async () => {
		await refreshSpotifyArtist();
	};

	const handleUpdateArtist = useDebouncedCallback(async (id: string, isSelected: boolean) => {
		await updateArtists({ id, isSelected });
		await getSpotifyArtist();
	}, 500);

	const handleDisconnectSpotifyAccount = async () => {
		await disconnectAccount("spotify");
		await getConnectedUser();
		onClose();
	};

	return (
		<>
			<IonHeader>
				<IonToolbar className="toolbar-no-border">
					<IonTitle className="font-xl-bold">Spotify</IonTitle>
					<IonButtons slot="end" onClick={onClose}>
						<IonButton color="primary">Done</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<div className="artistWrap">
					<div className="updatedTitle">
						<IonText>
							Last Updated :{" "}
							{moment(artist?.time ? artist?.time : spotifyAnthem?.metadata?.date).format("MMMM Do YYYY, h:mm:ss a")}
						</IonText>
						<IonIcon size="small" onClick={refreshTime} icon={refreshOutline} />
					</div>
					<IonItem lines="full" className="spotifyTitle">
						<IonText className="font-xl-bold ion-padding-bottom">My Top Spotify Artists</IonText>
					</IonItem>
					{artist?.data?.map((item: { image: string; artist: string; isSelected: any; id: string }, index: number) => (
						<IonItem
							className="artistListItem"
							lines="full"
							key={index}
							onClick={() => handleUpdateArtist(item?.id, item?.isSelected === "true" ? false : true)}
						>
							<img src={item?.image || "assets/img/noImage.png"} height={42} width={42} alt="artist" />
							<IonText className="ion-margin-start">{item?.artist}</IonText>
							<IonItem lines="none" slot="end">
								{item?.isSelected === "true" && <IonIcon icon={checkmarkOutline} color="primary" size="medium" />}
							</IonItem>
						</IonItem>
					))}
				</div>
			</IonContent>
			<IonFooter>
				<IonToolbar>
					<IonItem className="ion-text-center" lines="none" onClick={handleDisconnectSpotifyAccount}>
						<IonLabel color="primary" className="text-base-16">
							Disconnect Spotify
						</IonLabel>
					</IonItem>
				</IonToolbar>
			</IonFooter>
		</>
	);
};
export default SpotifyArtistModel;
