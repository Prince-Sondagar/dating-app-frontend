import { Link } from "react-router-dom";
import { IonPage, IonContent, IonText, IonInput, IonButton, IonLabel } from "@ionic/react";
import * as yup from "yup";
import UnAuthPage from "../../../hocs/UnAuthPage";
import Banner from "../Banner/Banner";
import { useFormik } from "formik";
import previewImg from "../../../assets/img/image-removebg-preview.png";
import useAuth from "../../../hooks/useAuth";

interface Login {
    email: string;
}

const initState: Login = {
    email: "",
};

const validatedSchema = yup.object().shape({
    email: yup.string().required("Email is required").email("Email is not valid"),
});

const ForgotPassword = () => {
    const { forgotPassword } = useAuth();
    const { handleSubmit, values, handleChange, errors } = useFormik({
        initialValues: initState,
        validationSchema: validatedSchema,
        onSubmit: async function () {
            await forgotPassword(values);
        },
    });

    return (
        <IonPage>
            <IonContent forceOverscroll={false} className="login-page forgot-pass-page">
                <Banner title="Forgot Password" showStepper={false} img={""} stepNumber="" desc="" descNext="" className="" />
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
                        <IonButton expand="block" type="submit" shape="round" className="btnThemePrimary font-dosis">
                            Send
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

ForgotPassword.defaultProps = {};

export default UnAuthPage(ForgotPassword);