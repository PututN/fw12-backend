const {modelAllResetPassword, modelDeleteResetPassword, modelUpdateResetPassword, modelCreatePassword} = require('../models/resetPassword.model')
const errorHandler = require('../helpers/errorHandler.helper')

const allResetPassword = (req, res) => {

  modelAllResetPassword(req.body, (err, data) => {
    if(err) {
        return errorHandler(err,res)
    }
    return res.status(200).json({
      success: true,
      message: "Reset Password success loaded",
      results: data.rows
    }
    )
  }
  )
}


const deleteResetPassword = (req, res) => {

  modelDeleteResetPassword(req.params, (err,data) => {
    if(err) {
      return errorHandler(err,res)
    }
    return res.status(200).json({
      success:true,
      message: "Reset Password deleted",
      results: data.rows[0]
    })
  })
}

const updateResetPassword = (req, res) => {

  modelUpdateResetPassword(req, (err, data) => {
    if (err) {
      return errorHandler(err,res)
    }
    return res.status(200).json({
      success: true,
      message: "Reset Password has been updated",
      results: data.rows[0]
  } )
  }
  )

}

const createResetPassword = (req, res) => {

  modelCreatePassword(req.body, (err,data) => {
    if(err) {
      return errorHandler(err,res)
    }
    return res.status(200).json({
      success:true,
      message: "Create Reset Password success",
      results: data.rows[0]

    })
  })
}

module.exports = {allResetPassword, deleteResetPassword, updateResetPassword, createResetPassword}
