const { Server } = require("socket.io");

module.exports = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000"
        }
    });

    io.on('connection', (socket) => {
        socket.pass = '';

        socket.on('setPass', (pass) => {
            socket.pass = pass;
        });

        socket.on('send', (data) => {
            socket.broadcast.emit("receive", {
                pass: socket.pass,
                data: data
            });
        });
    });
}