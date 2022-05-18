import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { ChatMessage } from '../../../../../common/types';

const useWatchComments = (socket: Socket | null) => {
    const [comments, setComments] = useState<ChatMessage[]>([]);
    
    const setupSocket = () => {
        if (!socket) return;

        const handleComment = (comments: ChatMessage[]) => {
            setComments(comments);
        };

        socket?.on('comment', handleComment)
    }

    useEffect(() => {
        setupSocket();
    }, [socket])

    return comments
}

export default useWatchComments;