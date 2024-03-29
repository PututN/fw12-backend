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
const argon = require("argon2");
const { mailOptions, transport } = require("../helpers/mailer.helper");

const login = (req, res) => {
  selectUserByEmail(req.body.email, async (err, { rows }) => {
    if (rows.length) {
      const [user] = rows;
      if (await argon.verify(user.password, req.body.password)) {
        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
        console.log("masuk pak pak");

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
    } else {
      return res.status(401).json({
        success: false,
        message: "Email not registered",
      });
    }
  });
};

const register = async (req, res) => {
  try {
    req.body.password = await argon.hash(req.body.password);
    const user = await createUsers(req.body);
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
    return res.status(200).json({
      success: true,
      message: "Register Success",
      results: {
        token,
      },
    });
  } catch (error) {
    console.log(error);
    if (error) return errorHandler(error, res);
  }
};

const forgotPassword = (req, res) => {
  const { email } = req.body;
  selectUserByEmail(email, async (err, { rows: users }) => {
    if (err) {
      return errorHandler(err, res);
    }
    try {
      if (users.length) {
        const [user] = users;
        const code = String(Math.ceil(Math.random() * 90000)).padEnd(6, "0");
        const data = {
          email,
          userId: user.id,
          code,
        };
        const mailer = await transport();
        await mailer.sendMail(mailOptions(email, code));
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
        return res.status(400).json({
          success: false,
          message: "User not found",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Failed to request.",
      });
    }
  });
};

const resetPassword = (req, res) => {
  const { password, confirmPassword } = req.body; //destruc dari req.body
  if (password === confirmPassword) {
    console.log(req.body);
    selectUserByEmailAndCode(req.body, async (err, { rows: users }) => {
      if (err) {
        return errorHandler(err, res);
      }
      if (users.length) {
        const [resetRequest] = users;
        const newPassword = await argon.hash(password);
        updatedUsers(
          { password: newPassword },
          resetRequest.userId,
          (err, { rows: users }) => {
            if (err) {
              return errorHandler(err, res);
            }
            if (users.length) {
              //users disini dari distraction line 105
              modelDeleteResetPassword(resetRequest.userId, (err, { rows }) => {
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
      } else {
        return res.status(400).json({
          success: false,
          message: "Code is not correct!",
        });
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
