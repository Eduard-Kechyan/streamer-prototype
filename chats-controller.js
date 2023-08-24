const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const Chat = require("../models/chat");

// Create chat
const createChat = (req, res, next) => {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError("Validating chat failed when creating!", 422, errors)
        );
    }

    // Add to database
    Chat.create(req.body, (err, chat) => {
        if (err) {
            return next(
                new HttpError("Adding chat failed!", 500, err)
            );
        }

        res.status(200).json(chat);
    });
};

// Get chat
const getChat = async (req, res, next) => {
    Chat.findOne({ [req.params.property]: req.params.value })
        .exec((err, chat) => {
            if (err) {
                return next(
                    new HttpError("Getting chat failed!", 500, err)
                );
            }

            res.status(200).json(chat);
        });
};

// Get Chats
const getChats = async (req, res, next) => {
    Chat.find({ _id: { $in: [req.body.chats] } })
        .exec((err, chats) => {
            if (err) {
                return next(
                    new HttpError("Getting chats failed!", 500, err)
                );
            }

            res.status(200).json(chats);
        });
};

// Update chat
const updateChat = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError("Validating chat failed when updating!", 422, errors)
        );
    }

    Chat.updateOne({ _id: req.params._id }, { ...req.body }, (err) => {
        if (err) {
            return next(
                new HttpError("Updating chat failed!", 500, err)
            );
        }

        res.status(200).json("Ok");
    });
};

// Delete chat
const deleteChat = async (req, res, next) => {
    Chat.deleteOne({ _id: req.params._id }, (err) => {
        if (err) {
            return next(
                new HttpError("Deleting chat failed!", 500, err)
            );
        }

        res.status(200).json('Ok');;
    });
};

exports.createChat = createChat;
exports.getChat = getChat;
exports.getChats = getChats;
exports.deleteChat = deleteChat;
exports.updateChat = updateChat; 