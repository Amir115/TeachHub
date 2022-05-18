import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

const useWatchSocket = (streamPath: string) => {
    const [socket, setSocket] = useState<Socket | null>(null)

    const createSocket = () => {
        const socket = io(streamPath)
        socket.connect()

        return socket;
    }

    useEffect(() => {
        setSocket(createSocket())

        return () => {
            socket?.disconnect();
        }
    }, []);

    return socket;
}

export default useWatchSocket;