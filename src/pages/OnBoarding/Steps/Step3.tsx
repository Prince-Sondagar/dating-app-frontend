import {
	IonCol,
	IonGrid,
	IonIcon,
	IonLabel,
	IonModal,
	IonRow,
	IonText,
} from "@ionic/react";
import { addCircleOutline, close } from "ionicons/icons";
import ImageCropper from "../ImageCropper";

import "../OnBoarding.scss";

const Step3 = ({ formik,
	removeSelectedImage,
	selectModel,
	onSelectProfilePhoto,
	imagesInputRef,
	setSelectModel,
	onSelectModelClose }: any) => {
	const { values, errors, touched, handleChange } = formik;

	return (
		<>
			<div className="profile-photo-info">
				<IonLabel className="block">Profile photos</IonLabel>
				<IonText>Add at least 2 photos to continue</IonText>
				<IonGrid className="profile-upload-sect">
					<IonRow>
						{values.profileImages.map((file: any, i: number) => (
							<IonCol size="6" sizeSm="4" sizeLg="3" key={i}>
								<div className="profile-upload profile-remove">
									<img src={URL.createObjectURL(file)} alt="Profile Images" />
									<IonIcon icon={close} onClick={() => removeSelectedImage(i)} size="large" />
								</div>
							</IonCol>
						))}
						{Array.from({ length: 6 - values.profileImages.length }).map((_, i) => (
							<IonCol size="6" sizeSm="4" sizeLg="3" key={i}>
								<div onClick={() => imagesInputRef.current.click()} className="profile-upload">
									<IonIcon icon={addCircleOutline} size="large" className="add-profile-icon" />
								</div>
							</IonCol>
						))}
					</IonRow>
					<input
						type="file"
						ref={imagesInputRef}
						hidden
						name="profileImages"
						accept="image/*"
						onChange={({ target }) => {
							setSelectModel({ isOpen: true, for: "image-cropper", file: target.files?.[0] });
							if (imagesInputRef.current) imagesInputRef.current.value = "";
						}}
						onBlur={handleChange}
					/>
				</IonGrid>
				{errors?.profileImages && touched?.profileImages && (
					<IonLabel className="err-mess">{errors?.profileImages}</IonLabel>
				)}
			</div>
			<IonModal
				isOpen={selectModel.isOpen && "image-cropper" === selectModel.for}
				onDidDismiss={onSelectModelClose}
				className="image-cropper-modal"
			>
				<ImageCropper
					selectedValue={selectModel.file && URL.createObjectURL(selectModel.file)}
					onCompleteImageCrop={onSelectProfilePhoto}
					onClose={onSelectModelClose}
				/>
			</IonModal>
		</>
	);
};

export default Step3;
