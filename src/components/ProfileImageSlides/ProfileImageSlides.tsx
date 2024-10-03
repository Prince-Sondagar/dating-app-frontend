import React, { useState, useRef } from "react";
import { TapticEngine } from "@ionic-native/taptic-engine";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import { IonIcon } from "@ionic/react";
import { chevronBack, chevronForward } from "ionicons/icons";
import "./ProfileImageSlides.scss";

type Props = {
	images: any[];
	isClickable?: boolean;
	currentIndex: number;
	onNoMoreSlide?: (l: boolean) => void;
	onChange?: (i: number) => void;
};

const ProfileImageSlides: React.FC<Props> = ({ images, isClickable, onChange, onNoMoreSlide, currentIndex }) => {
	const [activeIndex, setActiveIndex] = useState<number>(0);
	const [currentEnd, setCurrentEnd] = useState<number>(-1);
	const swiperRef = useRef<any>(null);

	const handleSlideChange = () => {
		const activeIndex = swiperRef.current?.activeIndex;
		if (activeIndex !== undefined) {
			setActiveIndex(activeIndex);
			if (onChange) onChange(activeIndex);
		}
	};

	const handleMoveSlide = (step: number = 1) => {
		if (swiperRef.current) {
			if (step === -1) {
				swiperRef.current.slidePrev();
			} else if (step === 1) {
				swiperRef.current.slideNext();
			}

			if (step === currentEnd) {
				// Could not go next or prev
				onNoMore(currentEnd === -1);
			} else {
				setCurrentEnd(0);
				TapticEngine.selection();
			}
		}
	};

	const onNoMore = (isOnTheLeft: boolean) => {
		if (onNoMoreSlide) onNoMoreSlide(isOnTheLeft);
		TapticEngine.notification({ type: "warning" });
	};

	const handleReachStart = () => {
		setCurrentEnd(-1);
	};

	const handleReachEnd = () => {
		setCurrentEnd(1);
	};

	if (!images || images.length === 0) return null;

	return (
		<div className="profile-image-slides">
			<Swiper
				className="slides"
				loop={false}
				onSlideChange={handleSlideChange}
				onSwiper={(swiper) => (swiperRef.current = swiper)}
				onReachBeginning={handleReachStart}
				onReachEnd={handleReachEnd}
			>
				{images.map((item, key: number) => (
					<SwiperSlide key={item?.id}>
						<div
							className="slide-img background-img"
							style={{ backgroundImage: `url('${item?.url || item?.imageUrl}')` }}
						/>
					</SwiperSlide>
				))}
			</Swiper>
			<div className="custom-pagination profile-custom-pagination">
				{images.map((item, index) => (
					<div
						key={item.id}
						className={`pagination-bullet${activeIndex === index ? " pagination-bullet-active" : ""}`}
					/>
				))}
			</div>

			{isClickable && images.length > 0 && (
				<div className={`overlay-navigation ${images.length - 1 === currentIndex && "current-overlay"}`}>
					{currentIndex > 0 && (
						<div className="navi navi-left">
							<IonIcon icon={chevronBack} color="primary" onClick={() => handleMoveSlide(-1)} />
						</div>
					)}
					{currentIndex < images.length - 1 && (
						<div className="navi navi-right">
							<IonIcon icon={chevronForward} color="primary" onClick={() => handleMoveSlide(1)} />
						</div>
					)}
				</div>
			)}
		</div>
	);
};

ProfileImageSlides.defaultProps = {
	isClickable: false,
	onNoMoreSlide: () => {},
	onChange: () => {},
};

export default ProfileImageSlides;
