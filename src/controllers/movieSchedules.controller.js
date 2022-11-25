const {modelAllMovieSchedules, modelMovieScheduleId, modelDeleteMovieSchedule, modelUpdateMovieSchedule, modelCreateMovieSchedule} = require('../models/movieSchedules.model')
const errorHandler = require('../helpers/errorHandler.helper')

const allMovieSchedules = (req, res) => {

  modelAllMovieSchedules(req.body, (err, data) => {
    if(err) {
        return errorHandler(err,res)
    }
    return res.status(200).json({
      success: true,
      message: "Data Movie Schedule success loaded",
      results: data.rows
    }
    )
  }
  )
}

const movieScheduleId = (req,res) => {

  modelMovieScheduleId(req.params, (err,data) => {
    if(err) {
      return errorHandler(err,res)
    }
    return res.status(200).json({
      success: true,
      message: "ID Data Movie Schedule success loaded",
      results: data.rows[0]
    })
  })

}

const deleteMovieSchedule = (req, res) => {

  modelDeleteMovieSchedule(req.params, (err,data) => {
    if(err) {
      return errorHandler(err,res)
    }
    return res.status(200).json({
      success:true,
      message: "Movie Schedule ID deleted",
      results: data.rows[0]
    })
  })
}

const updateMovieSchedule = (req, res) => {

  modelUpdateMovieSchedule(req, (err, data) => {
    if (err) {
      return errorHandler(err,res)
    }
    return res.status(200).json({
      success: true,
      message: "Movie Schedule ID has been updated",
      results: data.rows[0]
  } )
  }
  )

}

const createMovieSchedule = (req, res) => {

  modelCreateMovieSchedule(req.body, (err,data) => {
    if(err) {
      return errorHandler(err,res)
    }
    return res.status(200).json({
      success:true,
      message: "Create Movie Schedule ID success",
      results: data.rows[0]

    })
  })
}

module.exports = {allMovieSchedules, movieScheduleId, deleteMovieSchedule, updateMovieSchedule, createMovieSchedule}
