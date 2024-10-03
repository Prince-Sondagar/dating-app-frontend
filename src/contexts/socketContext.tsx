import { createContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export const SocketContext = createContext<
    { socketClient?: Socket | null }
>({});

const SocketContextProvider = ({ children }: any) => {
    const [socketClient, setSocketClient] = useState<Socket | null>(null);
    useEffect(() => {
        if (!socketClient?.connected) {
            const socket: Socket = io(`${process.env.REACT_APP_SOCKET_URL}/message`, {
                transports: ['websocket'],
                auth: {
                    token: JSON.parse(localStorage.getItem('tokens') ?? "{}").access_token
                }
            });
            setSocketClient(socket);
        }
    }, [])

    return (
        <SocketContext.Provider value={{ socketClient }}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketContextProvider;