const { validationResult } = require("express-validator");
const fs = require("fs");
const HttpError = require("../models/http-error");
const Port = require("../models/port");

//Get port
const getPorts = async (req, res, next) => {
  let port;

  try {
    port = await Port.find();
  } catch (err) {
    const error = new HttpError("[Error] Getting ports failed!", 500);
    return next(error);
  }

  res.json(port);
};

//Create a port
const creatPort = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      new HttpError("[Error] Invalid input data in port creation!", 422)
    );
  }

  const {
    title,
    date,
    size,
    altSize,
    orientation,
    category,
    style,
    subject,
    type,
    refId,
    isRef,
    portRef,
  } = req.body;

  const port = new Port({
    
    title,
    date,
    image:req.file.path,
    size,
    altSize,
    orientation,
    category,
    style,
    subject,
    type,
    refId,
    isRef,
    portRef,
  });

  try {
    await port.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError("[Error] Creating port serie failed!", 500);
    return next(error);
  }

  res.status(201).json(port);
};

//Edit a port
const updatePort = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    new HttpError("[Error] Invalid input data in port updating!", 422);
  }

  const {
    title,
    date,
    size,
    altSize,
    orientation,
    category,
    style,
    subject,
    type,
    refId,
    isRef,
    portRef,
  } = req.body;
  const portId = req.params.portId;

  let port;
  try {
    port = await Port.findById(portId);
  } catch (err) {
    const error = new HttpError(
      "[Error] Updating port failed (when getting it)!",
      500
    );
    return next(error);
  }

  let oldImage = port.image;

  port.title = title;
  port.date = date;
  port.size = size;
  port.altSize = altSize;
  port.orientation = orientation;
  port.category = category;
  port.style = style;
  port.subject = subject;
  port.type = type;
  port.refId = refId;
  port.isRef = isRef;
  port.portRef = portRef;

  if (req.file !== undefined) {
    port.image = req.file.path;
  }

  try {
    if (req.file !== undefined) {
      fs.unlink(oldImage, (err) => {
        if (err) throw err;
      });
    }

    await port.save();
  } catch (err) {
    const error = new HttpError(
      "[Error] Updating port failed {when saving it}!",
      500
    );
    
    return next(error);
  }

  res.status(200).json(port);
};

//Remove a port
const deletePort = async (req, res, next) => {
  const portId = req.params.portId;

  let port;
  try {
    port = await Port.findById(portId);
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "[Error] Deleting port failed (when getting it)!",
      500
    );
    return next(error);
  }

  if (!port) {
    const error = new HttpError("[Error] Could not find port to delete!", 500);
    return next(error);
  }

  try {
    fs.unlink(port.image, (err) => {
      if (err) throw err;
    });

    await port.remove();
  } catch (err) {
    const error = new HttpError(
      "[Error] Deleting port failed (when removeing it)!",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "[Succes] Port deleted!" });
};
exports.getPorts = getPorts;
exports.creatPort = creatPort;
exports.deletePort = deletePort;
exports.updatePort = updatePort;