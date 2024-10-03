import { useHistory } from 'react-router';
import { IonButton, IonContent, IonPage, IonText } from '@ionic/react';
import AuthPage from "../../hocs/AuthPage";

import congratsBgVector from '../../assets/img/congratsBgVector.svg';
import congratsBgVector1 from '../../assets/img/congratsBgVector1.svg';
import congratsBgVector2 from '../../assets/img/congratsBgVector2.svg';
import congratsBgVector3 from '../../assets/img/congratsBgVector3.svg';
import congratsBgVector4 from '../../assets/img/congratsBgVector4.svg';
import congratsBgVector5 from '../../assets/img/congratsBgVector5.svg';
import "./CongratsSignUp.scss";
import useOnboarding from '../../hooks/useOnboarding';

const CongratsSignUp = () => {
    const {
		formik,
	} = useOnboarding();

    return (
            <div className='banner-wrap'>
                <div className='congrats-banner'>
                    <img src={congratsBgVector} alt='congratsBgVector' className='congrats-bg-vector' />
                    <img src={congratsBgVector1} alt='congratsBgVector1' className='congrats-bg-vector1' />
                    <img src={congratsBgVector2} alt='congratsBgVector2' className='congrats-bg-vector2' />
                    <img src={congratsBgVector3} alt='congratsBgVector3' className='congrats-bg-vector3' />
                    <img src={congratsBgVector4} alt='congratsBgVector3' className='congrats-bg-vector4' />
                    <img src={congratsBgVector5} alt='congratsBgVector5' className='congrats-bg-vector5' />
                </div>
                <div className='congrats-content'>
                    <IonText className='title font-dosis'>Congrats!</IonText>
                    <IonText className='title font-dosis'>You signed up!</IonText>
                    <IonText className='sub-title font-dosis'>We are happy to have you here</IonText>
                    <IonText className='desc'>You are just a few steps away from your <span className="text-color-primary">perfect match</span>. Complete the onboarding process and start looking for them!</IonText>
                </div>
                <div className='ion-text-right btn-start'>
                    <IonButton shape="round" className="btnThemePrimary font-dosis" type="submit" disabled={formik.isSubmitting}>Start</IonButton>
                </div>
            </div>
    )
}

CongratsSignUp.defaultProps = {};

export default AuthPage(CongratsSignUp);