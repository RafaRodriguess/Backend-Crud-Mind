const express = require("express");
const multer = require("multer");
const path = require("path");

module.exports = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, "..", "uploads/users"));
    },
    filename: (req, file, callback) => {
      callback(null, Date.now().toString() + "_" + file.originalname);
    },
  }),
  fileFilter: (req, file, cb) => {
    const extensaoImg = ["image/png", "image/jpg", "image/jpeg"].find((formatoAceito) => formatoAceito == file.mimetype);

    if (extensaoImg) {
      return cb(null, true);
    }
    return cb(null, false);
  },
});
