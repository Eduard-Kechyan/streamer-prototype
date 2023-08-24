const express = require("express");
const http = require('http');
const cors = require("cors");
const { Server } = require("socket.io");

const HttpError = require("./models/http-error");
const errorHandler = require("./error-handler");
const mongo = require("./mongoConnection");
const authRouter = require("./routes/auth-routes");
const usersRouter = require("./routes/users-routes");
const chatsRouter = require("./routes/chats-routes");

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Socket.io
const io = new Server(server, {
    cors: {
        origins: "*",
    }
});

require("./socket")(io);

app.use(cors());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/chats", chatsRouter);


// Bot found
app.use((req, res, next) => {
    const error = new HttpError("Not found!", 404);
    throw error;
});

// Errors
app.use(errorHandler);

server.listen(7014, () => {
    // Connect ot mongoDb   
    mongo.connect();

    console.log('Server is running');
});