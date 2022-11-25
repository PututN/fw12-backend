const db = require('../helpers/db.helper')

const modelAllResetPassword = (data, cb) => {
  db.query('SELECT * FROM "resetPassword"', cb)
}

const modelDeleteResetPassword = (data, cb) => {
  const sql = `DELETE FROM "resetPassword" WHERE id=$1`
  const value = [data.id]
  db.query(sql, value, cb)
}

const modelUpdateResetPassword = (data, id, cb) => {
  const sql = `UPDATE "resetPassword" SET "email" = COALESCE(NULLIF($1, ''), "email"), "userId" = COALESCE(NULLIF($3, '')::INTEGER, "userId") WHERE id =$2 RETURNING *`
  const value = [data.email, id, data.userId]
  db.query(sql,value,cb)
}

const modelCreatePassword = (data, cb) => {
  const sql = 'INSERT INTO "resetPassword"("email", "userId") VALUES($1, $2) RETURNING *';
  const value = [data.email, data.userId];
  db.query(sql, value, cb)

}

module.exports = {modelAllResetPassword, modelDeleteResetPassword, modelUpdateResetPassword, modelCreatePassword}
