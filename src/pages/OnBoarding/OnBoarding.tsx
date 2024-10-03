import { IonPage, IonContent, IonButton } from "@ionic/react";
import Banner from "../Auth/Banner/Banner";
import stepper_13 from "../../assets/img/stepper_13.svg";
import stepper_23 from "../../assets/img/stepper_23.svg";
import stepper_33 from "../../assets/img/stepper_33.svg";
import useOnboarding from "../../hooks/useOnboarding";

const SignUp = () => {
	const {
		currentStep,
		formik,
		steps,
		passions,
		lookingFor,
		selectModel,
		removeInterest,
		imagesInputRef,
		setSelectModel,
		onSelectProfilePhoto,
		removeSelectedImage,
		onSelectModelClose,
		onSelectValues,
		setCurrentStep,
	} = useOnboarding();

	const StepComponent = steps[currentStep].component;

	return (
		<IonPage>
			<IonContent>
				<div className="boarding-main">
					{currentStep !== 0 && (
						<Banner
							title="Getting on board"
							showStepper={true}
							img={currentStep === 2 ? stepper_23 : currentStep === 3 ? stepper_33 : stepper_13}
							stepNumber={currentStep === 2 ? "2/3" : currentStep === 3 ? "3/3" : "1/3"}
							desc={
								currentStep === 2
									? "What are you looking for?"
									: currentStep === 3
										? "Profile photos"
										: "Personal information"
							}
							descNext={
								currentStep === 2
									? "Next: Profile photos"
									: currentStep === 3
										? "This is the last one!"
										: "Next: What are you looking for?"
							}
							className={currentStep === 2 ? "step-2" : currentStep === 3 ? "step-3" : ""}
						/>
					)}
					<form onSubmit={formik.handleSubmit}>
						<StepComponent
							formik={formik}
							passions={passions}
							lookingFor={lookingFor}
							selectModel={selectModel}
							removeInterest={removeInterest}
							setSelectModel={setSelectModel}
							onSelectModelClose={onSelectModelClose}
							onSelectValues={onSelectValues}
							onSelectProfilePhoto={onSelectProfilePhoto}
							removeSelectedImage={removeSelectedImage}
							imagesInputRef={imagesInputRef}
						/>
						{currentStep !== 0 && <div className={`btn-next flex ion-align-items-center btn-next-${currentStep}`}>
							{currentStep === 1 ? (
								""
							) : (
								<IonButton
									expand="block"
									shape="round"
									className="btnThemeTransparent font-dosis"
									onClick={() => setCurrentStep(currentStep - 1)}
								>
									Back
								</IonButton>
							)}
							<IonButton
								expand="block"
								shape="round"
								type="submit"
								disabled={formik.isSubmitting}
								className="btnThemePrimary font-dosis"
							>
								{currentStep === steps.length - 1 ? "Finish" : "Next"}
							</IonButton>
						</div>}
					</form>
				</div>
			</IonContent>
		</IonPage>
	);
};

export default SignUp;
