const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const AltUser = require("../models/user");

// Create user
const createUser = async (req, res, next) => {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError("Validating user failed when creating!", 422, errors)
        );
    }

    // Add to database
    AltUser.create(req.body, (err, user) => {
        if (err) {
            return next(
                new HttpError("Adding user failed!", 500, err)
            );
        }

        res.status(200).json(user);
    });
};

// Get user
const getUser = async (req, res, next) => {
    AltUser.findOne({ [req.params.property]: req.params.value })
        .exec((err, user) => {
            if (err) {
                return next(
                    new HttpError("Getting user failed!", 500)
                );
            }

            res.status(200).json(user);
        });
};

// Find Users
const findUsers = async (req, res, next) => {
    AltUser.find({ name: { $regex: "^" + req.body.query, '$options': 'i' } })
        .where('_id')
        .nin(req.body.chats)
        .sort('name')
        .limit(20)
        .select('name pic')
        .exec((err, users) => {
            if (err) {
                return next(
                    new HttpError("Finding users failed!", 500, err)
                );
            }

            res.status(200).json(users);
        });
};

// Get Users
const getUsers = async (req, res, next) => {
    AltUser.find()
        .where('_id')
        .in(req.body.users)
        .exec((err, users) => {
            if (err) {
                return next(
                    new HttpError("Getting users failed!", 500, err)
                );
            }

            res.status(200).json(users);
        });
};

// Update user chats
const updateUserChats = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError("Validating user failed when updating!", 422, errors)
        );
    }

    AltUser.findOne({ _id: req.params._id })
        .exec((err, user) => {
            if (err) {
                return next(new HttpError("Getting user for upadting failed!", 500, err));
            }

            let chats = [];

            if (req.body.add) {
                chats = [
                    ...user.chats,
                    req.body.chatId
                ]
            } else {
                chats = user.chats.filter(chat => chat !== chatId);
            }

            AltUser.updateOne({ _id: req.params._id }, { chats: chats }).exec((err) => {
                if (err) {
                    new HttpError("Updating user failed!", 500, err)
                }

                res.status(200).json('Ok');
            });
        });
};

// Update user
const updateUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return next(
            new HttpError("Validating user failed when updating!", 422, errors)
        );
    }

    AltUser.updateOne({ _id: req.params._id }, { ...req.body }, (err) => {
        if (err) {
            return next(new HttpError("Updating users failed!", 500, err));
        }

        res.status(200).json('Ok');;
    });
};

// Remove a user
const deleteUser = async (req, res, next) => {
    AltUser.deleteOne({ _id: req.params._id }, (err) => {
        if (err) {
            return next(
                new HttpError("Deleting user failed!", 500, err)
            );
        }

        res.status(200).json('Ok');;
    });
};

exports.createUser = createUser;
exports.getUser = getUser;
exports.findUsers = findUsers;
exports.getUsers = getUsers;
exports.updateUserChats = updateUserChats;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;