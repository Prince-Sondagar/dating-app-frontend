import {
	IonButton,
	IonButtons,
	IonContent,
	IonHeader,
	IonIcon,
	IonItem,
	IonLabel,
	IonSearchbar,
	IonText,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import UserSpotify from "../../../hooks/userSpotify";
import { useDebouncedCallback } from "use-debounce";
import { logoRss } from "ionicons/icons";
import "../Spotify.scss";

type Props = {
	onClose: () => void;
};

interface ISelectedItem {}

const SpotifyAnthemModel: React.FC<Props> = ({ onClose }) => {
	const { fetchSpotifyAnthem, getConnectedUser, anthem, selectAnthem } = UserSpotify();
	const [searchValue, setSearchValue] = useState<string>("");

	useEffect(() => {
		fetchSpotifyAnthem("");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleSearchMessages = useDebouncedCallback((value: string) => {
		setSearchValue(value);
		fetchSpotifyAnthem(value);
	}, 500);

	const handleSelectSpotifyAnthem = async (item: ISelectedItem) => {
		await selectAnthem("select", item);
		await getConnectedUser();
		onClose();
	};

	const handleDeleteAnthem = async () => {
		await selectAnthem("unselect", {});
		await getConnectedUser();
		onClose();
	};

	return (
		<>
			<IonHeader>
				<IonToolbar className="toolbar-no-border">
					<IonTitle>Choose Anthem</IonTitle>
					<IonButtons slot="end" onClick={onClose}>
						<IonButton color="primary">Done</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<div className="anthemWrap">
					<div className="border-bottom bg-white">
						<IonSearchbar
							placeholder="Search Matches"
							className="search-bar"
							value={searchValue}
							onIonClear={(e) => handleSearchMessages("")}
							onInput={(e: any) => handleSearchMessages(e.target.value)}
						></IonSearchbar>
					</div>
					<IonItem lines="none" className="ion-margin-top" onClick={handleDeleteAnthem}>
						<IonLabel className="text-gray">I don't want a Spotify Anthem</IonLabel>
					</IonItem>
					<IonItem lines="full" className="popularTitle">
						<IonLabel className="ion-padding-bottom">Popular Songs</IonLabel>
					</IonItem>
					{anthem?.data?.map((item: any, index: number) => (
						<IonItem
							lines="full"
							className="anthemListItem"
							key={index}
							onClick={() => handleSelectSpotifyAnthem(item)}
						>
							<img
								src={item?.images?.[0]?.url || "assets/img/noImage.png"}
								height={42}
								width={42}
								alt="artist"
								className="ion-margin-top"
							/>
							<div className="ion-margin-start ion-padding-vertical">
								<IonText>{item?.name}</IonText>
								<div className="flex ion-align-items-center">
									<IonIcon size="small" icon={logoRss} color="success" slot="start" />
									<React.Fragment key={index}>
										<IonLabel>{item?.artist?.[0]?.name}</IonLabel>
									</React.Fragment>
								</div>
							</div>
						</IonItem>
					))}
				</div>
			</IonContent>
		</>
	);
};
export default SpotifyAnthemModel;
