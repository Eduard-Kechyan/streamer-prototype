const { Server } = require("socket.io");

// List of currently connected Senders
let sender = [];

// Set up socket.io server
const io = new Server({
    cors: {
        origins: "*",
    }
});

// Handle socket connections
io.on("connection", (socket) => {
    socket.code = '';

    // Get the generated code from Sender
    socket.on('set_code', (code) => {
        // Check if code already exists
        if (sender.includes(code)) {
            socket.emit("set_code_result", false);
        } else {
            socket.code = code;

            sender.push(code)
            socket.emit("set_code_result", true);
        }
    });

    // Send data from Sender to Receiver
    socket.on('send', (data) => {
        socket.broadcast.emit("receive", {
            code: socket.code,
            data: data
        });
    });

    //Handle Sender disconnecting
    socket.on('disconnect', () => {
        // Removing code from list of connected Senders
        sender = sender.filter(c => c === socket.code);

        // Reset socket code
        socket.code = '';

        // Telling conntected receiver that Sender has disconnected
        socket.broadcast.emit("sender-disconnected");
    });
});

// Listen on port 7000
io.listen(7000);