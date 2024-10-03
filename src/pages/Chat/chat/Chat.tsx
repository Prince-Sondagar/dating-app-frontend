import React, { useState, useRef, useEffect } from "react";
import {
	IonPage,
	IonHeader,
	IonToolbar,
	IonButtons,
	IonBackButton,
	IonTitle,
	IonButton,
	IonIcon,
	IonContent,
	IonText,
	IonFooter,
	IonItem,
	IonSpinner,
} from "@ionic/react";
import { heartOutline, checkmarkDone, heart, arrowBack, ellipsisVertical } from "ionicons/icons";
import moment from "moment";
import Avatar from "../../../components/Avatar/Avatar";
import InputWithGiphy from "../../../components/InputWithGiphy/InputWithGiphy";
import useUser from "../../../hooks/useUser";
import useMessages from "../../../hooks/useMessages";
import { Message } from "../../../store/reducers/messages.reducer";
import "./Chat.scss";

type Props = {
	history: any;
};

interface IChat {
	date: string;
	messages: any;
}

interface ILikeItem {
	id?: string;
	fromUser?: {
		id?: string;
	};
	toUser?: {
		id?: string;
	};
	isLiked?: boolean | string;
	avatar?: string;
	type: string;
	message: string;
	isSeen: string;
	createdAt: string;
}

let scrollTimeout: any = null;
const Chat: React.FC<Props> = () => {
	const { user } = useUser();
	const { threadMessages, sendMessage, getPaginatedMessages, seenAllThreadMessages } = useMessages();
	const contentRef = useRef<React.RefObject<HTMLIonContentElement> | any>(null);
	const [isFalseScroll, setFalseScroll] = useState(false);
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		setMessages(threadMessages?.messages);
	}, [threadMessages]);

	useEffect(() => {
		const getUnseenMessages = threadMessages?.messages.filter((message: Message) => !message.isSeen);
		if (
			getUnseenMessages?.length &&
			threadMessages?.messages[threadMessages?.messages?.length - 1]?.fromUser?.id !== user?.id
		) {
			seenAllThreadMessages(threadMessages?.id);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [threadMessages, user]);

	useEffect(() => {
		if (!isFalseScroll) {
			scrollToBottom(0, true);
		}
		const contentEl = (document.getElementsByClassName("ion-padding ios content-ltr") as any)?.[0]?.scrollEl;

		contentEl?.addEventListener("scroll", () => {
			if (contentEl.scrollTop === 0) {
				if (scrollTimeout) {
					clearTimeout(scrollTimeout);
				}
				scrollTimeout = setTimeout(async () => {
					setFalseScroll(true);
					await getPaginatedMessages(20);
				}, 100);
			}
		});
	});

	const scrollToBottom = (duration: number = 1655, isFirstLoad: boolean = false) => {
		if (isFirstLoad) {
			setTimeout(() => {
				if (contentRef && contentRef.current) {
					// @ts-ignore
					contentRef.current.scrollToBottom(duration);
				}
			}, 500);
		} else {
			if (contentRef && contentRef.current) {
				// @ts-ignore
				contentRef.current.scrollToBottom(duration);
			}
		}
	};

	const nl2br = (text: string) => {
		if (!text) return text;
		return text.replace(/\n/gi, "<br>");
	};
	const handleLikeMessages = async (item: ILikeItem) => {
		setFalseScroll(true);
		item?.fromUser?.id !== user?.id &&
			sendMessage({
				type: "like",
				isLike: !item?.isLiked,
				messageId: item?.id,
			});
	};

	const groupedMessages =
		!!messages?.length &&
		messages?.reduce((acc: any, message: any) => {
			const date = moment(message?.createdAt).format("MMM Do YYYY");
			if (!acc[date]) {
				acc[date] = [];
			}
			acc[date].push(message);
			return acc;
		}, {});

	const chat: any = Object.keys(groupedMessages)?.map((date) => ({
		date,
		messages: groupedMessages[date],
	}));

	return (
		<IonPage className="chat-page">
			<IonHeader className="header-custom">
				<IonToolbar className="toolbar-no-border">
					<IonButtons slot="start">
						<IonBackButton className="chat-back-icon" icon={arrowBack} text="" defaultHref={"/tabs/chat"} />
					</IonButtons>
					{threadMessages?.userReceiver?.id === user?.id && (
						<IonTitle>
							<div className="ion-flex justify-content-space-between align-items-center">
								<Avatar size="md" imageUrl={threadMessages?.userSender?.profileMedia?.url} />
								<div className="user-name">
									{threadMessages?.userSender?.firstname} {threadMessages?.userSender?.lastname}
								</div>
							</div>
						</IonTitle>
					)}
					{threadMessages?.userSender?.id === user?.id && (
						<IonTitle>
							<div className="ion-flex justify-content-space-between align-items-center">
								<Avatar size="md" imageUrl={threadMessages?.userReceiver?.profileMedia?.url} />
								<div className="user-name">
									{threadMessages?.userReceiver?.firstname} {threadMessages?.userReceiver?.lastname}
								</div>
							</div>
						</IonTitle>
					)}
					{threadMessages?.id ? (
						<IonButtons slot="end" className="chat-more-icon">
							<IonButton>
								<IonIcon icon={ellipsisVertical} />
							</IonButton>
						</IonButtons>
					) : (
						<></>
					)}
				</IonToolbar>
			</IonHeader>
			{/* @ts-ignore: TS2739 */}
			{threadMessages?.id ? (
				<IonContent ref={contentRef}>
					<div className="chat-bg-color">
						<div className="chat-bg" ></div>
						<div className="ion-padding ion-text-center match-info">
							<IonText color="medium">
								YOU MATCHED WITH{" "}
								{threadMessages?.userReceiver?.id === user?.id
									? `${threadMessages?.userSender?.firstname} ${threadMessages?.userReceiver?.lastname}`
									: `${threadMessages?.userReceiver?.firstname} ${threadMessages?.userReceiver?.lastname}`}{" "}
								ON {moment(threadMessages?.createdAt).format("MM/DD/YYYY")}
							</IonText>
						</div>
						<div className="chat-list">
							{chat?.map(({ date, messages }: IChat, index: number) => (
								<div key={index}>
									<div className="chat-timestamp center">
										<strong>{date}</strong>
									</div>
									{messages.map((item: ILikeItem, index: number) => (
										<div
											className={`chat-item${item?.fromUser?.id === user?.id ? " chat-item-outgoing" : ""}`}
											key={index}
										>
											<div className="chat-item-inner ion-justify-content-between">
												<div className={`chat-body ${item.type === 'gif' ? 'gif-body' : ''}`}>
													<div className={`chat-item-bubble${item?.type === "gif" ? " bubble-image" : ""}`}>
														{item?.type !== "gif" && (
															<div className="chat-text" dangerouslySetInnerHTML={{ __html: nl2br(item?.message) }} />
														)}
														{item.type === "gif" && <img src={item?.message} alt="" />}
														<IonTitle size="small">
															{moment(item?.createdAt).format("LT")}
															{item?.fromUser?.id === user?.id && (
																<IonIcon icon={checkmarkDone} color={item?.isSeen ? "secondary" : "none"} />
															)}
														</IonTitle>
													</div>
												</div>
												{item?.fromUser?.id === user?.id && item?.isLiked && (
													<div className="chat-item-reaction gif-reaction">
														<IonIcon
															size="small"
															icon={item?.isLiked ? heart : ""}
															style={{ color: item?.isLiked ? "red" : "" }}
														/>
													</div>
												)}
												{item?.fromUser?.id !== user?.id && (
													<div className="chat-item-reaction">
														<IonIcon
															icon={item?.isLiked ? heart : heartOutline}
															onClick={() => handleLikeMessages(item)}
															style={{ color: item?.isLiked ? "red" : "" }}
														/>
													</div>
												)}
											</div>
										</div>
									))}
								</div>
							))}
						</div>
					</div>
				</IonContent>
			) : (
				!messages?.length && (
					<IonItem lines="none">
						<IonSpinner name="circular" className="chat-spinner"></IonSpinner>
					</IonItem>
				)
			)}

			<IonFooter>
				<IonToolbar className="toolbar-no-border">
					<InputWithGiphy onChange={sendMessage} />
				</IonToolbar>
			</IonFooter>
		</IonPage>
	);
};

Chat.defaultProps = {};

export default Chat;
