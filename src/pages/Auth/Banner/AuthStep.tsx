import { FC } from "react";
import stepper_full from '../../../assets/img/stepper_full.svg';

type Props = {
    desc: string;
    descNext: string;
    stepNumber: string;
    img: string,
    className: string
}

const AuthStep: FC<Props> = ({ stepNumber, desc, descNext, img, className }) => {
    return (
        <div className="banner-stepper">
            <div className="stepper-img">
                <img src={stepper_full} alt="stepper_full" />
                <img src={img} alt="stepper_13" className={`stepper-step ${className}`} />
                <div className="font-dosis step-title">{stepNumber}</div>
            </div>
            <div>
                <div className="font-dosis banner-desc-title">{desc}</div>
                <div className="font-dosis banner-desc-next">{descNext}</div>
            </div>
        </div>
    )
}

AuthStep.defaultProps = {};

export default AuthStep;