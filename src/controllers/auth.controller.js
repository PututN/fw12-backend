const {
  selectUserByEmail,
  createUsers,
  updatedUsers,
} = require("../models/users.model");
const {
  modelCreatePassword,
  selectUserByEmailAndCode,
  modelDeleteResetPassword,
} = require("../models/resetPassword.model");
const jwt = require("jsonwebtoken");
const errorHandler = require("../helpers/errorHandler.helper");
const { validationResult } = require("express-validator");

const login = (req, res) => {
  selectUserByEmail(req.body.email, (err, { rows }) => {
    if (rows.length) {
      const [user] = rows;
      if (req.body.password === user.password) {
        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
        return res.status(200).json({
          success: true,
          message: "login success",
          result: { token },
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "Wrong password or email",
        });
      }
    }
  });
};

const register = (req, res) => {
  // if(req.body.email ==="" && req.body.password ==="") {
  //   return res.status(201).json({
  //     success: false,
  //     message: "Please fill email and password"
  //   })
  // }
  // if(req.body.email === "") {
  //   return res.status(201).json({
  //     success: false,
  //     message: "Please fill email"
  //   })
  // }
  // if(req.body.password === "") {
  //   return res.status(201).json({
  //     success: false,
  //     message: "Please fill password"
  //   })
  // }
  //validate menggunakan express-validator
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  createUsers(req.body, (err, data) => {
    if (err) {
      return errorHandler(err, res);
    }
    const { rows: users } = data;
    const [user] = users;
    const token = jwt.sign(user.id, process.env.SECRET_KEY); // usernya
    return res.status(201).json({
      success: true,
      message: "Register success",
      data: {
        token,
      },
    });
  });
};

const forgotPassword = (req, res) => {
  const { email } = req.body;
  selectUserByEmail(email, (err, { rows: users }) => {
    if (err) {
      return errorHandler(err, res);
    }
    if (users.length) {
      const [user] = users;
      const data = {
        email,
        userId: user.id,
        code: Math.ceil(Math.random() * 90000),
      };
      modelCreatePassword(data, (err, { rows: results }) => {
        if (err) {
          return errorHandler(err, res);
        }
        if (results.length) {
          return res.status(200).json({
            success: true,
            message: "Reset password has been requested.",
          });
        }
      });
    } else {
      throw Error("user not found")
    }
  });
};

const resetPassword = (req, res) => {
  const { password, confirmPassword } = req.body; //destruc dari req.body
  if (password === confirmPassword) {
    selectUserByEmailAndCode(req.body, (err, { rows: users }) => {
      if (err) {
        return errorHandler(err, res);
      }
      if (users.length) {
        const [resetRequest] = users;

        updatedUsers(
          { password },
          resetRequest.userId,
          (err, { rows: users }) => {
            if (err) {
              return errorHandler(err, res);
            }
            if (users.length) {
              //users disini dari distraction line 105
              modelDeleteResetPassword(resetRequest.userId, (err, { rows }) => {
                console.log(rows);
                if (!rows.length) {
                  return res.status(200).json({
                    success: true,
                    message: "Password updated, please relogin.",
                  });
                }
              });
            }
          }
        );
      }
    });
  } else {
    return res.status(400).json({
      success: false,
      message: "password and confirm password must be match",
    });
  }
};
module.exports = { login, register, forgotPassword, resetPassword };
