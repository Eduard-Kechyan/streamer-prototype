const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const AltUserSchema = new Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pic: { type: String, required: true },
    created: { type: String, required: true },
    chats: { type: Array, required: true },
});

AltUserSchema.plugin(uniqueValidator);

module.exports = mongoose.model("AltUser", AltUserSchema);
