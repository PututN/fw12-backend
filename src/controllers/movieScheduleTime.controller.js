const {modelUpdateMovieScheduleTime, modelAllMovieScheduleTime, modelDeleteMovieScheduleTime, modeCreateMovieScheduleTime} = require('../models/movieScheduleTime.model')
const errorHandler = require('../helpers/errorHandler.helper')

const allMovieScheduleTime = (req, res) => {

  modelAllMovieScheduleTime(req.body, (err, data) => {
    if(err) {
        return errorHandler(err,res)
    }
    return res.status(200).json({
      success: true,
      message: "Data Movie Schedule Time success loaded",
      results: data.rows
    }
    )
  }
  )
}


const deletemovieScheduleTime = (req, res) => {

  modelDeleteMovieScheduleTime(req.params, (err,data) => {
    if(err) {
      return errorHandler(err,res)
    }
    return res.status(200).json({
      success:true,
      message: "Movie Schedule Time deleted",
      results: data.rows[0]
    })
  })
}

const updatemovieScheduleTime = (req, res) => {

  modelUpdateMovieScheduleTime(req, (err, data) => {
    if (err) {
      return errorHandler(err,res)
    }
    return res.status(200).json({
      success: true,
      message: "Movie Schedule Time has been updated",
      results: data.rows[0]
  } )
  }
  )

}

const createmovieScheduleTime = (req, res) => {

  modeCreateMovieScheduleTime(req.body, (err,data) => {
    if(err) {
      return errorHandler(err,res)
    }
    return res.status(200).json({
      success:true,
      message: "Create Movie Schedule Time success",
      results: data.rows[0]

    })
  })
}

module.exports = {allMovieScheduleTime, deletemovieScheduleTime, updatemovieScheduleTime, createmovieScheduleTime}

