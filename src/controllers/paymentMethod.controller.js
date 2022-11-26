const {modelAllPaymentMethod, modelDeletePaymentMethod, modelUpdatePaymentMethod, modelCreatePaymentMethod, selectCountAllPaymentMethod} = require('../models/paymentMethod.model')
const errorHandler = require('../helpers/errorHandler.helper')
const filter = require('../helpers/filter.helper')

const allPaymentMethod = (req, res) => {
  const sortable = ['name', 'createdAt', 'updateAt']
  filter(req.query, sortable, selectCountAllPaymentMethod, res, (filter,pageInfo) => {
    modelAllPaymentMethod(filter, (err, data) => {
      if(err) {
          return errorHandler(err,res)
      }
      return res.status(200).json({
        success: true,
        message: "Data Payment Methods success loaded",
        pageInfo,
        results: data.rows
  }
  )
    }
  )
  }
  )
}

const deletePaymentMethod = (req, res) => {

  modelDeletePaymentMethod(req.params, (err,data) => {
    if(err) {
      return errorHandler(err,res)
    }
    return res.status(200).json({
      success:true,
      message: "Payment Method deleted",
      results: data.rows[0]
    })
  })
}

const updatePaymentMethod = (req, res) => {

  modelUpdatePaymentMethod(req.body, req.params.id, (err, data) => {
    if (err) {
      return errorHandler(err,res)
    }
    return res.status(200).json({
      success: true,
      message: "Payment Method has been updated",
      results: data.rows[0]
  } )
  }
  )

}

const createPaymentMethod = (req, res) => {

  modelCreatePaymentMethod(req.body, (err,data) => {
    if(err) {
      return errorHandler(err,res)
    }
    return res.status(200).json({
      success:true,
      message: "Create Payment Method success",
      results: data.rows[0]

    })
  })
}

module.exports = {allPaymentMethod, deletePaymentMethod, updatePaymentMethod, createPaymentMethod}
