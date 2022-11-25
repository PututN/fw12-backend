const db = require('../helpers/db.helper')

const modelAllReservedNum = (data, cb) => {
  db.query('SELECT * FROM "reservedSeat"', cb)
}

const modelDeleteReservedNum = (data, cb) => {
  const sql = `DELETE FROM "reservedSeat" WHERE id=$1`
  const value = [data.id]
  db.query(sql, value, cb)
}

const modelUpdateReservedNum = (data, id, cb) => {
  const sql = `UPDATE "reservedSeat" SET "seatNum" = COALESCE(NULLIF($1, ''), "seatNum"), "transactionId" = COALESCE(NULLIF($3, '')::INTEGER, "transactionId") WHERE id =$2 RETURNING *`
  const value = [data.seatNum, id, data.transactionId]
  db.query(sql,value,cb)
}

const modelCreateReservedNum = (data, cb) => {
  const sql = 'INSERT INTO "reservedSeat"("seatNum", "transactionId") VALUES($1, $2) RETURNING *';
  const value = [data.seatNum, data.transactionId];
  db.query(sql, value, cb)

}

module.exports = {modelAllReservedNum, modelDeleteReservedNum, modelUpdateReservedNum, modelCreateReservedNum}
