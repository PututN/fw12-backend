const {modelAllCasts, modelDeleteCasts, modelUpdateCasts, modelCreateCasts, selectCountAllCasts} = require('../models/casts.model')
const errorHandler = require('../helpers/errorHandler.helper')
const filter = require('../helpers/filter.helper')

const allCasts = (req, res) => {
  const sortable = ['name', 'createdAt', 'updateAt']
  filter(req.query, sortable, selectCountAllCasts, res, (filter,pageInfo) => {
    modelAllCasts(filter, (err, data) => {
      if(err) {
          return errorHandler(err,res)
      }
      return res.status(200).json({
        success: true,
        message: "Data Casts success loaded",
        pageInfo,
        results: data.rows
  }
  )
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

  modelUpdateCasts(req.body, req.params.id, (err, data) => {
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
