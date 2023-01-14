const fs = require("fs");
const path = require("path");

const express = require("express");
const bodyParses = require("body-parser");

const HttpError = require("./models/http-error");
const sendRouter = require("./routes/send-routes");
const receiveRouter = require("./routes/receive-router");
const http = require("http");

const app = express();

app.use(bodyParses.json({ limit: '300mb', extended: true }));

app.use("/uploads/images", express.static(path.join("uploads", "images")));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
    next();
});

//Routes
app.use("/api/send", sendRouter);
app.use("/api/receive", receiveRouter);

app.use((req, res, next) => {
    const error = new HttpError("Not found!", 404);
    throw error;
});

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    console.log(error);
    res.status(error.code || 500);
    res.json({ message: error.message || "An unknown error occurred!" });
});

const server = http.createServer(app);

require("./socket")(server);

server.listen(7000, () => {
    console.log('Server Started!');
});
