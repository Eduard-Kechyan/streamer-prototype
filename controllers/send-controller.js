const fs = require("fs");
const HttpError = require("../models/http-error");

//Get user auth
const sendData = async (req, res, next) => {
    console.log(req.params.data);

    /*const socket = new WebSocket('ws://localhost:7000');

    socket.addEventListener('open', (event) => {
        socket.send('Hello Server!');
    });*/
};

exports.sendData = sendData;