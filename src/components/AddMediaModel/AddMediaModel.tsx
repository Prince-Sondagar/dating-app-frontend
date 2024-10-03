import {
	IonButtons,
	IonContent,
	IonHeader,
	IonIcon,
	IonLabel,
	IonList,
	IonListHeader,
	IonModal,
	IonText,
	IonTitle,
	IonToolbar,
	useIonToast,
} from "@ionic/react";
import { close } from "ionicons/icons";
import React, { useRef, useState } from "react";
import useUser from "../../hooks/useUser";
import ImageCropper from "../../pages/OnBoarding/ImageCropper";
import CaptureImageModel from "../CaptureImageModel/CaptureImageModel";
import "./AddMediaModel.scss";

type Props = {
	onClose: () => void;
	handleUserProfileModals: any;
};
type isImageCroper = {
	isOpen: boolean;
	file: any;
};

const AddMediaModel: React.FC<Props> = ({ onClose, handleUserProfileModals }) => {
	const ref = useRef<any>(null);
	const { updateUserInfo, getUserProfileMedia } = useUser();
	const [isOpneCameraModel, setOpenCameraModel] = useState(false);
	const [inputFile, setInputFile] = useState<isImageCroper>({
		isOpen: false,
		file: undefined,
	});

	const onSelectProfilePhoto = async (blob: any) => {
		const file = new File([blob], inputFile?.file?.name ?? blob.name, { type: blob.type });
		onClose()
		await updateUserInfo({ profileImages: [file] });
		await getUserProfileMedia();
	};
	return (
		<>
			<IonHeader>
				<IonToolbar className="toolbar-no-border ion-padding-top">
					<IonButtons slot="end" onClick={onClose}>
						<IonIcon icon={close} slot="icon-only" />
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<div className="media-content">
					<IonText>
						<h2>Create New</h2>
					</IonText>
					<IonText>
						<h6>Select a content type</h6>
					</IonText>
					<div
						className="upload-gallery"
						style={{ backgroundImage: `url(assets/img/gallery.png)` }}
						onClick={() => ref.current.click()}
					>
						<input
							type="file"
							hidden
							ref={ref}
							onChange={({ target }) => {
								setInputFile({ isOpen: true, file: target.files?.[0] });
								if (ref.current) ref.current.value = "";
							}}
						/>
						<div className="upload-content">
							<IonLabel>Upload From</IonLabel>
							<IonText>
								<h5>Gallery</h5>
							</IonText>
						</div>
					</div>
					<div
						className="upload-gallery"
						onClick={() => setOpenCameraModel(true)}
						style={{ backgroundImage: `url(assets/img/camera.png)` }}
					>
						<div className="upload-content">
							<IonLabel>Capture From</IonLabel>
							<IonText>
								<h5>Camera</h5>
							</IonText>
						</div>
					</div>
				</div>
			</IonContent>

			<IonModal
				isOpen={inputFile.isOpen}
				onDidDismiss={() => setInputFile({ ...inputFile, isOpen: false })}
				className="image-cropper-modal"
			>
				<ImageCropper
					selectedValue={inputFile.file && URL.createObjectURL(inputFile.file)}
					onCompleteImageCrop={onSelectProfilePhoto}
					onClose={() => setInputFile({ ...inputFile, isOpen: false })}
				/>
			</IonModal>
			<IonModal isOpen={isOpneCameraModel} onDidDismiss={() => setOpenCameraModel(false)}>
				<CaptureImageModel onClose={() => setOpenCameraModel(false)} />
			</IonModal>
		</>
	);
};

export default AddMediaModel;
