import {
	IonButton,
	IonCol,
	IonGrid,
	IonIcon,
	IonItem,
	IonLabel,
	IonModal,
	IonRadio,
	IonRadioGroup,
	IonRow,
	IonText,
} from "@ionic/react";
import { addCircleOutline } from "ionicons/icons";
import AddPassions from "../AddPassions";
import { Passion } from "../../../types";

import "../OnBoarding.scss";

const Step2 = ({
	formik,
	passions,
	lookingFor,
	selectModel,
	removeInterest,
	setSelectModel,
	onSelectModelClose,
	onSelectValues,
}: any) => {
	const { values, errors, touched, handleChange, handleBlur } = formik;

	return (
		<>
			<div className="optional-info">
				<div className="show-me">
					<IonText>Show Me</IonText>
					<div className="gender-input">
						<IonRadioGroup name="showMe" value={values.showMe} onIonChange={handleChange} onBlur={handleBlur}>
							<IonItem lines="none">
								<IonLabel>Male</IonLabel>
								<IonRadio value="male" />
							</IonItem>
							<IonItem lines="none">
								<IonLabel>Female</IonLabel>
								<IonRadio value="female" />
							</IonItem>
							<IonItem lines="none">
								<IonLabel>Everyone</IonLabel>
								<IonRadio value="everyone" />
							</IonItem>
						</IonRadioGroup>
					</div>
					{errors?.showMe && touched?.showMe && <IonLabel className="err-mess">{errors?.showMe}</IonLabel>}
				</div>
				<div className="optional-header ion-text-center">
					<IonGrid className="ion-no-padding">
						<IonRow className="ion-align-items-center">
							<IonCol size="4.5">
								<div></div>
							</IonCol>
							<IonCol size="3">
								<IonText>
									<h4 className="font-dosis">Optional</h4>
								</IonText>
							</IonCol>
							<IonCol size="4.5">
								<div></div>
							</IonCol>
						</IonRow>
					</IonGrid>
				</div>
				<div className="passion-list">
					<IonLabel className="block">Passions</IonLabel>
					<IonText>This will helps us to find people with the same interests as you</IonText>
					<div className="orientation-sect">
						{values.passions.map((passionId: string) => {
							const passion = passions.find(({ id }: Passion) => passionId === id);
							if (passion)
								return (
									<IonButton
										key={passionId}
										onClick={() => removeInterest("passions", passionId)}
										fill="outline"
										shape="round"
										className="passion-item"
									>
										{passion.passion}
									</IonButton>
								);
							else return "";
						})}
						<IonButton
							className="btn-passions"
							fill="outline"
							onClick={() => {
								setSelectModel({
									...selectModel,
									for: "passions",
									isOpen: true,
								});
							}}
						>
							<IonIcon icon={addCircleOutline} size="small" /> Add Passion
						</IonButton>
					</div>
				</div>
				<div className="looking-for-area">
					<IonLabel className="block">Looking for</IonLabel>
					<IonText>Let the people know about your emotional intentions</IonText>
					<IonGrid className="ion-margin-top">
						<IonRow>
							{lookingFor.map((intent: any, key: number) => (
								<IonCol size="4" sizeSm="3" sizeLg="2" key={key}>
									<div
										className={values.lookingFor === intent.id ? "selectedBox status-box" : "status-box"}
										onClick={() => onSelectValues(intent.id, "lookingFor")}
									>
										<img
											width={60}
											src={`${process.env.REACT_APP_ASSETS_PUBLIC_DOMAIN}/${intent.image}`}
											alt="relationship"
										/>
										<IonText>
											<h6>{intent.name}</h6>
										</IonText>
									</div>
								</IonCol>
							))}
						</IonRow>
					</IonGrid>
				</div>
			</div>
			<IonModal
				isOpen={selectModel.isOpen && "passions" === selectModel.for}
				onDidDismiss={onSelectModelClose}
				className="add-passions-modal"
			>
				<AddPassions
					selectedValues={values.passions}
					data={passions}
					onSelectValues={onSelectValues}
					onClose={onSelectModelClose}
					type={"onBoarding"}
				/>
			</IonModal>
		</>
	);
};

export default Step2;
