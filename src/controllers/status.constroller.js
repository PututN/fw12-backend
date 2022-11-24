const {modelAllStatus, modelDeleteStatus, modelUpdateStatus, modelCreateStatus} = require('../models/status.model')
const errorHandler = require('../helpers/errorHandler.helper')

const allStatus = (req, res) => {

  modelAllStatus(req.body, (err, data) => {
    if(err) {
        return errorHandler(err,res)
    }
    return res.status(200).json({
      success: true,
      message: "Data Status success loaded",
      results: data.rows
    }
    )
  }
  )
}


const deleteStatus = (req, res) => {

  modelDeleteStatus(req.params, (err,data) => {
    if(err) {
      return errorHandler(err,res)
    }
    return res.status(200).json({
      success:true,
      message: "Status deleted",
      results: data.rows[0]
    })
  })
}

const updateStatus = (req, res) => {

  modelUpdateStatus(req, (err, data) => {
    if (err) {
      return errorHandler(err,res)
    }
    return res.status(200).json({
      success: true,
      message: "Status has been updated",
      results: data.rows[0]
  } )
  }
  )

}

const createStatus = (req, res) => {

  modelCreateStatus(req.body, (err,data) => {
    if(err) {
      return errorHandler(err,res)
    }
    return res.status(200).json({
      success:true,
      message: "Create status success",
      results: data.rows[0]

    })
  })
}

module.exports = {allStatus, deleteStatus, updateStatus, createStatus}
