const {
  getProfile,
  updateProfile,
  getUsersById,
  updateUsers,
} = require("../models/users.model");
const errorHandler = require("../helpers/errorHandler.helper");
const fs = require("fs");
const fm = require("fs-extra");
const jwt = require("jsonwebtoken");
const { get } = require("http");
const { cloudinary } = require("../middleware/upload.middleware");

const idUser = (req, res) => {
  const authorization = req.headers.authorization;
  const token = authorization.split(" ")[1];
  const validated = jwt.verify(token, "backend-secret");
  const { id } = validated;
  getProfile(id, (err, data) => {
    if (err) {
      return errorHandler(err, res);
    }
    return res.status(200).json({
      success: true,
      message: "Data user ID success",
      results: data.rows[0],
    });
  });
};

// const updateUser = (req, res) => {
//   const authorization = req.headers.authorization;
//   const token = authorization.split(" ")[1];
//   const validated = jwt.verify(token, "backend-secret");
//   const { id } = validated;
//   if (req.file) {
//     req.body.picture = req.file.filename;
//     getProfile(id, (err, data) => {
//       if (err) {
//         return errorHandler(err, res);
//       }
//       const [user] = data.rows;
//       if (data.rows.length) {
//         fm.ensureFile("uploads/" + user.picture, (err) => {
//           //untuk memastikan filenya ada atau nggak, kalau ada akan menjalankan fungsi dbawahnya, jika tidak ada akan skip
//           if (err) {
//             return errorHandler(err, res);
//           }
//           fs.rm("uploads/" + user.picture, (err) => {
//             if (err) {
//               return errorHandler(err, res);
//             }
//           });
//         });
//       }
//     });
//   }
//   updateProfile(req.body, id, (err, data) => {
//     if (err) {
//       return errorHandler(err, res);
//     }
//     return res.status(200).json({
//       success: true,
//       message: "Updated user success",
//       results: data.rows[0],
//     });
//   });
// };

const newUpdateUser = async (req, res) => {
  try {
    if (req.file) {
      req.body.picture = req.file.path;
      const getPicture = await getUsersById(req.userData.id);
      const setPicture = getPicture.picture.split("/");
      const getNumFormat = setPicture[setPicture.length - 1];
      const getNumber = getNumFormat.split(".")[0];
      const getDate = getNumber.split("_")[0];
      const getRandomNum = getNumber.split("_")[1];
      const idPicture = `${getDate}_${Number(getRandomNum)}`;
      if (idPicture) {
        await cloudinary.uploader.destroy(`cinemnar/${idPicture}`);
      }
    }
    const updateUser = await updateUsers(req.body, req.userData.id);
    return res.status(200).json({
      success: true,
      message: "Profile updated",
      results: updateUser,
    });
  } catch (error) {
    return errorHandler(error, res);
  }
};

module.exports = { idUser, newUpdateUser };
