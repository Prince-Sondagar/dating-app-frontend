import { IonButton, IonContent, IonIcon, IonRange, IonText } from "@ionic/react";
import { reloadCircleOutline } from "ionicons/icons";
import React, { memo, useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../utils/cropImage";

type Props = {
	selectedValue: any;
	onCompleteImageCrop: (file: any) => void;
	onClose: () => void;
};

const zoomConfig = { maxZoom: 3, minZoom: 1 };

const ImageCropper: React.FC<Props> = ({ selectedValue, onCompleteImageCrop, onClose }) => {
	const [crop, setCrop] = useState({ x: 3.4453125, y: 3.990234375 });
	const [zoom, setZoom] = useState(1);
	const [rotation, setRotation] = useState(0);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState<{
		x: number;
		y: number;
		width: number;
		height: number;
	} | null>(null);

	const onCropComplete = useCallback((_, croppedAreaPixels) => {
		setCroppedAreaPixels(croppedAreaPixels);
	}, []);

	const onSubmitImage = async () => {
		if (!croppedAreaPixels) return 0;
		const { file } = await getCroppedImg(selectedValue, croppedAreaPixels, rotation);
		onCompleteImageCrop(file);
		onClose();
	};

	const onChangeRotation = () => {
		if (rotation >= 270) setRotation(0);
		else setRotation(rotation + 90);
	};

	return (
		<IonContent>
			<div className="ion-padding ion-margin-horizontal">
				<IonText className="ion-text-center">
					<h2>Adjust Photo</h2>
				</IonText>
				<div className="cropper-container ion-margin-bottom bodybox">
					<Cropper
						image={selectedValue || "https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg"}
						crop={crop}
						rotation={rotation}
						zoom={zoom}
						objectFit="vertical-cover"
						aspect={2.2 / 3}
						onCropComplete={onCropComplete}
						onCropChange={setCrop}
						onZoomChange={(e) => setZoom(e)}
						zoomSpeed={0.5}
					/>
				</div>
				<div className="flex ion-padding-top">
					<IonRange
						aria-label="Volume"
						value={((zoom - zoomConfig.minZoom) / (zoomConfig.maxZoom - zoomConfig.minZoom)) * (100 - 0) + 0}
						onIonChange={({ target }) => {
							setZoom(
								((+target.value - 0) / (100 - 0)) * (zoomConfig.maxZoom - zoomConfig.minZoom) + zoomConfig.minZoom,
							);
						}}
					/>
					<IonIcon icon={reloadCircleOutline} onClick={onChangeRotation} />
				</div>
				<div className="flex ion-justify-content-between">
					<IonButton shape="round" color="medium" onClick={onClose}>
						Cancel
					</IonButton>
					<IonButton shape="round" onClick={onSubmitImage}>
						Choose
					</IonButton>
				</div>
			</div>
		</IonContent>
	);
};

export default memo(ImageCropper);

