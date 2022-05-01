
const { Server: SocketIOServer } = require("socket.io");

const USER_JOIN_EVENT = 'userjoin'
const USER_IMAGE_EVENT = 'userimage'

const getUserId = userSocket => {
    const token = userSocket.handshake.query.token;
    const userId = token === 'secret' ? '1' : 'xxx';

    return userId
}

module.exports = server => {
    const io = new SocketIOServer(server)

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

        userSocket.on(USER_IMAGE_EVENT, (buffer, removeOldChunks) => {
            namespace.emit(USER_IMAGE_EVENT, buffer, userSocket.id, removeOldChunks)
        })
    });


    return io;
}