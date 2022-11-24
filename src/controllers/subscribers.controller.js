const {modelAllSubscribers, modelDeleteSubscribers, modelUpdateSubscribers, modelCreateSubscribers} = require('../models/subscribers.model')
const errorHandler = require('../helpers/errorHandler.helper')

const allSubscribers = (req, res) => {

  modelAllSubscribers(req.body, (err, data) => {
    if(err) {
        return errorHandler(err,res)
    }
    return res.status(200).json({
      success: true,
      message: "Data Subscribers success loaded",
      results: data.rows
    }
    )
  }
  )
}


const deleteSubscribers = (req, res) => {

  modelDeleteSubscribers(req.params, (err,data) => {
    if(err) {
      return errorHandler(err,res)
    }
    return res.status(200).json({
      success:true,
      message: "Subscribers deleted",
      results: data.rows[0]
    })
  })
}

const updateSubscribers = (req, res) => {

  modelUpdateSubscribers(req, (err, data) => {
    if (err) {
      return errorHandler(err,res)
    }
    return res.status(200).json({
      success: true,
      message: "Subscribers has been updated",
      results: data.rows[0]
  } )
  }
  )

}

const createSubscribers = (req, res) => {

  modelCreateSubscribers(req.body, (err,data) => {
    if(err) {
      return errorHandler(err,res)
    }
    return res.status(200).json({
      success:true,
      message: "Create Subscriber success",
      results: data.rows[0]

    })
  })
}

module.exports = {allSubscribers, deleteSubscribers, updateSubscribers, createSubscribers}
