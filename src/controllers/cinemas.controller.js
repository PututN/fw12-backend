const {modelAllCinemas, modelCinemasId, modelDeleteCinemasId, modelUpdateCinemasId, modelCreateCinemas} = require('../models/cinemas.model')
const errorHandler = require('../helpers/errorHandler.helper')

const allCinemas = (req, res) => {

  modelAllCinemas(req.body, (err, data) => {
    if(err) {
        return errorHandler(err,res)
    }
    return res.status(200).json({
      success: true,
      message: "Data Cinemas success",
      results: data.rows
    }
    )
  }
  )
}

const cinemasId = (req,res) => {

  modelCinemasId(req.params, (err,data) => {
    if(err) {
      return errorHandler(err,res)
    }
    return res.status(200).json({
      success: true,
      message: "ID Data Cinemas success",
      results: data.rows[0]
    })
  })

}

const deleteCinemasId = (req, res) => {

  modelDeleteCinemasId(req.params, (err,data) => {
    if(err) {
      return errorHandler(err,res)
    }
    return res.status(200).json({
      success:true,
      message: "Cinemas ID deleted",
      results: data.rows[0]
    })
  })
}

const updateCinemasId = (req, res) => {

  modelUpdateCinemasId(req, (err, data) => {
    if (err) {
      return errorHandler(err,res)
    }
    return res.status(200).json({
      success: true,
      message: "Cinemas ID has been updated",
      results: data.rows[0]
  } )
  }
  )

}

const createCinemas = (req, res) => {

  modelCreateCinemas(req.body, (err,data) => {
    if(err) {
      return errorHandler(err,res)
    }
    return res.status(200).json({
      success:true,
      message: "Create Cinemas ID success",
      results: data.rows[0]

    })
  })
}

module.exports = {allCinemas, cinemasId, deleteCinemasId, updateCinemasId, createCinemas}
