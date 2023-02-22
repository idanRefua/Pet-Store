const multer = require("multer");
const uuid = require("uuid");

/* const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const uploadImage = multer({
  limits: 500000,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/images");
    },
    filename: (req, file, cb) => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, uuid.v4() + ".", ext);
    },
  }),
  fileFilter: (req, file, cb) => {
    const valid = !!MIME_TYPE_MAP[file.mimetype];
    let error = valid ? null : new Error("image not valid");
    cb(error, valid);
  },
});

module.exports = uploadImage; */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/images");
  },
  filename: (req, file, cb) => {
    cb(null, `${uuid.v1()}-${file.originalname}`);
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
