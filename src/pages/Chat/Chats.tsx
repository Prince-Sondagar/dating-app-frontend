import React, { Fragment, useEffect, useState } from "react";
import {
	IonPage,
	IonHeader,
	IonToolbar,
	IonLabel,
	IonContent,
	IonSearchbar,
	IonText,
	IonIcon,
	IonRow,
	IonCol,
	IonBadge,
	IonSkeletonText,
} from "@ionic/react";
import { checkmarkDone } from "ionicons/icons";
import Avatar from "../../components/Avatar/Avatar";
import "./Chats.scss";
import useMessages from "../../hooks/useMessages";
import { Thread } from "../../store/reducers/messages.reducer";
import useUser from "../../hooks/useUser";
import logo from '../../assets/img/logo-blue.svg'
import chatAddIcon from '../../assets/img/chat_add.svg'

type Props = {
	history: any;
};

const Matches: React.FC<Props> = ({ history }) => {
	const { user } = useUser();
	const [page] = useState<number>(1);
	const { threads, getMessagesThreads, updateMessageThreads, getMessagesOfThread } = useMessages();
	const [searchValue, setSearchValue] = useState<string>("");
	const [segmentView, setSegmentView] = useState<string>("LIST");
	const [allThreads, setAllThreads] = useState<any>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		getMessagesThreads();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		setIsLoading(true);
		setTimeout(() => {
			// @ts-ignore
			setIsLoading(false);
		}, 1000);
		setAllThreads(threads);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(threads)]);

	const goToChat = async (thread: Thread) => {
		if (thread?.id) {
			getMessagesOfThread(thread?.id, page);
			if (thread?.isNewMatch) {
				try {
					await updateMessageThreads({ threadId: thread?.id, isNewMatch: false });
					await getMessagesThreads();
				} catch (error) {
					console.log("Error updating message threads:", error);
				}
			}
			await history.push(`/tabs/chats/${thread?.id}`);
		}
	};

	const handleSearchMessages = (value: string) => {
		setSearchValue(value);
		setAllThreads(
			threads.filter(({ userReceiver, userSender }) => {
				const { firstname, lastname } = userReceiver;
				const { firstname: senderFirstName, lastname: senderLastName } = userSender;
				return (
					`${firstname}  ${lastname}`.toLowerCase().includes(value.toLowerCase()) ||
					`${senderFirstName}  ${senderLastName}`.toLowerCase().includes(value.toLowerCase())
				);
			}),
		);
	};

	return (
		<IonPage className="chats-page">
			<IonHeader className="">
				<div className="ion-padding-start chat-logo">
					<img src={logo} alt="logo" />
				</div>
				<IonToolbar className="toolbar-no-border toolbar-no-safe-area ">
					<div className="ion-flex ion-justify-content-between chat-header">
						<img src={chatAddIcon} alt="chatAddIcon" />
						<IonText className="font-dosis">Conversations</IonText>
					</div>
				</IonToolbar>
				<IonSearchbar
					placeholder="Search conversation"
					className="search-bar"
					value={searchValue}
					onIonClear={(e) => handleSearchMessages("")}
					onInput={(e: any) => handleSearchMessages(e.target.value)}
				></IonSearchbar>
			</IonHeader>

			<IonContent className="matches-page">
				<div className="safe-area-bottom">
					{segmentView === "LIST" && (
						<div>

							{isLoading && (
								<>
									<div className="list-header">
										<IonText color="primary">
											<strong>New matches</strong>
										</IonText>
									</div>
									<div className="scroll-horizontal matches-list">
										{[...Array(4)]?.map((_, index: number) => {
											return (
												<div className="scroll-item matches-item" key={index}>
													<div className="profile-image">
														<Avatar size="lg" imageUrl={""} />
													</div>
													<div className="scroll-item-title text-ellipsis">
														<IonSkeletonText animated={true} style={{ width: "100%" }}></IonSkeletonText>
													</div>
												</div>
											);
										})}
									</div>
								</>
							)}

							{!isLoading && allThreads?.filter((thread: Thread) => thread?.isNewMatch).length > 0 && (
								<div>
									<div className="list-header">
										<IonText color="primary">
											<strong>New matches</strong>
										</IonText>
									</div>

									<div className="scroll-horizontal matches-list">
										{allThreads?.map(
											(thread: Thread, index: number) =>
												thread?.isNewMatch && (
													<Fragment key={index}>
														{thread?.userReceiver?.id === user?.id && (
															<div className="scroll-item matches-item" key={index} onClick={() => goToChat(thread)}>
																<div className="profile-image">
																	<Avatar size="lg" imageUrl={thread?.userSender?.profileMedia?.url} />
																	{thread?.userSender?.isActive && <div className="online-status" />}

																	<div className="online-status" />
																</div>
																<div className="scroll-item-title text-ellipsis">{thread?.userSender?.firstname}</div>
															</div>
														)}
														{thread?.userSender?.id === user?.id && (
															<div className="scroll-item matches-item" key={index} onClick={() => goToChat(thread)}>
																<div className="profile-image">
																	<Avatar size="lg" imageUrl={thread?.userReceiver?.profileMedia?.url} />
																	{thread?.userReceiver?.isActive && <div className="online-status" />}
																</div>
																<div className="scroll-item-title text-ellipsis">{thread?.userReceiver?.firstname}</div>
															</div>
														)}
													</Fragment>
												),
										)}
									</div>
								</div>
							)}
							<div>
								<div className="message-list">
									{isLoading &&
										[...Array(4)]?.map((_, index) => {
											return (
												<IonRow className="ion-align-items-center " key={index}>
													<div className="profile-image">
														<Avatar size="lg" imageUrl={""} />
													</div>
													<IonCol className="message-item-text">
														<IonLabel>
															<h3>
																<IonSkeletonText animated={true} style={{ width: "30%" }}></IonSkeletonText>
															</h3>
															<p>
																<IonSkeletonText animated={true} style={{ width: "50%" }}></IonSkeletonText>
															</p>
														</IonLabel>
													</IonCol>
												</IonRow>
											);
										})}
									{!isLoading &&
										allThreads?.map(
											(thread: Thread, index: number) =>
												!thread?.isNewMatch && (
													<div key={index}>
														{thread?.userSender?.id === user?.id && (
															<IonRow className="ion-align-items-center" key={index} onClick={() => goToChat(thread)}>
																<div className="profile-image">
																	<Avatar size="lg" imageUrl={thread?.userReceiver?.profileMedia?.url} />
																	{thread?.userReceiver?.isActive && <div className="online-status" />}

																</div>
																<IonCol className="message-item-text">
																	<div>
																		<div className="user-name ion-flex ion-align-items-center">
																			{thread?.userReceiver?.firstname} {thread?.userReceiver?.lastname}
																			<div className="msg-minute-ago">20m</div>
																		</div>
																		<div className="row">
																			<IonText color="medium">
																				{thread?.messages[0]?.type === "string" && thread?.messages[0]?.message}
																			</IonText>
																			{thread?.unSeenMessageCount > 0 && (
																				<div className="unseen-badge">
																					<IonBadge color="primary">{thread?.unSeenMessageCount}</IonBadge>
																				</div>
																			)}
																		</div>
																	</div>
																</IonCol>
															</IonRow>
														)}
														{thread?.userReceiver?.id === user?.id && (
															<IonRow className="ion-align-items-center" key={index} onClick={() => goToChat(thread)}>
																<div className="profile-image">
																	<Avatar size="lg" imageUrl={thread?.userSender?.profileMedia?.url} />
																	{thread?.userSender?.isActive && <div className="online-status" />}
																</div>
																<IonCol className="message-item-text">
																	<div>
																		<div className="user-name">
																			{thread?.userSender?.firstname} {thread?.userSender?.lastname}
																		</div>
																		<div className="row">
																			<IonText color="medium">
																				{thread?.messages[0] && thread?.messages[0]?.toUser?.id !== user?.id && (
																					<IonIcon
																						icon={checkmarkDone}
																						color={thread?.messages[0]?.isSeen ? "secondary" : "none"}
																					/>
																				)}
																				{thread?.messages[0]?.type === "string" && thread?.messages[0]?.message}
																			</IonText>
																			{thread?.unSeenMessageCount > 0 && (
																				<div className="unseen-badge">
																					<IonBadge color="primary">{thread?.unSeenMessageCount}</IonBadge>
																				</div>
																			)}
																		</div>
																	</div>
																</IonCol>
															</IonRow>
														)}
													</div>
												),
										)}
									{!isLoading && !allThreads?.filter((thread: Thread) => !thread?.isNewMatch).length && (
										<div className="list-header ion-text-center no-result-found">
											<IonText color="primary">
												<strong>No Result Found!</strong>
											</IonText>
										</div>
									)}
								</div>
							</div>
						</div>
					)}
				</div>
			</IonContent>
		</IonPage>
	);
};

Matches.defaultProps = {};

export default Matches;
