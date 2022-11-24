const {modelAllCasts, modelDeleteCasts, modelUpdateCasts, modelCreateCasts} = require('../models/casts.model')
const errorHandler = require('../helpers/errorHandler.helper')

const allCasts = (req, res) => {

  modelAllCasts(req.body, (err, data) => {
    if(err) {
        return errorHandler(err,res)
    }
    return res.status(200).json({
      success: true,
      message: "Data Casts success loaded",
      results: data.rows
    }
    )
  }
  )
}


const deleteCasts = (req, res) => {

  modelDeleteCasts(req.params, (err,data) => {
    if(err) {
      return errorHandler(err,res)
    }
    return res.status(200).json({
      success:true,
      message: "Cast ID deleted",
      results: data.rows[0]
    })
  })
}

const updateCasts = (req, res) => {

  modelUpdateCasts(req, (err, data) => {
    if (err) {
      return errorHandler(err,res)
    }
    return res.status(200).json({
      success: true,
      message: "Cast ID has been updated",
      results: data.rows[0]
  } )
  }
  )

}

const createCasts = (req, res) => {

  modelCreateCasts(req.body, (err,data) => {
    if(err) {
      return errorHandler(err,res)
    }
    return res.status(200).json({
      success:true,
      message: "Create Cast ID success",
      results: data.rows[0]

    })
  })
}

module.exports = {allCasts, deleteCasts, updateCasts, createCasts}
