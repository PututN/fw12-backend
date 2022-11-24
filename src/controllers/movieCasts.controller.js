const {modelUpdateMovieCasts, modelAllMovieCasts, modelDeleteMovieCasts, modelCreateMovieCasts} = require('../models/movieCasts.model')
const errorHandler = require('../helpers/errorHandler.helper')

const allMovieCasts = (req, res) => {

  modelAllMovieCasts(req.body, (err, data) => {
    if(err) {
        return errorHandler(err,res)
    }
    return res.status(200).json({
      success: true,
      message: "Data Movie Casts success loaded",
      results: data.rows
    }
    )
  }
  )
}


const deleteMovieCasts = (req, res) => {

  modelDeleteMovieCasts(req.params, (err,data) => {
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

const updateMovieCasts = (req, res) => {

  modelUpdateMovieCasts(req, (err, data) => {
    if (err) {
      return errorHandler(err,res)
    }
    return res.status(200).json({
      success: true,
      message: "Movie Casts has been updated",
      results: data.rows[0]
  } )
  }
  )

}

const createMovieCasts = (req, res) => {

  modelCreateMovieCasts(req.body, (err,data) => {
    if(err) {
      return errorHandler(err,res)
    }
    return res.status(200).json({
      success:true,
      message: "Create Movie Casts success",
      results: data.rows[0]

    })
  })
}

module.exports = {allMovieCasts, deleteMovieCasts, updateMovieCasts, createMovieCasts}
