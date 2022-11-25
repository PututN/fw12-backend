const {modelUpdateMovieGenre, modelAllMovieGenre, modelDeleteMovieGenre, modelCreateMovieGenre} = require('../models/movieGenre.model')
const errorHandler = require('../helpers/errorHandler.helper')

const allMovieGenre = (req, res) => {

  modelAllMovieGenre(req.body, (err, data) => {
    if(err) {
        return errorHandler(err,res)
    }
    return res.status(200).json({
      success: true,
      message: "Data Movie Genre success loaded",
      results: data.rows
    }
    )
  }
  )
}


const deleteMovieGenre = (req, res) => {

  modelDeleteMovieGenre(req.params, (err,data) => {
    if(err) {
      return errorHandler(err,res)
    }
    return res.status(200).json({
      success:true,
      message: "Movie Casts deleted",
      results: data.rows[0]
    })
  })
}

const updateMovieGenre = (req, res) => {

  modelUpdateMovieGenre(req.body, req.params.id, (err, data) => {
    if (err) {
      return errorHandler(err,res)
    }
    return res.status(200).json({
      success: true,
      message: "Movie Genre has been updated",
      results: data.rows[0]
  } )
  }
  )

}

const createMovieGenre = (req, res) => {

  modelCreateMovieGenre(req.body, (err,data) => {
    if(err) {
      return errorHandler(err,res)
    }
    return res.status(200).json({
      success:true,
      message: "Create Movie Genre success",
      results: data.rows[0]

    })
  })
}

module.exports = {allMovieGenre, deleteMovieGenre, updateMovieGenre, createMovieGenre}
