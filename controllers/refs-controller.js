const { validationResult } = require("express-validator");
const fs = require("fs");
const HttpError = require("../models/http-error");
const Ref = require("../models/ref");

//Get ref
const getRefs = async (req, res, next) => {
  let ref;

  try {
    ref = await Ref.find();
  } catch (err) {
    const error = new HttpError("[Error] Getting refs failed!", 500);
    return next(error);
  }

  res.json(ref);
};

//Create a ref
const creatRef = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      new HttpError("[Error] Invalid input data in ref creation!", 422)
    );
  }

  const {
    title,
    author,
    source,
    size,
    orientation,
    category,
    style,
    subject,
    type,
  } = req.body;

  const ref = new Ref({
    
    title,
    author,
    source,
    image:req.file.path,
    size,
    orientation,
    category,
    style,
    subject,
    type,
  });

  try {
    await ref.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError("[Error] Creating ref serie failed!", 500);
    return next(error);
  }

  res.status(201).json(ref);
};

//Edit a ref
const updateRef = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    new HttpError("[Error] Invalid input data in ref updating!", 422);
  }

  const {
    title,
    author,
    source,
    size,
    orientation,
    category,
    style,
    subject,
    type,
  } = req.body;
  const refId = req.params.refId;

  let ref;
  try {
    ref = await Ref.findById(refId);
  } catch (err) {
    const error = new HttpError(
      "[Error] Updating ref failed (when getting it)!",
      500
    );
    return next(error);
  }

  let oldImage = ref.image;

  ref.title = title;
  ref.author = author;
  ref.source = source;
  ref.size = size;
  ref.orientation = orientation;
  ref.category = category;
  ref.style = style;
  ref.subject = subject;
  ref.type = type;

  if (req.file !== undefined) {
    ref.image = req.file.path;
  }

  try {
    if (req.file !== undefined) {
      fs.unlink(oldImage, (err) => {
        if (err) throw err;
      });
    }

    await ref.save();
  } catch (err) {
    const error = new HttpError(
      "[Error] Updating ref failed {when saving it}!",
      500
    );
    return next(error);
  }

  res.status(200).json(ref);
};

//Remove a ref
const deleteRef = async (req, res, next) => {
  const refId = req.params.refId;

  let ref;
  try {
    ref = await Ref.findById(refId);
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "[Error] Deleting ref failed (when getting it)!",
      500
    );
    return next(error);
  }

  if (!ref) {
    const error = new HttpError("[Error] Could not find ref to delete!", 500);
    return next(error);
  }

  try {
    fs.unlink(ref.image, (err) => {
      if (err) throw err;
    });

    await ref.remove();
  } catch (err) {
    const error = new HttpError(
      "[Error] Deleting ref failed (when removeing it)!",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "[Succes] Ref deleted!" });
};
exports.getRefs = getRefs;
exports.creatRef = creatRef;
exports.deleteRef = deleteRef;
exports.updateRef = updateRef;