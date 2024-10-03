import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import LogoSovereignIcon from "../../assets/icons/logoSovereignIcon";
import "./PlusIntro.scss";

type Props = {
  setSelectedType: (i: string) => void;
  selectButtonType: string;
  isSubscriptionsOpen:
  | any
  | {
    platinum: boolean;
    gold: boolean;
    upgradeLoveLife: boolean;
    getBoost: boolean;
  };
  setSelectedButtonType: (i: string) => void;
};

const PlusIntro: React.FC<Props> = ({
  setSelectedType,
  selectButtonType,
  setSelectedButtonType,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const items = [
    {
      color: "#0A0D13B2",
      title: "TradLife Platinum™",
      body: "Level up every action you take on TradLife",
      type: "platinum",
    },
    {
      color: "#daa04a",
      title: "See Who Likes You",
      body: "See Who Likes You & More!",
      type: "gold",
    },
    {
      color: "#5C26DA",
      title: "TradLife Plus®",
      body: `Unlimited Likes, Rewinds and More!`,
      type: "plus",
    }
  ];

  useEffect(() => {
    const selectedType = items[currentSlideIndex].type;
    setSelectedType(selectedType);
    setSelectedButtonType(selectedType);
  }, [currentSlideIndex, setSelectedType, setSelectedButtonType]);

  const handleSlideChange = (swiper: any) => {
    setCurrentSlideIndex(swiper.realIndex);
  };

  return (
    <Swiper
      pagination={true}
      loop
      modules={[Pagination]}
      className={`plus-intro swiper-container slide-${selectButtonType}`}
      autoplay={{ delay: 2500 }}
      onSlideChange={handleSlideChange}
    >
      {items.map((item) => (
        <SwiperSlide key={item.title} className="swiper-container">
          <div>
            <div className="slide-title font-dosis">
              <LogoSovereignIcon color={item.color} />
              {item.title}
            </div>
            <div className="slide-body ion-text-center">{item.body}</div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default PlusIntro;
