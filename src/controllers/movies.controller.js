const {modelMovies, modelmovieId, modelDeleteMovie, modelUpdateMovie, modelCreateMovie} = require('../models/movies.model')
const errorHandler = require('../helpers/errorHandler.helper')

const allMovies = (req, res) => {

  modelMovies(req.body, (err, data) => {
    if(err) {
        return errorHandler(err,res)
    }
    return res.status(200).json({
      success: true,
      message: "Data movies success",
      results: data.rows
    }
    )
  }
  )
}

const movieId = (req,res) => {

  modelmovieId(req.params, (err,data) => {
    if(err) {
      return errorHandler(err,res)
    }
    return res.status(200).json({
      success: true,
      message: "ID Data movie success",
      results: data.rows[0]
    })
  })

}

const deleteMovieId = (req, res) => {

  modelDeleteMovie(req.params, (err,data) => {
    if(err) {
      return errorHandler(err,res)
    }
    return res.status(200).json({
      success:true,
      message: "Movie ID deleted",
      results: data.rows[0]
    })
  })
}

const updateMovieId = (req, res) => {

  modelUpdateMovie(req, (err, data) => {
    if (err) {
      return errorHandler(err,res)
    }
    return res.status(200).json({
      success: true,
      message: "Movie ID has been updated",
      results: data.rows[0]
  } )
  }
  )

}

const createMovies = (req, res) => {

  modelCreateMovie(req.body, (err,data) => {
    if(err) {
      return errorHandler(err,res)
    }
    return res.status(200).json({
      success:true,
      message: "Create Movie ID success",
      results: data.rows[0]

    })
  })
}

module.exports = {allMovies, movieId, deleteMovieId, updateMovieId, createMovies}
