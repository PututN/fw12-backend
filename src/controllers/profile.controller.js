const { getProfile, updateProfile } = require("../models/users.model");
const errorHandler = require("../helpers/errorHandler.helper");
const fs = require("fs");
const fm = require("fs-extra");
const jwt = require('jsonwebtoken')

const idUser = (req, res) => {
  const authorization = req.headers.authorization;
  const token = authorization.split(' ')[1]
  const validated = jwt.verify(token, "backend-secret")
  const {id} = validated
  getProfile(id, (err, data) => {
    console.log(data)
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

const updateUser = (req, res) => {
  const authorization = req.headers.authorization;
  const token = authorization.split(' ')[1]
  const validated = jwt.verify(token, "backend-secret")
  const {id} = validated
  if (req.file) {
    req.body.picture = req.file.filename;
    getProfile(id, (err, data) => {
      if (err) {
        return errorHandler(err, res);
      }
      const [user] = data.rows;
      if (data.rows.length) {
        fm.ensureFile("uploads/" + user.picture, (err) => { //untuk memastikan filenya ada atau nggak, kalau ada akan menjalankan fungsi dbawahnya, jika tidak ada akan skip
          if(err) {
            return errorHandler(err,res)
          }
          fs.rm("uploads/" + user.picture, (err) => {
            if (err) {
              return errorHandler(err, res);
            }
          });
        });
      }
    });
  }
  updateProfile(req.body, id, (err, data) => {
    if (err) {
      return errorHandler(err, res);
    }
    return res.status(200).json({
      success: true,
      message: "Updated user success",
      results: data.rows[0],
    });
  });
};

module.exports = { idUser, updateUser };
