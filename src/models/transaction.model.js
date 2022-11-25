const db = require('../helpers/db.helper')

const modelAllTransaction = (data, cb) => {
  db.query('SELECT * FROM transaction', cb)
}

const modelTransactionId = (data, cb) => {
  const sql = `SELECT * FROM transaction WHERE id=$1`
  const value = [data.id]
  db.query(sql, value, cb)
}

const modelDeleteTransactionId = (data, cb) => {
  const sql = `DELETE FROM transaction WHERE id=$1`
  const value = [data.id]
  db.query(sql, value, cb)
}

const modelUpdateTransaction = (data, cb) => {
  const sql = 'UPDATE transaction SET "bookingDate" = $1, "movieId" = $2, "cinemaId" = $3, "movieScheduleId" = $4, "fullName" = $5, "email" = $6, "phoneNumber" = $7, "statusId" = $8, "updateAt" = $10 WHERE id =$9 RETURNING *'
  const value = [data.body.bookingDate, data.body.movieId, data.body.cinemaId, data.body.movieScheduleId, data.body.fullName, data.body.email, data.body.phoneNumber, data.statusId, data.params.id, new Date()]
  db.query(sql,value,cb)
}

const modelCreateTransaction = (data, cb) => {
  const sql = 'INSERT INTO transaction("bookingDate", "movieId", "cinemaId", "movieScheduleId", "fullName", "email", "phoneNumber", "statusId") VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
  const value = [data.bookingDate, data.movieId, data.cinemaId, data.movieScheduleId, data.fullName, data.email, data.phoneNumber, data.statusId];
  db.query(sql, value, cb)

}

module.exports = {modelAllTransaction, modelTransactionId, modelDeleteTransactionId, modelUpdateTransaction, modelCreateTransaction}
