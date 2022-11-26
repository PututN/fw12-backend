const db = require('../helpers/db.helper')

const modelAllTransaction = (filter, cb) => {
  const sql = `SELECT * FROM transaction WHERE "fullName" LIKE $3 ORDER BY "${filter.sortBy}" ${filter.sort} LIMIT $1 OFFSET $2`;
  const values = [filter.limit, filter.offset, `%${filter.search}%`]
  db.query(sql, values, cb)
}
const selectCountAllTransaction = (filter, cb) => {
  const sql = `SELECT COUNT("fullName") AS "totalData" FROM "transaction" WHERE "fullName" LIKE $1`;
  const values = [`%${filter.search}%`]
  db.query(sql, values, cb)
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

const modelUpdateTransaction = (data, id, cb) => {
  const sql = `UPDATE transaction SET "bookingDate" = COALESCE(NULLIF($1, '')::TIMESTAMPTZ, "bookingDate"), "movieId" = COALESCE(NULLIF($2, '')::INTEGER, "movieId"), "cinemaId" = COALESCE(NULLIF($3, '')::INTEGER, "cinemaId"), "movieScheduleId" = COALESCE(NULLIF($4, '')::INTEGER, "movieScheduleId"), "fullName" = COALESCE(NULLIF($5, ''), "fullName"), "email" = COALESCE(NULLIF($6, ''), "email"), "phoneNumber" = COALESCE(NULLIF($7, ''), "phoneNumber"), "statusId" = COALESCE(NULLIF($8, '')::INTEGER, "statusId") WHERE id =$9 RETURNING *`
  const value = [data.bookingDate, data.movieId, data.cinemaId, data.movieScheduleId, data.fullName, data.email, data.phoneNumber, data.statusId, id]
  db.query(sql,value,cb)
}

const modelCreateTransaction = (data, cb) => {
  const sql = 'INSERT INTO transaction("bookingDate", "movieId", "cinemaId", "movieScheduleId", "fullName", "email", "phoneNumber", "statusId") VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
  const value = [data.bookingDate, data.movieId, data.cinemaId, data.movieScheduleId, data.fullName, data.email, data.phoneNumber, data.statusId];
  db.query(sql, value, cb)

}

module.exports = {modelAllTransaction, modelTransactionId, modelDeleteTransactionId, modelUpdateTransaction, modelCreateTransaction, selectCountAllTransaction}
