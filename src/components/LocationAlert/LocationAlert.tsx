import React, { useEffect, useState } from "react";
import { IonContent, IonButton, IonModal, IonInput } from "@ionic/react";
import API, { APISuccessResponse } from "../../utils/axios";
import useUser from "../../hooks/useUser";
import "./LocationAlert.scss";
import { useHistory } from "react-router";

type Props = {
	children: any;
};

interface Input {
	pincode?: string;
	city?: string;
	state?: string;
}

const LocationAlert: React.FC<Props> = ({ children }) => {
	const [isLocationAlertModal, setIsLocationAlertModal] = useState(false);
	const { updateDiscoverySetting, getNearbyUsers } = useUser();
	const {
		location: { pathname },
	} = useHistory();
	const [input, setInput] = useState<Input>({});

	useEffect(() => {}, []);

	const getUserDetails = async () => {
		if (pathname !== "/onboarding") {
			const { data } = await API.get<APISuccessResponse, any>(`/user/me`);
			if (!data?.data?.latLong.length) {
				const div = document.createElement("div");
				div.classList.add("overlay");
				document.body.appendChild(div);
				navigator.geolocation.getCurrentPosition(
					async ({ coords: { latitude, longitude } }) => {
						if (pathname !== "/onboarding") document.body.removeChild(div);
						await updateDiscoverySetting({ latLong: [latitude, longitude] });
						await getNearbyUsers("");
						window.location.reload();
					},
					(error) => {
						if (error.code === error.PERMISSION_DENIED) {
							document.body.removeChild(div);
							handleLocationAlertModal();
						} else {
							document.body.removeChild(div);
						}
					},
				);
			}
		}
	};

	useEffect(() => {
		getUserDetails();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleLocationAlertModal = () => setIsLocationAlertModal(!isLocationAlertModal);

	const getLocationFromPostalCode = async ({ pincode, city, state }: any) => {
		const location = [pincode, city, state].filter(Boolean).join(",");
		const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`;
		const response = await fetch(url);
		const data = await response.json();
		if (data.results) {
			await updateDiscoverySetting({
				latLong: [data.results[0].geometry.location.lat, data.results[0].geometry.location.lng],
			});
			setIsLocationAlertModal(false);
			await getNearbyUsers("");
		}
	};

	return (
		<>
			{children}
			<IonModal isOpen={isLocationAlertModal} backdropDismiss={false} className="location-alert-modal">
				<IonContent>
					<div className="alert-page ion-text-center">
						<div className="title ion-margin-bottom">Provide any one detail for finding the nearest matches.</div>
						<IonInput
							type="number"
							placeholder="Pincode"
							onIonChange={(e: any) => setInput({ ...input, pincode: e.target.value })}
							class="custom"
						></IonInput>
						<IonInput
							placeholder="City"
							onIonChange={(e: any) => setInput({ ...input, city: e.target.value })}
							class="custom"
						></IonInput>
						<IonInput
							placeholder="State"
							onIonChange={(e: any) => setInput({ ...input, state: e.target.value })}
							class="custom"
						></IonInput>
						<div>
							<IonButton
								disabled={!input?.pincode && !input?.city && !input?.state}
								shape="round"
								onClick={() => getLocationFromPostalCode(input)}
							>
								Save
							</IonButton>
						</div>
					</div>
				</IonContent>
			</IonModal>
		</>
	);
};

LocationAlert.defaultProps = {};

export default LocationAlert;
