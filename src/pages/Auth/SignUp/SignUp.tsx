import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import PhoneInput, { CountryData } from "react-phone-input-2";
import * as yup from "yup";
import { IonPage, IonContent, IonText, IonInput, IonButton, IonModal, IonLabel } from "@ionic/react";
import UnAuthPage from "../../../hocs/UnAuthPage";
import OtpLogin from "./OtpLogin";
import Banner from "../Banner/Banner";
import previewImg from "../../../assets/img/image-removebg-preview.png";
import useAuth from "../../../hooks/useAuth";
import { useFormik } from "formik";
import { signUpAction } from "../../../store/actions/user.action";
import "./SignUp.scss";

export type SignUpTypes = {
	isOpen: boolean;
	isOtpSent: boolean;
	isResendOtp: boolean;
	otp: string;
	countryCode: string;
	phoneNumber: string;
	email: string;
	password: string;
	confirmPassword: string;
};

const initState: SignUpTypes = {
	isOpen: false,
	isOtpSent: false,
	isResendOtp: false,
	otp: "",
	countryCode:"",
	phoneNumber: "",
	email: "",
	password: "",
	confirmPassword: "",
};

const validatedSchema = yup.object().shape({
	email: yup.string().required("Email is required").email("Email is not valid"),
	phoneNumber: yup.string().required('Phone number is required').min(10)
	.matches(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
	password: yup.string().required("Password is required").min(8),
	confirmPassword: yup
		.string()
		.required("Confirm password is required!")
		.oneOf([yup.ref("password")], "Passwords must match"),
});

const SignUp = () => {
	const history = useHistory();
	const { signUp, verifyOtp, isLoading } = useAuth();

	const [otpModel, setOTPModel] = useState<SignUpTypes>(initState);

	const setPhoneLoginModelOpen = () => {
		setOTPModel({ ...otpModel, isOpen: true });
	};

	const handleClose = () => {
		setOTPModel({ ...initState, isOpen: false });
	};

	const onChangeInput = ({ name, value }: { name: string; value: string | boolean }) => {
		setOTPModel({ ...otpModel, [name]: value });
	};

	const { handleSubmit, handleChange, values, errors, setFieldValue } = useFormik({
		initialValues: initState,
		validationSchema: validatedSchema,
		onSubmit: async function () {
			const body = {
				email: values.email,
				countryCode: values.countryCode,
				phoneNumber: values.phoneNumber,
				password: values.password,
			};
			const { type } = await signUp(body);
			if (type !== signUpAction.rejected.type) setPhoneLoginModelOpen();
		},
	});

	useEffect(() => {
		if (otpModel.otp !== null && otpModel.otp.toString().length >= 6) {
			verifyOtp({
				otp: otpModel.otp,
				email: values.email,
				countryCode: values.countryCode,
				phoneNumber: values.phoneNumber,
				password: values.password,
			});
			history.push("/welcome-signup")
		}
	}, [otpModel.otp]);

	return (
		<IonPage>
			<IonContent forceOverscroll={false} className="signup-page">
				<Banner title="Create Account" showStepper={false} img={""} stepNumber="" desc="" descNext="" className="" />
				<form onSubmit={handleSubmit}>
					<div className="login-wrap">
						<div className="field-title">
							<IonText>Email</IonText>
							<IonInput
								type="email"
								placeholder="hello@tradlife.com"
								name="email"
								onIonChange={handleChange}
							></IonInput>
							{errors?.email && <IonLabel className="err-mess">{errors?.email}</IonLabel>}
						</div>
						<div className="field-title">
							<IonText>Phone number</IonText>
							<PhoneInput
								country={"us"}
								onChange={(value: string, country: CountryData) => {
									setFieldValue("countryCode", country.dialCode)
									setFieldValue("phoneNumber", value)
								}}
								value={values.phoneNumber}
							/>
							{errors?.phoneNumber && <IonLabel className="err-mess">{errors.phoneNumber}</IonLabel>}
						</div>
						<div className="field-title">
							<IonText>Password</IonText>
							<IonInput
								type="password"
								placeholder="***************"
								name="password"
								onIonChange={handleChange}
							></IonInput>
							{errors?.password && <IonLabel className="err-mess">{errors?.password}</IonLabel>}
						</div>
						<div className="field-title">
							<IonText>Confirm password</IonText>
							<IonInput
								type="password"
								placeholder="***************"
								name="confirmPassword"
								onIonChange={handleChange}
							></IonInput>
							{errors?.confirmPassword && <IonLabel className="err-mess">{errors?.confirmPassword}</IonLabel>}
						</div>
						{/* onClick={() => setPhoneLoginModelOpen()} */}
						<IonButton expand="block" shape="round" className="btnThemePrimary font-dosis" type="submit">
							Sign up
						</IonButton>
						<div className="ion-text-center">
							<IonText className="textAc">
								Already have an account?{" "}
								<Link to="/login" className="text-color-primary">
									Sign in
								</Link>
							</IonText>
						</div>
						<img src={previewImg} alt="background" className="preview-img" />
					</div>
				</form>
				<IonModal isOpen={otpModel.isOpen} onDidDismiss={handleClose} className="otp-login-modal">
					<OtpLogin
						otpModel={otpModel}
						phoneNumber={values?.phoneNumber}
						setOTPModel={setOTPModel}
						onChangeInput={onChangeInput}
						onClose={handleClose}
						handleSubmit={handleSubmit}
						isLoading={isLoading}
					/>
				</IonModal>
			</IonContent>
		</IonPage>
	);
};

SignUp.defaultProps = {};

export default UnAuthPage(SignUp);
