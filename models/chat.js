const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const ChatSchema = new Schema({
    users: { type: Array, required: true },
    content: { type: Array, required: true },
    created: { type: String, required: true },
    last: { type: String, required: true },
    background: { type: String, required: true }
});

ChatSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Chat", ChatSchema);
