module.exports = function (io) {
    let conntectedUsers = [];

    // Handle socket connections
    io.on("connection", (socket) => {
        socket.userId = '';

        // Set user id
        socket.on('set-user', (userId) => {
            if (!conntectedUsers.includes(userId) && socket.userId === "") {
                conntectedUsers.push(userId);
                socket.userId = userId;
            }
        })

        socket.on('message-sent', (args) => {
            if (args.init) {
                socket.broadcast.emit("message-received-init", args);
            } else {
                socket.broadcast.emit("message-received", args);
            }
        })

        // Handle Sender disconnecting
        socket.on('disconnect', () => {
            conntectedUsers = conntectedUsers.filter(user => user !== socket.userId);
        });
    });
}