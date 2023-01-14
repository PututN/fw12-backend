const multer = require("multer");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const path = require("path");

// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     const dirPath = "uploads/";
//     if (!fs.existsSync(dirPath)) {
//       fs.mkdirSync(dirPath);
//     }
//     callback(null, dirPath);
//   },
//   filename: (req, file, callback) => {
//     const getExtension = file.originalname.split(".");
//     const extension = getExtension[getExtension.length - 1];
//     const name = `${new Date().getDate()}_${new Date().getTime()}.${extension}`;
//     callback(null, name);
//   },
// });
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "cinemnar",
    format: async (req, file) => path.extname(file.originalname).slice("1"), // supports promises as well
    public_id: (req, file) => {
      const randomNumber = Math.round(Math.random() * 90000);
      const name = `${new Date().getDate()}_${randomNumber}`;
      return name;
    },
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5000000 },
  fileFilter: (req, file, callback) => {
    const format = ["jpg", "png", "jpeg"];
    const extension = file.originalname.split(".");
    const cekFormatFile = format.includes(extension[extension.length - 1]);
    if (!cekFormatFile) {
      return callback(new Error("Format picture not valid"));
    } else {
      return callback(null, true);
    }
  },
});

const uploadFile = upload.single("picture");
const uploadMiddleware = (req, res, next) => {
  uploadFile(req, res, (error) => {
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    next();
  });
};
module.exports = { uploadMiddleware, cloudinary };
