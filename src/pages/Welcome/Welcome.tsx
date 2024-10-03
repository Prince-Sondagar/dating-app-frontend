import { Link } from 'react-router-dom';
import { IonContent, IonPage } from '@ionic/react';
import UnAuthPage from '../../hocs/UnAuthPage';

import welcome_plain_bg from '../../assets/img/welcon_plain_bg.svg';
import welcome_icon_bg from '../../assets/img/welcome_icon_bg.png';
import welcomeScreenLogo from '../../assets/img/welcomeScreenLogo.svg';
import welcomeNextAerrow from '../../assets/img/welcomeNextAerrow.svg';
import "./Welcome.scss";

const Welcome = () => {
    return (
        <IonPage>
            <IonContent className='WelcomeScreen'>
                <img src={welcome_plain_bg} alt='welcome_plain_bg' className='welcome-plain-bg' />
                <img src={welcome_icon_bg} alt='welcome_icon_bg' className='welcome-icon-bg' />
                <div className='welcomeScreenLogo'>
                    <img src={welcomeScreenLogo} alt='welcomeScreenLogo' />
                </div>
                <div className='welcome-title font-dosis'>Find your <br /> perfect partner, <br /> for life</div>
                <div className='welcome-desc'>Join our community and socialize with <br /> millions of people that are looking for <br /> a traditional life just as you</div>
                <Link to="/login">
                    <img src={welcomeNextAerrow} alt='welcomeNextAerrow' className='welcomeNextAerrow' />
                </Link>
            </IonContent>
        </IonPage>
    )
}

Welcome.defaultProps = {};

export default UnAuthPage(Welcome);