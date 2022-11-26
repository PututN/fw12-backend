const {modelGenres, modelDeleteGenre, modelUpdateGenre, modelCreateGenre, selectCountAllGenre} = require('../models/genres.model')
const errorHandler = require('../helpers/errorHandler.helper')
const filter = require('../helpers/filter.helper')

const allGenre = (req, res) => {
  const sortable = ['name', 'createdAt', 'updateAt']
  filter(req.query, sortable, selectCountAllGenre, res, (filter,pageInfo) => {
    modelGenres(filter, (err, data) => {
      if(err) {
          return errorHandler(err,res)
      }
      return res.status(200).json({
        success: true,
        message: "Data Genres success loaded",
        pageInfo,
        results: data.rows
  }
  )
    }
  )
  }
  )
}


const deleteGenre = (req, res) => {

  modelDeleteGenre(req.params, (err,data) => {
    if(err) {
      return errorHandler(err,res)
    }
    return res.status(200).json({
      success:true,
      message: "Genre ID deleted",
      results: data.rows[0]
    })
  })
}

const updateGenreId = (req, res) => {

  modelUpdateGenre(req.body, req.params.id, (err, data) => {
    if (err) {
      return errorHandler(err,res)
    }
    return res.status(200).json({
      success: true,
      message: "Genre ID has been updated",
      results: data.rows[0]
  } )
  }
  )

}

const createGenres = (req, res) => {

  modelCreateGenre(req.body, (err,data) => {
    if(err) {
      return errorHandler(err,res)
    }
    return res.status(200).json({
      success:true,
      message: "Create genre ID success",
      results: data.rows[0]

    })
  })
}

module.exports = {allGenre, deleteGenre, updateGenreId, createGenres}
