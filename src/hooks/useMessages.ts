import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { MessagesState, Thread } from "../store/reducers/messages.reducer";
import {
	fetchThreadsAction,
	fetchMessagesOfThreadAction,
	fetchPaginatedMessagesAction,
	updateMessagesOfThredAction,
	updateThredAction,
	seenAllThreadMessagesAction,
} from "../store/actions/messages.action";
import { SocketContext } from "../contexts/socketContext";
import { useHistory } from "react-router";
interface SendMessageType {
	type?: string | any;
	message?: string;
	imageUrl?: string;
	isLike?: boolean;
	messageId?: string;
}

const useMessages = () => {
	const { threads, thread, paginatedMessages } = useSelector<RootState, MessagesState>((state) => state.messages);
	const dispatch = useDispatch();
	const { socketClient } = useContext(SocketContext);

	const history = useHistory();
	const {
		location: { pathname },
	} = history;
	const [page] = useState<number>(1);
	const [threadMessages, setThreadMessages] = useState<any>();
	const threadId: any = pathname?.split("/")?.[3]?.toString() ?? null;
	useEffect(() => {
		setThreadMessages(thread);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(thread)]);

	useEffect(() => {
		const contentEl = (document.getElementsByClassName("ion-padding ios content-ltr") as any)?.[0]?.scrollEl;
		if (contentEl) contentEl.scrollTop = contentEl?.scrollHeight;

		setThreadMessages((prevThreadMessages: Thread) => ({
			...(prevThreadMessages ? prevThreadMessages : {}),
			messages: [
				...paginatedMessages.loadedMessages,
				...(prevThreadMessages?.messages ? prevThreadMessages.messages : []),
			],
		}));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [paginatedMessages.loadedMessages.length]);

	useEffect(() => {
		if (threadId) getMessagesOfThread(threadId, page);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		// eslint-disable-next-line react-hooks/exhaustive-deps
		socketClient?.on("receive-message", (data) => {
			setThreadMessages((prevThreadMessages: Thread) => ({
				...prevThreadMessages,
				messages: [
					...prevThreadMessages.messages,
					{
						message: data?.message,
						id: data?.id,
						toUser: { id: data?.toUser },
						fromUser: { id: data?.fromUser },
						type: data?.type,
					},
				],
			}));
		});
		socketClient?.on("user-offline", async (data) => {
			await dispatch<any>(fetchThreadsAction());
		});
		socketClient?.on("user-online", async (data) => {
			if (pathname === "/tabs/chats") await dispatch<any>(fetchThreadsAction());
		});

		socketClient?.on("receive-like-unlike", (data) => {
			setThreadMessages((prevMessages: Thread) => ({
				...prevMessages,
				messages: prevMessages?.messages?.map((item) => {
					return item.id === data?.messageId ? { ...item, isLiked: data?.like } : item;
				}),
			}));
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// User Info
	const getMessagesThreads = async () => {
		await dispatch<any>(fetchThreadsAction());
	};

	const updateMessageThreads = async ({ threadId, isNewMatch }: any) => {
		await dispatch<any>(updateThredAction({ threadId, isNewMatch }));
	};

	const getPaginatedMessages = async (limit?: number) => {
		if (paginatedMessages.hasMore)
			await dispatch<any>(fetchPaginatedMessagesAction({ threadId, page: paginatedMessages.currentPage + 1, limit }));
	};

	const getMessagesOfThread = async (threadId: string, page: number) => {
		await dispatch<any>(fetchMessagesOfThreadAction({ threadId, page }));
	};

	const seenAllThreadMessages = async (id: string) => {
		await dispatch<any>(seenAllThreadMessagesAction({ threadId: id }));
	};

	const sendMessage = async (data: SendMessageType) => {
		if (data?.type.toUpperCase() !== "LIKE") {
			const imageAndType =
				data.type.toUpperCase() === "IMAGE"
					? { type: "gif", message: data.imageUrl }
					: { type: "string", message: data.message };
			socketClient?.emit("message", JSON.stringify({ threadId, ...imageAndType }));
		} else {
			const sendLike = data?.type.toUpperCase() === "LIKE" && { like: data?.isLike, messageId: data?.messageId };
			setThreadMessages({
				...threadMessages,
				messages: threadMessages?.messages?.map((item: any) =>
					item.id === data?.messageId ? { ...item, isLiked: data?.isLike } : item,
				),
			});
			socketClient?.emit("send-like-unlike", JSON.stringify({ threadId, ...sendLike }));
		}
	};

	const updateMessages = async ({ threadId, messageId, type }: any) => {
		await dispatch<any>(updateMessagesOfThredAction({ threadId, messageId, type }));
	};

	return {
		threads,
		thread,
		getMessagesThreads,
		getPaginatedMessages,
		updateMessages,
		threadMessages,
		setThreadMessages,
		socketClient,
		getMessagesOfThread,
		updateMessageThreads,
		seenAllThreadMessages,
		sendMessage,
	};
};

export default useMessages;
