import { FC } from "react";

type Props = {
    color: string;
};

const BannerSlideIcon: FC<Props> = ({ color }) => {
    return (
        <svg width="350" height="156" viewBox="0 0 350 156" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect y="4" width="347" height="152" rx="3" fill="#F7F8FB" />
            <mask id="mask0_52_537" maskUnits="userSpaceOnUse" x="206" y="4" width="141" height="97">
                <rect x="206" y="4" width="141" height="97" rx="3" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_52_537)">
                <path d="M341 -0.997602L290.873 -0.99774L242.298 47.9399C242.298 47.9399 225.504 65.2923 237 77.4999C248.497 89.7074 267.485 72.9403 267.485 72.9403L341 -0.997602Z" fill="url(#paint0_linear_52_537)" fillOpacity="0.7" />
                <path d="M401.024 -3.99547L350.5 -3.99547L302.322 44.9421C302.322 44.9421 285.528 62.2944 297.024 74.502C308.521 86.7096 327.509 69.9425 327.509 69.9425L401.024 -3.99547Z" fill="url(#paint1_linear_52_537)" fillOpacity="0.7" />
                <path d="M290.542 -0.732257L262.111 -0.768091L234.456 27.0254C234.456 27.0254 224.42 36.788 231.71 43.144C239 49.5 248.76 41.2587 248.76 41.2587L290.542 -0.732257Z" fill="url(#paint2_linear_52_537)" fillOpacity="0.7" />
                <path d="M333.497 -0.922565L305.066 -0.958399L277.411 26.8351C277.411 26.8351 267.375 36.5977 274.665 42.9537C281.955 49.3097 291.715 41.0684 291.715 41.0684L333.497 -0.922565Z" fill="url(#paint3_linear_52_537)" fillOpacity="0.7" />
                <path d="M303.497 -0.922565L275.066 -0.958399L247.411 26.8351C247.411 26.8351 237.375 36.5977 244.665 42.9537C251.955 49.3097 261.715 41.0684 261.715 41.0684L303.497 -0.922565Z" fill="url(#paint4_linear_52_537)" fillOpacity="0.7" />
                <path d="M262.5 -1.00027L248.5 -1.00021L215 30.5C215 30.5 205.555 39.5 210 43.5C214.444 47.5 223 38.5 223 38.5L262.5 -1.00027Z" fill="url(#paint5_linear_52_537)" fillOpacity="0.7" />
                <path d="M347.5 -0.999931L341 -0.999929L307 33C307 33 300 39.5 301.5 42C303 44.5 311 36.5 311 36.5L347.5 -0.999931Z" fill="url(#paint6_linear_52_537)" fillOpacity="0.7" />
            </g>
            <defs>
                <linearGradient id="paint0_linear_52_537" x1="329.373" y1="2.504" x2="242.369" y2="95.0004" gradientUnits="userSpaceOnUse">
                    <stop offset="0.24978" stopColor={color} />
                    <stop offset="1" stopColor={color} stopOpacity="0" />
                </linearGradient>
                <linearGradient id="paint1_linear_52_537" x1="389.397" y1="-0.493865" x2="302.393" y2="92.0026" gradientUnits="userSpaceOnUse">
                    <stop offset="0.24978" stopColor={color} />
                    <stop offset="1" stopColor={color} stopOpacity="0" />
                </linearGradient>
                <linearGradient id="paint2_linear_52_537" x1="284" y1="1.2497" x2="234.464" y2="53.7852" gradientUnits="userSpaceOnUse">
                    <stop offset="0.24978" stopColor={color} />
                    <stop offset="1" stopColor={color} stopOpacity="0" />
                </linearGradient>
                <linearGradient id="paint3_linear_52_537" x1="326.955" y1="1.05939" x2="277.419" y2="53.5949" gradientUnits="userSpaceOnUse">
                    <stop offset="0.24978" stopColor={color} />
                    <stop offset="1" stopColor={color} stopOpacity="0" />
                </linearGradient>
                <linearGradient id="paint4_linear_52_537" x1="296.955" y1="1.05939" x2="247.419" y2="53.5949" gradientUnits="userSpaceOnUse">
                    <stop offset="0.24978" stopColor={color} />
                    <stop offset="1" stopColor={color} stopOpacity="0" />
                </linearGradient>
                <linearGradient id="paint5_linear_52_537" x1="258.855" y1="-3.94072" x2="209.318" y2="48.5948" gradientUnits="userSpaceOnUse">
                    <stop offset="0.24978" stopColor={color} />
                    <stop offset="1" stopColor={color} stopOpacity="0" />
                </linearGradient>
                <linearGradient id="paint6_linear_52_537" x1="351.049" y1="-1.87286" x2="301.512" y2="50.6626" gradientUnits="userSpaceOnUse">
                    <stop offset="0.24978" stopColor={color} />
                    <stop offset="1" stopColor={color} stopOpacity="0" />
                </linearGradient>
            </defs>
        </svg>

    );
};
export default BannerSlideIcon;
