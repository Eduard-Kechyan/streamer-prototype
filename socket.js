const { Server } = require("socket.io");

module.exports = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "https://streamer-prototype-backend.onrender.com"
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