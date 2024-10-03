import { Link } from "react-router-dom";
import { IonPage, IonContent, IonText, IonInput, IonButton, IonLabel } from "@ionic/react";
import * as yup from "yup";
import UnAuthPage from "../../../hocs/UnAuthPage";
import Banner from "../Banner/Banner";
import useAuth from "../../../hooks/useAuth";
import { useFormik } from "formik";

import previewImg from "../../../assets/img/image-removebg-preview.png";
import "./LogIn.scss";

interface Login {
	email: string;
	password: string;
}

const initState: Login = {
	email: "",
	password: "",
};

const validatedSchema = yup.object().shape({
	email: yup.string().required("Email is required").email("Email is not valid"),
	password: yup.string().required("Password is required"),
});

const LogIn = () => {
	const { login } = useAuth();
	const { handleSubmit, handleChange, values, errors } = useFormik({
		initialValues: initState,
		validationSchema: validatedSchema,
		onSubmit: async function () {
			await login(values);
		},
	});

	return (
		<IonPage>
			<IonContent forceOverscroll={false} className="login-page">
				<Banner title="Welcome Back" showStepper={false} img={""} stepNumber="" desc="" descNext="" className="" />
				<form onSubmit={handleSubmit}>
					<div className="login-wrap">
						<div className="field-title">
							<IonText>Email or Phone</IonText>
							<IonInput
								type="text"
								placeholder="hello@tradlife.com"
								value={values.email}
								name="email"
								onIonChange={handleChange}
							></IonInput>
							{errors?.email && <IonLabel className="err-mess">{errors?.email}</IonLabel>}
						</div>
						<div className="field-title">
							<IonText>Password</IonText>
							<IonInput
								type="password"
								placeholder="***************"
								value={values.password}
								name="password"
								onIonChange={handleChange}
							></IonInput>
							{errors?.password && <IonLabel className="err-mess">{errors?.password}</IonLabel>}
						</div>
						<div className="flex ion-align-items-center ion-justify-content-end">
							<Link to="/forgot-password" className="text-color-primary">
								Forgot password?
							</Link>
						</div>
						<IonButton expand="block" type="submit" shape="round" className="btnThemePrimary font-dosis">
							Sign in
						</IonButton>
						<div className="ion-text-center">
							<IonText className="textAc">
								Don't have an account?{" "}
								<Link to="/signup" className="text-color-primary">
									Sign up
								</Link>
							</IonText>
						</div>
						<img src={previewImg} alt="background" className="preview-img" />
					</div>
				</form>
			</IonContent>
		</IonPage>
	);
};

LogIn.defaultProps = {};

export default UnAuthPage(LogIn);
