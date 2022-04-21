
const { Server: SocketIOServer } = require("socket.io");

module.exports = server => {
    const io = new SocketIOServer(server)

    io.on('connection', (socket) => {
        console.log(socket)
    })

    io.of(/^\/watch\/\w+$/).on("connection", (socket) => {
        console.log("CONNECTED!", socket)

        const namespace = socket.nsp; // newNamespace.name === "/watch/101"

        socket.on('userimage', (buffer, type, userToken) => {
            const userId = userToken === 'secret' ? '1' : 'xxx' // TODO: Use the userId instead of their private token
            namespace.emit('userimage', buffer, type, userId)
            namespace.allSockets().then( x => console.log(x))
        })
    });


    return io;
}