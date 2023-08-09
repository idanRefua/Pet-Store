const multer = require("multer");
const uuid = require("uuid");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(global.rootPath, "uploads"));
  },
  filename: (req, file, cb) => {
    /* cb(null, `${uuid.v1()}-${file.originalname}`); */
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  }

  cb(null, false);
};

const uploadImage = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
  fileFilter,
});

module.exports = uploadImage;
