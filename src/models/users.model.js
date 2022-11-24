const db = require('../helpers/db.helper.js')

const readAllUsers= (data, cb) => { //wajib pake 2 parameter karena yang digunakan response
  db.query('SELECT * FROM users', cb)
}

const readUser = (data, cb) => {
  const sql = `SELECT * FROM users WHERE id=$1`
  const value = [data.id]
  db.query(sql, value, cb)
}

const deletedUser = (data, cb) => {
  const sql = `DELETE FROM users WHERE id=$1`
  const value = [data.id]
  db.query(sql, value, cb)
}

const createUsers = (data, cb) => { //parameter "data" tipe datanya harus object
  const sql = 'INSERT INTO users("picture", "firstName", "lastName", "phoneNumber", "email", "password") VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
  const value = [data.picture, data.firstName, data.lastName, data.phoneNumber, data.email, data.password];
  db.query(sql, value, cb)
}

const updatedUsers = (data, cb) => {
  const sql = 'UPDATE users SET "firstName" = $1, "lastName" = $2, "phoneNumber" = $3, "email" = $4, "password" = $5, "picture" = $6, "updateAt" = $8 WHERE id= $7 RETURNING *';
  const value = [data.body.firstName, data.body.lastName, data.body.phoneNumber, data.body.email, data.body.password, data.body.picture, data.params.id, new Date()];
  db.query(sql, value, cb)
}

module.exports = {readAllUsers, readUser, deletedUser, createUsers, updatedUsers}
