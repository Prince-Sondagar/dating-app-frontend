import { IonContent, IonIcon, IonModal } from "@ionic/react";
import { close, ellipseOutline } from "ionicons/icons";
import React, { useEffect, useRef, useState } from "react";
import useUser from "../../hooks/useUser";
import ImageCropper from "../../pages/OnBoarding/ImageCropper";
import "./CaptureImageModel.scss";

type Props = {
	onClose: () => void;
};

type isImageCroper = {
	isOpen: boolean;
	file: any;
};

const CaptureImageModel: React.FC<Props> = ({ onClose }) => {
	const videoRef = useRef<any>(null);
	const { updateUserInfo, getUserProfileMedia } = useUser();
	const [inputFile, setInputFile] = useState<isImageCroper>({
		isOpen: false,
		file: undefined,
	});
	useEffect(() => {
		const startCamera = async () => {
			try {
				const stream = await navigator.mediaDevices.getUserMedia({ video: true });
				videoRef.current.srcObject = stream;
			} catch (error) {
				console.log(error);
			}
		};
		if (!inputFile?.isOpen) startCamera();
	}, [inputFile]);

	const stopCamera = () => {
		const stream = videoRef.current.srcObject;
		const tracks = stream.getTracks();
		tracks.forEach((track: any) => {
			track.stop();
		});
		videoRef.current.srcObject = null;
	};

	const captureImage = async () => {
		const canvas: any = document.createElement("canvas");
		canvas.width = videoRef.current.videoWidth;
		canvas.height = videoRef.current.videoHeight;
		canvas.getContext("2d").drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
		const capturedImageData = canvas.toDataURL("image/png");
		stopCamera();
		setInputFile({ isOpen: true, file: capturedImageData });
	};
	const onSelectProfilePhoto = async (blob: any) => {
		const file = new File([blob], inputFile?.file?.name ?? blob.name, { type: blob.type });
		onClose();
		await updateUserInfo({ profileImages: [file] });
		await getUserProfileMedia();
		setInputFile({ isOpen: false, file: undefined });
	};

	return (
		<>
			<IonContent>
				<div className="capture-video">
					<IonIcon icon={close} slot="icon-only" className="close-icon" onClick={onClose} />
					<IonIcon icon={ellipseOutline} onClick={captureImage} slot="icon-only" className="camera-icon" />
					<video ref={videoRef} autoPlay muted></video>
				</div>
			</IonContent>
			<IonModal
				isOpen={inputFile.isOpen}
				onDidDismiss={() => setInputFile({ ...inputFile, isOpen: false })}
				className="image-cropper-modal"
			>
				<ImageCropper
					selectedValue={inputFile?.file}
					onCompleteImageCrop={onSelectProfilePhoto}
					onClose={() => {
						setInputFile({ ...inputFile, isOpen: false });
						onClose();
					}}
				/>
			</IonModal>
		</>
	);
};

export default CaptureImageModel;
