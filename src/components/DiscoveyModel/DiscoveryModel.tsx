import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import * as swing from "swing";
import ReactSwing from "react-swing";
import API, { APISuccessResponse } from "../../utils/axios";
import {
	IonHeader,
	IonToolbar,
	IonButtons,
	IonIcon,
	IonRow,
	IonButton,
	IonGrid,
	IonCol,
	useIonViewWillEnter,
	IonModal,
	IonText,
} from "@ionic/react";
import { close, closeSharp, flash, heartSharp, refresh } from "ionicons/icons";
import { enterAnimation, leaveAnimation } from "../../animations/animations2";
import RippleLoader from "../RippleLoader/RippleLoader";
import SwipeCard from "../SwipeCard/SwipeCard";
import { useDebouncedCallback } from "use-debounce";
import UserSubscription from "../../hooks/userSubscription";
import useAuth from "../../hooks/useAuth";
import useUser from "../../hooks/useUser";
import { User } from "../../store/reducers/user.reducer";
import { useHistory } from "react-router";
import MatchedModal from "../../pages/MatchedModal/MatchedModal";
import Profile from "../../pages/Profile/Profile";
import GetBoostModal from "../../pages/Settings/SubscriptionModals/GetBoostModal";
import SuperLikesModal from "../../pages/Settings/SubscriptionModals/SuperLikesModal";
import PlatinumModal from "../../pages/Settings/SubscriptionModals/PlatinumModal";
import GoldModal from "../../pages/Settings/SubscriptionModals/GoldModal";
import Settings from "../../pages/Settings/Settings";
import NoUserModel from "../NoUserModel/NoUserModel";
import profileStar from '../../assets/img/profile_star.svg'

import "./DiscoveryModel.scss";

type Props = {
	type: string;
	onClose: () => void;
	selectedType: any;
	isLoading: boolean;
	setIsLoading: Dispatch<SetStateAction<boolean>>;
};

type UserType = {
	id: number;
	name: string;
	age: number;
	job_title: string;
	profile_image_url: string;
	images: any[];
};

const DiscoveryModel: React.FC<Props> = ({ type, onClose, selectedType, isLoading, setIsLoading }) => {
	const { user: userProfile } = useAuth();
	const { user, getNearbyUsers, setUserInterest, getUserProfileMedia } = useUser();
	const { subscription } = UserSubscription();
	const {
		subscriptionDetail: { subscriptionDetail },
	} = subscription;
	let stackRef = useRef();
	let nopeEl: HTMLElement | null = null;
	let likeEl: HTMLElement | null = null;
	let superlikeEl: HTMLElement | null = null;
	let nextCardEl: HTMLElement | null = null;

	const [isLocked, setIsLocked] = useState<boolean>(false);
	const [isMatchModalOpen, setIsMatchModalOpen] = useState<boolean>(false);
	const [matchUser,setMatchUser] = useState<User | null>(null);
	const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
	const [currentProfile] = useState<UserType | null>(null);
	const [nearbyUsers, setNearbyUsers] = useState<User[]>();
	const [stack, setStack] = useState<swing.Stack | null>(null);
	const [activeButton, setActiveButton] = useState("");
	const [isDiscoveryOpen, setIsDiscoveryOpen] = useState<{ setting: boolean }>({
		setting: false,
	});
	const [isNoUserModel, setOpenNoUserModel] = useState(false);
	const history = useHistory();
	const [isSubscriptionOpen, setIsSubscriptionOpen] = useState<{
		getBoost: boolean;
		getSuperLikes: boolean;
		platinum: boolean;
		gold: boolean;
	}>({
		platinum: false,
		getBoost: false,
		getSuperLikes: false,
		gold: false,
	});

	const getNearByUsers = useDebouncedCallback(async (id) => {
		await API.get<APISuccessResponse, any>(`/user/me`);
		await getNearbyUsers(type === "discovery" ? selectedType?.id : "");
		if (!userProfile?.profileMedias) await getUserProfileMedia();
	}, 500);

	useIonViewWillEnter(() => {
		getNearByUsers(type === "discovery" ? selectedType?.id : "");
	}, []);

	useEffect(() => {
		getNearByUsers(type === "discovery" ? selectedType?.id : "");
		setTimeout(() => {
			if (type === "discovery" && !nearbyUsers?.length && nearbyUsers?.length !== undefined) {
				setOpenNoUserModel(true);
			}
		}, 1000);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		getData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user?.nearbyUsers]);

	const getData = async () => {
		// API call goes here
		setIsLoading(true);
		setTimeout(() => {
			// @ts-ignore
			if (user?.nearbyUsers?.length > 0) setIsLoading(false);
		}, 3000);
		if (user?.nearbyUsers) setNearbyUsers([...user?.nearbyUsers]);
	};

	const getTopCardEl = () => {
		if (stackRef) {
			// @ts-ignore
			let { children } = stackRef?.current;
			let targetEl;
			if (children?.length >= 1) {
				targetEl = children[children?.length - 1];
			}

			if (targetEl) return targetEl;
		}

		return null;
	};

	const getNextCardEl = () => {
		if (stackRef) {
			// @ts-ignore
			const { children } = stackRef.current;
			let targetEl;

			if (children.length >= 2) {
				targetEl = children[children.length - 2];
			}

			if (targetEl) return targetEl;
		}

		return null;
	};

	const handleSetStack = (swingStack: any) => {
		setStack(swingStack);
		const topCardEl = getTopCardEl();
		if (topCardEl) {
			nopeEl = topCardEl.querySelector(".stamp-nope");
			likeEl = topCardEl.querySelector(".stamp-like");
			superlikeEl = topCardEl.querySelector(".stamp-super-like");
		}
		nextCardEl = getNextCardEl();
	};

	// Called whenever we drag an element
	const handleCardDragging = (element: HTMLElement, x: number, y: number, r: number) => {
		const calculatedValue = Math.min(100, Math.abs(x) - 20) / 100; // 0 <-> 1 for Opacity
		const calculatedYValue = Math.max(100, Math.abs(y) - 20) / 100; // 0 <-> 1 for Opacity
		window.requestAnimationFrame(() => {
			element.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${r}deg)`;
		});
		nopeEl = element.querySelector(".stamp-nope");
		likeEl = element.querySelector(".stamp-like");
		superlikeEl = element.querySelector(".stamp-super-like");
		if (Math.abs(x) > 20 && Math.abs(x) <= element.offsetWidth / 2) {
			window.requestAnimationFrame(() => {
				// @ts-ignore
				nopeEl.style.opacity = x < 0 ? calculatedValue : 0;
				// @ts-ignore
				likeEl.style.opacity = x < 0 ? 0 : calculatedValue;
			});

			// Zoom effect for the card behind the current one
			window.requestAnimationFrame(() => {
				if (nextCardEl) {
					nextCardEl.style.transform = `translate3d(0,0,0) scale(${0.94 + 0.06 * calculatedValue}, ${0.94 + 0.06 * calculatedValue
						})`;
				}
			});
		} else if (x === 0) {
			window.requestAnimationFrame(() => {
				// @ts-ignore
				likeEl.style.opacity = 0;
				// @ts-ignore
				nopeEl.style.opacity = 0;
			});
		}
		if (Math.abs(y) > 20 && Math.abs(y) <= element.offsetHeight / 2) {
			window.requestAnimationFrame(() => {
				// @ts-ignore
				superlikeEl.style.opacity = y < 0 ? calculatedYValue : 0;
			});

			// Zoom effect for the card behind the current one
			window.requestAnimationFrame(() => {
				if (nextCardEl) {
					nextCardEl.style.transform = `translate3d(0,0,0) scale(${0.94 + 0.06 * calculatedYValue}, ${0.94 + 0.06 * calculatedYValue
						})`;
				}
			});
		} else if (y === 0) {
			window.requestAnimationFrame(() => {
				// @ts-ignore
				superlikeEl.style.opacity = 0;
			});
		}
	};

	const handleToggleProfile = () => {
		setIsProfileOpen(!isProfileOpen);
	};

	const handleThrowIn = async (e: any) => {
		setIsLocked(false);
		if (!user?.superLikes && e?.throwDirection === ReactSwing.DIRECTION.UP)
			return setIsSubscriptionOpen({ ...isSubscriptionOpen, getSuperLikes: true });
		if (e?.throwDirection === ReactSwing.DIRECTION.UP) await handleCardThrowOutEnd("superliked");
	};

	const handleCardThrowOutEnd = async (type: string) => {
		if (type === "revise" && !subscriptionDetail?.UnlimitedRewinds)
			return setIsSubscriptionOpen({ ...isSubscriptionOpen, platinum: true });
		if (type === "boost" && !user?.boosts) return setIsSubscriptionOpen({ ...isSubscriptionOpen, getBoost: true });
		if (isLocked) return false;
		// Remove the last element
		let cardList: any = nearbyUsers;
		
		// Scale the top card to its full size
		const removedCard: User = cardList[cardList?.length - 1];
		const data = await setUserInterest({ interestedUser: removedCard?.id }, type);
		if (type === "boost") return;
		if (type === "liked" && data?.payload?.data?.isMatch) {
			setMatchUser({...removedCard, threadId: data?.payload?.data?.threadId})
			handleToggleMatchModal()
		}
		// Remove the last element
		cardList.pop();

		setNearbyUsers(cardList);
		const topCardEl = getTopCardEl();
		if (topCardEl) {
			topCardEl.style.transform = "scale(1, 1)";
		}
		setIsLocked(false);
		setActiveButton("");
		// If there's no more cards left, show Loading screen and load more
		if (nearbyUsers?.length === 0) {
			await getNearbyUsers(type === "discovery" ? selectedType?.id : "");
		}
	};

	const handleButtonClicked = async (type: string, direction: string) => {
		if (direction === ReactSwing.DIRECTION.UP && !user?.superLikes)
			return setIsSubscriptionOpen({ ...isSubscriptionOpen, getSuperLikes: true });
		setActiveButton(direction);
		if (isLocked) return false;
		if (stackRef && stack) {
			const topCardEl = getTopCardEl();
			if (topCardEl) {
				nopeEl = topCardEl.querySelector(".stamp-nope");
				likeEl = topCardEl.querySelector(".stamp-like");
				superlikeEl = topCardEl.querySelector(".stamp-super-like");
				if (type === "rejected") {
					// @ts-ignore
					nopeEl.style.opacity = "1";
				} else if (type === "superliked") {
					// @ts-ignore
					superlikeEl.style.opacity = "1";
				} else {
					// @ts-ignore
					likeEl.style.opacity = "1";
				}
				if (type === "superliked" && ReactSwing.DIRECTION.UP)
					return handleThrowIn({
						throwDirection: ReactSwing.DIRECTION.UP,
					});
				setTimeout(() => {
					const card = stack.getCard(topCardEl);
					const throwX = type === "rejected" ? -0.5 * topCardEl.offsetWidth : 0.5 * topCardEl.offsetWidth;
					const throwY = -1 * topCardEl.offsetHeight;

					// @ts-ignore
					card.throwOut(
						type !== "superliked" ? throwX : 0,
						type === "superliked" ? throwY : 20,
						(type === "superliked" && ReactSwing.DIRECTION.UP) ||
						(type === "rejected" && ReactSwing.DIRECTION.LEFT) ||
						(type === "liked" && ReactSwing.DIRECTION.RIGHT),
					);
				}, 500);
			}
		}
	};

	const handleToggleMatchModal = () => {
		setIsMatchModalOpen(!isMatchModalOpen);
	};

	const handleNoMoreSlide = (isOnTheLeft: boolean) => {
		if (stackRef && stackRef.current) {
			const className = isOnTheLeft ? "rotate-left" : "rotate-right";

			// @ts-ignore
			stackRef.current.classList.add(className);
			setTimeout(() => {
				// @ts-ignore
				stackRef.current.classList.remove(className);
			}, 250);
		}
	};

	let stackConfig = {
		// Default setting only allows UP, LEFT and RIGHT so you can override this as below
		allowedDirections: [ReactSwing.DIRECTION.LEFT, ReactSwing.DIRECTION.RIGHT, ReactSwing.DIRECTION.UP],
		throwOutConfidence: (offsetX: number, _offsetY: number, element: HTMLElement) => {
			return Math.min(Math.abs(offsetX) / (element.offsetWidth / 2), 1);
		},
		transform: (element: HTMLElement, x: number, y: number, r: number) => {
			handleCardDragging(element, x, y, r);
		},
		throwOutDistance: () => {
			return window.outerWidth * 2;
		},
	};

	return (
		<>
			<IonHeader>
				{type === "discovery" && (
					<IonToolbar className="toolbar-no-border ion-padding-top disc-toolbar">
						<h6>{selectedType?.superPassion}</h6>
						<IonButtons slot="start" onClick={onClose}>
							<IonIcon icon={close} slot="icon-only" />
						</IonButtons>
					</IonToolbar>
				)}
			</IonHeader>
			{/* <IonContent className="explore-bg explore-page" forceOverscroll={false}> */}
			{(isLoading && (
				<div className="full-height safe-area-bottom">
					<IonRow className="full-height ion-justify-content-center ion-align-items-center">
						<RippleLoader imageUrl={`${userProfile?.profileMedias?.[0]?.url ?? "assets/img/profile/noProfile.jpg"}`} />
						{nearbyUsers?.length === 0 && (
							<div className="discover-loader-title">
								<IonText className="font-dosis">We’re looking for people near <br /> to you</IonText>
							</div>
						)}
					</IonRow>
				</div>
			)) ||
				null}
			{(!isLoading && (
				<div className="cards-container safe-area-bottom">
					{/* @ts-ignore: TS2739 */}
					<ReactSwing
						ref={stackRef}
						className="card-stack"
						setStack={handleSetStack}
						config={stackConfig}
						throwin={handleThrowIn}
						dragmove={(e: any) => setActiveButton(e?.throwDirection)}
						dragend={() => setActiveButton("")}
						throwoutleft={(e: any) => handleCardThrowOutEnd("rejected")}
						throwoutright={(e: any) => handleCardThrowOutEnd("liked")}
					>
						{nearbyUsers?.map((item: User, index: number) => (
							<div
								className={`discovery-swipe-card card-item${index < nearbyUsers?.length - 2 ? " ion-hide" : ""}`}
								key={item.id}
								data-card-id={item.id}
							>
								<SwipeCard user={item} onNoMoreSlide={handleNoMoreSlide} />

								<div className="stamp stamp-like">Like</div>
								<div className="stamp stamp-nope">Nope</div>
								<div className="stamp stamp-super-like">Super Like</div>
							</div>
						)) || null}
					</ReactSwing>
					<div className="card-actions">
						{(nearbyUsers?.length && (
							<IonGrid>
								<IonRow className="ion-justify-content-between ion-align-items-center">
									<IonCol size="auto">
										<IonButton
											fill="clear"
											color="gold"
											className="button-custom button-icon button-revert button-transparent"
											onClick={() => handleCardThrowOutEnd("revise")}
										>
											<IonIcon slot="icon-only" icon={refresh} />
										</IonButton>
									</IonCol>
									<div className="center-icon">
										<IonCol size="auto">
											<IonButton
												fill="solid"
												color="like"
												className={`button-custom button-icon button-dislike button-lg discover-button-lg ${activeButton === ReactSwing.DIRECTION.LEFT && "active"
													}`}
												disabled={!nearbyUsers?.length}
												onClick={() => handleButtonClicked("rejected", ReactSwing.DIRECTION.LEFT)}
											>
												<IonIcon slot="icon-only" icon={closeSharp} />
											</IonButton>
										</IonCol>
										<IonCol size="auto">
											<IonButton
												fill="solid"
												color="superliked"
												className={`button-custom button-icon button-star ${activeButton === ReactSwing.DIRECTION.UP && "active"
													}`}
												disabled={!nearbyUsers?.length}
												onClick={() => handleButtonClicked("superliked", ReactSwing.DIRECTION.UP)}
											>
												<img src={profileStar} alt="profileStar" className="profile-star" />
											</IonButton>
										</IonCol>
										<IonCol size="auto">
											<IonButton
												fill="solid"
												color="like"
												className={`button-custom button-icon button-like button-lg discover-button-lg ${activeButton === ReactSwing.DIRECTION.RIGHT && "active"
													}`}
												disabled={!nearbyUsers?.length}
												onClick={() => handleButtonClicked("liked", ReactSwing.DIRECTION.RIGHT)}
											>
												<IonIcon slot="icon-only" icon={heartSharp} />
											</IonButton>
										</IonCol>
									</div>
									<IonCol size="auto">
										<IonButton
											fill="clear"
											color="boost"
											className="button-custom button-icon button-boost button-transparent"
											onClick={() => handleCardThrowOutEnd("boost")}
										>
											<IonIcon slot="icon-only" icon={flash} />
										</IonButton>
									</IonCol>
								</IonRow>
							</IonGrid>
						)) ||
							null}
					</div>
				</div>
			)) ||
				null}
			<IonModal canDismiss isOpen={isMatchModalOpen} enterAnimation={enterAnimation} leaveAnimation={leaveAnimation}>
				<MatchedModal onClose={handleToggleMatchModal} matchUser={matchUser} setMatchUser={setMatchUser}/>
			</IonModal>

			<IonModal isOpen={isProfileOpen} canDismiss>
				<Profile user={currentProfile} onClose={handleToggleProfile} />
			</IonModal>
			<IonModal
				isOpen={isSubscriptionOpen?.getBoost}
				onDidDismiss={() => setIsSubscriptionOpen({ ...isSubscriptionOpen, getBoost: false })}
				className="boost-model"
			>
				<GetBoostModal onClose={() => setIsSubscriptionOpen({ ...isSubscriptionOpen, getBoost: false })} />
			</IonModal>

			<IonModal
				isOpen={isSubscriptionOpen?.getSuperLikes}
				onDidDismiss={() => setIsSubscriptionOpen({ ...isSubscriptionOpen, getSuperLikes: false })}
				className="super-likes-model"
			>
				<SuperLikesModal
					onClose={() => setIsSubscriptionOpen({ ...isSubscriptionOpen, getSuperLikes: false })}
					setOpenSubscriptionModel={setIsSubscriptionOpen}
					isOpenSubscriptionModel={{ gold: true }}
					subscriptonType={{ type: "" }}
				/>
			</IonModal>

			<IonModal
				isOpen={isSubscriptionOpen?.platinum}
				onDidDismiss={() => setIsSubscriptionOpen({ ...isSubscriptionOpen, platinum: false })}
				className={`platinum-model plus-model`}
			>
				<PlatinumModal
					subscriptionType={"plus"}
					onClose={() => setIsSubscriptionOpen({ ...isSubscriptionOpen, platinum: false })}
				/>
			</IonModal>

			<IonModal
				isOpen={isSubscriptionOpen?.gold}
				onDidDismiss={() => setIsSubscriptionOpen({ ...isSubscriptionOpen, gold: false })}
				className="gold-model"
			>
				<GoldModal onClose={() => setIsSubscriptionOpen({ ...isSubscriptionOpen, gold: false })} />
			</IonModal>

			<IonModal
				isOpen={isDiscoveryOpen?.setting}
				onDidDismiss={() => setIsDiscoveryOpen({ ...isDiscoveryOpen, setting: false })}
			>
				<Settings history={history} onClose={() => setIsDiscoveryOpen({ ...isDiscoveryOpen, setting: false })} />
			</IonModal>

			<IonModal className="no-user-modal" isOpen={isNoUserModel} onDidDismiss={() => setOpenNoUserModel(false)}>
				<NoUserModel
					onDisable={() => setOpenNoUserModel(false)}
					onClose={() => {
						setOpenNoUserModel(false);
						onClose();
					}}
				/>
			</IonModal>
		</>
	);
};

export default DiscoveryModel;
