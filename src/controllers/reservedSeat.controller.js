const {modelAllReservedNum, modelDeleteReservedNum, modelUpdateReservedNum, modelCreateReservedNum, selectCountAllReservedSeat} = require('../models/reservedSeat.model')
const errorHandler = require('../helpers/errorHandler.helper')
const filter = require('../helpers/filter.helper')

const allReservedNum = (req, res) => {
  const sortable = ['name', 'createdAt', 'updateAt']
  filter(req.query, sortable, selectCountAllReservedSeat, res, (filter,pageInfo) => {
    modelAllReservedNum(filter, (err, data) => {
      if(err) {
          return errorHandler(err,res)
      }
      return res.status(200).json({
        success: true,
        message: "Data Seat reversed success loaded",
        pageInfo,
        results: data.rows
  }
  )
    }
  )
  }
  )
}


const deleteReservedNum = (req, res) => {

  modelDeleteReservedNum(req.params, (err,data) => {
    if(err) {
      return errorHandler(err,res)
    }
    return res.status(200).json({
      success:true,
      message: "Reserved Number deleted",
      results: data.rows[0]
    })
  })
}

const updateReservedNum = (req, res) => {

  modelUpdateReservedNum(req.body, req.params.id, (err, data) => {
    if (err) {
      return errorHandler(err,res)
    }
    return res.status(200).json({
      success: true,
      message: "Reserved Number has been updated",
      results: data.rows[0]
  } )
  }
  )

}

const createReservedNum = (req, res) => {

  modelCreateReservedNum(req.body, (err,data) => {
    if(err) {
      return errorHandler(err,res)
    }
    return res.status(200).json({
      success:true,
      message: "Create Reserved Number success",
      results: data.rows[0]

    })
  })
}

module.exports = {allReservedNum, deleteReservedNum, updateReservedNum, createReservedNum}
