const multer = require("multer");
const errorHandler = require("../helpers/errorHandler.helper");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const extention = file.originalname.split(".");
    const ext = extention[extention.length - 1];
    const name = `${new Date().getDate()}_${new Date().getTime()}.${ext}`;
    cb(null, name);
  },
});

const limit =   1024 * 1024;

const upload = multer ({
  storage: storage,
  fileFilter : (req, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only png,jpg and jpeg format allowed"), false)

    }
  },
  limits: {fileSize:limit},
})

const uploadMiddleware = upload.single(
  "picture"
);

module.exports = (req, res, next) => {
  uploadMiddleware(req, res, (err) => {
    if (err) {
      return errorHandler(err, res)
    }
      next();
  });
};
