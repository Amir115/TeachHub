
import { Server } from 'http'
import { Server as SocketIOServer, Socket } from 'socket.io';
import {v4 as uuidv4} from 'uuid'

import ChatMessage from '../models/chatMessage/ChatMessage';
import { sessionMiddleware, passportMiddleware, passportSessionMiddleware } from '../middlwares/auth';

const USER_JOIN_EVENT = 'userjoin'
const USER_IMAGE_EVENT = 'userimage'
const CHAT_MESSAGE_EVENT = 'chatmessage'

// TODO: Make this really get the user id
const getUserId = (userSocket: Socket) => {
    const token = userSocket.handshake.query.token;
    const userId = token === 'secret' ? '1' : 'xxx';

    return userId
}

export default (server: Server) => {
    const io = new SocketIOServer(server)

    // Authentication
    // @ts-ignore
    io.use((socket, next) => sessionMiddleware(socket.request, {}, next))
    // @ts-ignore
    io.use((socket, next) => passportMiddleware(socket.request, {}, next))
    io.use((socket, next) => passportSessionMiddleware(socket.request, {}, next))

    io.of(/^\/watch\/\w+$/).on("connection", userSocket => {
        const userId = getUserId(userSocket)
        const namespace = userSocket.nsp; // newNamespace.name === "/watch/101"

        // Tell other users about me
        namespace.emit(USER_JOIN_EVENT, userSocket.id, userId);

        // Tell me about the others
        namespace.sockets.forEach(otherSocket => {
            userSocket.emit(USER_JOIN_EVENT, otherSocket.id, getUserId(otherSocket))
        })

        userSocket.on('disconnect', reason => {
            namespace.emit('userleft', userSocket.id)
            console.log(reason)
        })

        userSocket.on(CHAT_MESSAGE_EVENT, message => {
            // TODO: finish this
            const newMessage = new ChatMessage({});
        })

        userSocket.on(USER_IMAGE_EVENT, (buffer, removeOldChunks) => {
            // TODO: Record the image
            namespace.emit(USER_IMAGE_EVENT, buffer, userSocket.id, removeOldChunks)
        })
    });


    return io;
}