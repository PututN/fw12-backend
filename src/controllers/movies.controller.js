const {modelMovies, modelmovieId, modelDeleteMovie, modelUpdateMovie, modelCreateMovie, selectCountAllMovies} = require('../models/movies.model')
const errorHandler = require('../helpers/errorHandler.helper')
const filter = require('../helpers/filter.helper')

const allMovies = (req, res) => {
  console.log(req.userData)
  const sortable = ['title', 'releaseDate', 'director', 'duration', 'synopsis', 'createdAt', 'updateAt']
  filter(req.query, sortable, selectCountAllMovies, res, (filter,pageInfo) => {
    modelMovies(filter, (err, data) => {
      if(err) {
          return errorHandler(err,res)
      }
      return res.status(200).json({
        success: true,
        message: "Data Movies success loaded",
        pageInfo,
        results: data.rows
  }
  )
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

  modelUpdateMovie(req.body, req.params.id, (err, data) => {
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
