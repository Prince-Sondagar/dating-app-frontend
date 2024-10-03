import { Link } from "react-router-dom";
import { IonPage, IonContent, IonText, IonInput, IonButton, IonLabel } from "@ionic/react";
import * as yup from "yup";
import UnAuthPage from "../../../hocs/UnAuthPage";
import { useParams, useHistory } from 'react-router-dom';
import Banner from "../Banner/Banner";
import { useFormik } from "formik";
import previewImg from "../../../assets/img/image-removebg-preview.png";
import useAuth from "../../../hooks/useAuth";

interface Login {
    password: string;
    confirmPassword: string;
}

const initState: Login = {
    password: "",
    confirmPassword: ""
};

const validatedSchema = yup.object().shape({
    password: yup.string().required("Password is required").min(8),
	confirmPassword: yup
		.string()
		.required("Confirm password is required!")
		.oneOf([yup.ref("password")], "Passwords must match"),
});

const ResetPassword = () => {
    const history = useHistory();
    const { token }:{ token:string } = useParams();
    const { resetPassword } = useAuth();
    const { handleSubmit, values,handleChange, errors } = useFormik({
        initialValues: initState,
        validationSchema: validatedSchema,
        onSubmit: async function () {
            await resetPassword({ token: token, password: values?.password });
            history.push("/login")
        },
    });

    return (
        <IonPage>
            <IonContent forceOverscroll={false} className="login-page forgot-pass-page">
                <Banner title="Reset Password" showStepper={false} img={""} stepNumber="" desc="" descNext="" className="" />
                <form onSubmit={handleSubmit}>
                    <div className="login-wrap">
                        <div className="field-title">
                            <IonText>New password</IonText>
                            <IonInput
                                type="password"
                                placeholder="***************"
                                name="password"
                                onIonChange={handleChange}
                            ></IonInput>
                            {errors?.password && <IonLabel className="err-mess">{errors?.password}</IonLabel>}
                        </div>
                        <div className="field-title ion-padding-bottom">
                            <IonText>Confirm new password</IonText>
                            <IonInput
                                type="password"
                                placeholder="***************"
                                name="confirmPassword"
                                onIonChange={handleChange}
                            ></IonInput>
                            {errors?.confirmPassword && <IonLabel className="err-mess">{errors?.confirmPassword}</IonLabel>}
                        </div>
                        <IonButton expand="block" type="submit" shape="round" className="btnThemePrimary font-dosis">
                            Reset password
                        </IonButton>
                        <div className="ion-text-center">
                            <IonText className="textAc">
                                Back to{" "}
                                <Link to="/login" className="text-color-primary">
                                    Sign in
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

ResetPassword.defaultProps = {};

export default UnAuthPage(ResetPassword);