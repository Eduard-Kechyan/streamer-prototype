const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const portSchema = new Schema({
  title: { type: String, required: true },
  date: { type: String },
  image: { type: String, required: true },
  size: { type: String },
  altSize: { type: String },
  orientation: { type: String },
  category: { type: String },
  style: { type: String },
  subject: { type: String },
  type: { type: String },
  refId: { type: String },
  isRef: { type: String },
  portRef: { type: String },
});

portSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Port", portSchema);
