const HttpError = require("../models/http-error");
const AltUser = require("../models/user");

// Sign Up
const signUp = async (req, res, next) => {
    AltUser.findOne({ email: req.body.email })
        .exec((err, user) => {
            if (err) {
                return next(
                    new HttpError("Signing up failed when getting email!", 500, err)
                );
            }

            if (user === null) {
                AltUser.findOne({ name: req.body.name })
                    .exec((err, user) => {
                        if (err) {
                            return next(
                                new HttpError("Signing up failed when getting name!", 500, err)
                            );
                        }

                        if (user === null) {
                            // User does't exists successfully signing in
                            res.status(200).json('Ok');
                        } else {
                            // User with name already exists
                            let errorMessage = "A user with that name already exits!";

                            return next(
                                new HttpError(errorMessage, 500, errorMessage)
                            );
                        }
                    });

            } else {
                // User with email already exists
                let errorMessage = "A user with that email already exits!";

                return next(
                    new HttpError(errorMessage, 500, errorMessage)
                );
            }
        });
};

// Log In
const logIn = async (req, res, next) => {
    AltUser.findOne({ email: req.body.email })
        .exec((err, user) => {
            if (err) {
                return next(
                    new HttpError("Logging in failed when getting email!", 500, err)
                );
            }

            if (user === null) {
                // User doesn't exits
                let errorMessage = "A user with that email doesn't exits!";

                return next(
                    new HttpError(errorMessage, 500, errorMessage)
                );
            } else {
                if (user.password === req.body.password) {
                    // User exists and password is correct successfully signing in
                    res.status(200).json(user._id);
                } else {
                    // Password is wrong
                    let errorMessage = "The password is wrong!";

                    return next(
                        new HttpError(errorMessage, 500, errorMessage)
                    );
                }
            }
        });
}

exports.signUp = signUp;
exports.logIn = logIn;
