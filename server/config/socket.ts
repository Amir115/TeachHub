
import { Server } from 'http'
import { Namespace, Server as SocketIOServer, Socket } from 'socket.io';
import { RequestHandler } from 'express';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

import ChatMessageModel from '../models/chatMessage/ChatMessage';
import Lecture from '../models/lecture/Lecture';
import { passportMiddleware, passportSessionMiddleware } from '../middlwares/auth';
import { ChatMessage, Person } from '../../common/types';

type AuthenticatedSocket = Socket & {request: {user: Document<Person>}}

const USER_JOIN_EVENT = 'userjoin'
const USER_IMAGE_EVENT = 'userimage'
const CHAT_MESSAGE_EVENT = 'comment'

const getUser = (userSocket: AuthenticatedSocket) => userSocket.request.user

export default (server: Server, mongoSessionMiddleware: RequestHandler) => {
    const io = new SocketIOServer(server)

    const watchServer = io.of(/^\/watch\/\w+$/);
    
    // @ts-ignore
    watchServer.use((socket, next) => mongoSessionMiddleware(socket.request, {}, next))
    // @ts-ignore
    watchServer.use((socket, next) => passportMiddleware(socket.request, {}, next))
    watchServer.use((socket, next) => passportSessionMiddleware(socket.request, {}, next))

    watchServer.on("connection", async (userSocket: AuthenticatedSocket) => {
        const user = getUser(userSocket)
        const namespace = userSocket.nsp; // newNamespace.name === "/watch/101"
        const lectureId = namespace.name.substring(namespace.name.lastIndexOf('/') + 1)
        const lecture = await Lecture.findById(lectureId)

        const updateComments = async (socket: Socket | Namespace) => {
            const allMessages = await ChatMessageModel.find({lecture: lecture._id}).populate('user')
            socket.emit(CHAT_MESSAGE_EVENT, allMessages);
        };

        // Tell other users about me
        namespace.emit(USER_JOIN_EVENT, userSocket.id, user.id);

        // Tell me about the others
        namespace.sockets.forEach((otherSocket: AuthenticatedSocket) => {
            userSocket.emit(USER_JOIN_EVENT, otherSocket.id, getUser(otherSocket))
        })

        // Let me know about this room's messages
        updateComments(userSocket)

        userSocket.on('disconnect', reason => {
            namespace.emit('userleft', userSocket.id)
            console.log(reason)
        })

        userSocket.on(CHAT_MESSAGE_EVENT, async (message: ChatMessage) => {
            const newMessage = new ChatMessageModel({
                id: uuidv4(),
                text: message.text,
                lecture: lecture._id,
                user: user._id
            });

            await newMessage.save();
            updateComments(namespace)
        })

        userSocket.on(USER_IMAGE_EVENT, (buffer, removeOldChunks) => {
            // TODO: Record the image
            namespace.emit(USER_IMAGE_EVENT, buffer, userSocket.id, removeOldChunks)
        })

        userSocket.on('error', err => console.log(err))
    });


    return io;
}