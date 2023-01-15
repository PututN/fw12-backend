const {
  getProfile,
  updateProfile,
  getUsersById,
  updateUsers,
  updatePassword,
} = require("../models/users.model");
const errorHandler = require("../helpers/errorHandler.helper");
const fs = require("fs");
const fm = require("fs-extra");
const jwt = require("jsonwebtoken");
const { get } = require("http");
const { cloudinary } = require("../middleware/upload.middleware");
const argon = require("argon2");

const idUser = (req, res) => {
  const authorization = req.headers.authorization;
  const token = authorization.split(" ")[1];
  const validated = jwt.verify(token, process.env.SECRET_KEY);
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

const newUpdateUser = async (req, res) => {
  try {
    const user = await getUsersById(req.userData.id);
    if (req?.file) {
      console.log(user.picture);
      if (!user.picture) {
        user.picture = req.file.path;
        req.body.picture = user.picture;
        console.log("masuk pak");
      } else {
        console.log("lapor pak");
        const setPicture = user?.picture?.split("/");
        const getNumFormat = setPicture[setPicture.length - 1];
        const getNumber = getNumFormat.split(".")[0];
        const getDate = getNumber.split("_")[0];
        const getRandomNum = getNumber.split("_")[1];
        const idPicture = `${getDate}_${Number(getRandomNum)}`;
        user.picture = req.file.path;
        req.body.picture = user.picture;
        await cloudinary.uploader.destroy(`cinemnar/${idPicture}`);
      }
    }
    const setUser = await updateUsers(req.body, req.userData.id);
    const newPassword = await argon.hash(setUser.password);
    const putPassword = await updatePassword(newPassword, req.userData.id);
    return res.status(200).json({
      success: true,
      message: "Profile updated",
      results: putPassword,
    });
  } catch (error) {
    return errorHandler(error, res);
  }
};

module.exports = { idUser, newUpdateUser };
