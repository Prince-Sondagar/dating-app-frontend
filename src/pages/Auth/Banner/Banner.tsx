import { FC } from "react";
import AuthStep from "./AuthStep";

import banner_bg from '../../../assets/img/banner_bg.svg';
import banner_plain_bg from '../../../assets/img/banner_plain_bg.svg';
import logo from '../../../assets/img/Logo.svg';
import "./Banner.scss";

type Props = {
    title: string;
    showStepper: boolean;
    desc: string;
    descNext: string;
    stepNumber: string;
    img: string,
    className: string
}

const Banner: FC<Props> = ({ title, showStepper, img, stepNumber, desc, descNext, className }) => {
    return (
        <div className="banner-main">
            <img className="banner-plain-bg" src={banner_plain_bg} alt="banner_plain_bg" />
            <img className="banner-bg-img" src={banner_bg} alt="banner_bg" />
            <div className="banner-content">
                <img src={logo} alt="logo" className="banner-logo" />
                <div className="font-dosis banner-title">{title}</div>
                {showStepper ? <AuthStep img={img} stepNumber={stepNumber} desc={desc} descNext={descNext} className={className} /> : ""}
            </div>
        </div>
    )
};

Banner.defaultProps = {};

export default Banner;