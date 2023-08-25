const fs = require("fs");
const path = require("path");

const express = require("express");
const bodyParses = require("body-parser");
const mongoose = require("mongoose");

const HttpError = require("./models/http-error");
const refsRouter = require("./routes/refs-routes");
const portsRouter = require("./routes/ports-routes");

const URI = 'mongodb+srv://Admin:Admin@grvenq.gtbynkr.mongodb.net/grvenq?retryWrites=true&w=majority';

const localUrl = "mongodb://127.0.0.1:27017/ref-folio";

const app = express();

app.use(bodyParses.json({limit: '300mb', extended: true}));

app.use("/uploads/images", express.static(path.join("uploads", "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  next();
});

//Routes
app.use("/api/refs", refsRouter);
app.use("/api/ports", portsRouter);

app.use((req, res, next) => {
  const error = new HttpError("Not found!", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  console.log(error);
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(7000);
  })
  .catch((error) => {
    console.log(error);
  });
