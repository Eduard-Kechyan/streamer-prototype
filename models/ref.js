const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const refSchema = new Schema({
  title: { type: String, required: true  },
  author: { type: String },
  source: { type: String },
  image: { type: String, required: true },
  size: { type: String },
  orientation: { type: String },
  category: { type: String },
  style: { type: String },
  subject: { type: String },
  type: { type: String },
});

refSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Ref", refSchema);
