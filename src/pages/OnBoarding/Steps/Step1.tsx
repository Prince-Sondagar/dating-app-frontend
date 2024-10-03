import {
	IonCheckbox,
	IonInput,
	IonItem,
	IonLabel,
	IonRadio,
	IonRadioGroup,
	IonText,
} from "@ionic/react";
import "../OnBoarding.scss";

const Step1 = ({ formik }: any) => {
	const { values, errors, touched, handleChange, handleBlur } = formik;

	return (
		<>
			<div className="personal-info">
				<div className="field-title">
					<IonText>First Name</IonText>
					<IonInput placeholder="Trad" value={values.firstname} name="firstname" onIonChange={handleChange} onIonBlur={handleBlur} />
					{errors?.firstname && touched?.firstname && <IonLabel className="err-mess">{errors?.firstname}</IonLabel>}
				</div>
				<div className="field-title">
					<IonText>Last Name</IonText>
					<IonInput placeholder="Life" value={values.lastname} name="lastname" onIonChange={handleChange} onIonBlur={handleBlur} />
					{errors?.lastname && touched?.lastname && <IonLabel className="err-mess">{errors?.lastname}</IonLabel>}
				</div>
				<div className="field-title">
					<IonText>Birthday</IonText>
					<div className="flex birthday-input">
						<IonInput
							type="number"
							placeholder="MM"
							name="month"
							className={`${errors?.month && touched?.month ? "err-input" : ""}`}
							onIonChange={handleChange}
							value={values.month}
							onIonBlur={handleBlur}
						/>
						<IonInput
							className={`${errors?.date && touched?.date ? "err-input" : ""}`}
							type="number"
							name="date"
							placeholder="DD"
							value={values.date}
							onIonChange={handleChange}
							onIonBlur={handleBlur}
						/>
						<IonInput
							className={`${errors?.year && touched?.year ? "err-input" : ""} bday-year`}
							type="number"
							name="year"
							value={values.year}
							placeholder="YYYY"
							onIonChange={handleChange}
							onIonBlur={handleBlur}
						/>
					</div>
					{(errors?.month && touched?.month) || (errors?.date && touched?.date) || (errors?.year && touched?.year) ? (
						<IonLabel className="err-mess">Please enter a valid date.</IonLabel>
					) : (
						""
					)}
				</div>
				<div className="field-title gender-input">
					<IonText>Gender</IonText>
					<IonRadioGroup name="gender" value={values.gender} onIonChange={handleChange} onBlur={handleBlur}>
						<IonItem lines="none">
							<IonLabel>Male</IonLabel>
							<IonRadio value="male" />
						</IonItem>
						<IonItem lines="none">
							<IonLabel>Female</IonLabel>
							<IonRadio value="female"/>
						</IonItem>
					</IonRadioGroup>
					{errors?.gender && touched?.gender && <IonLabel className="err-mess">{errors?.gender}</IonLabel>}
					<div className="ion-margin-top flex ion-align-items-center">
						<IonCheckbox
							slot="start"
							name="showMyGenderOnProfile"
							onIonChange={({ target }) => handleChange({ target: { name: target.name, value: target.checked } })}
						/>
						<IonLabel className="show-mess">Show my gender on my profile</IonLabel>
					</div>
				</div>
			</div>
		</>
	);
};

export default Step1;
