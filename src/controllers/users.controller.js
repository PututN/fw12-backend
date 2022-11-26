const {readAllUsers, readUser, deletedUser, createUsers , updatedUsers, selectCountAllUsers} = require('../models/users.model')
const errorHandler = require('../helpers/errorHandler.helper')
const filter = require ('../helpers/filter.helper')

const readAll = (req, res) => {
  const sortable = ['firstName', 'lastName', 'phoneNumber', 'email', 'password','createdAt', 'updateAt']
  filter(req.query, sortable, selectCountAllUsers, res, (filter,pageInfo) => {
    readAllUsers(filter, (err, data) => {
      if(err) {
          return errorHandler(err,res)
      }
      return res.status(200).json({
        success: true,
        message: "Data Users success loaded",
        pageInfo,
        results: data.rows
  }
  )
    }
  )
  }
  )
}

const readUserId = (req, res) => {

  readUser (req.params, (err, data) => { //req.params => bisa dilihat di endpoint /:id jika req.body / aja
    if(err) {
        return errorHandler(err,res)
    }
    // if (data.rows.length == 0) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Data user ID not found",
    //   })
    // }
    return res.status(200).json({
      success: true,
      message: "Data user ID success",
      results: data.rows[0]
    }
    )
  }
  )
}
const deletedUserId = (req, res) => {

  deletedUser(req.params, (err,data) => { //req.params => bisa dilihat di endpoint /:id jika req.body / aja
    if(err) {
        return errorHandler(err,res)
    }
    return res.status(200).json({
      success: true,
      message: "Deleted user ID success",
      results: data.rows[0]
    }
    )
  }
  )
}

const updatedUserId = (req, res) => {
  updatedUsers(req.body, req.params.id, (err, data) => {
    if(err) {
        return errorHandler(err,res)
    }
    return res.status(200).json({
      success: true,
      message: "Updated user success",
      results: data.rows[0]
    }
    )
  }
  )
}

const createAllUsers = (req, res) => {
  createUsers (req.body, (err, data) => {
    if(err) {
        return errorHandler(err,res)
    }
    return res.status(200).json({
      success: true,
      message: "Create user success",
      results: data.rows[0]
    }
    )
  }
  )
}

module.exports = {readAll, createAllUsers, deletedUserId, updatedUserId, readUserId}
