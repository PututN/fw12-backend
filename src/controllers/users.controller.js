const {readAllUsers, readUser, deletedUser, createUsers , updatedUsers} = require('../models/users.model')

const readAll = (req, res) => {

  readAllUsers(req, res)
}

const readUserId = (req, res) => {

  readUser(req,res)
}
const createAllUsers = (req, res) => {
  createUsers (req, res)
  }

const deletedUserId = (req, res) => {
deletedUser(req,res)
}
const updatedUserId = (req, res) => {
  updatedUsers(req,res)
}
module.exports = {readAll, createAllUsers, deletedUserId, updatedUserId, readUserId} //sama saja dengan export.readAllUsers dll
