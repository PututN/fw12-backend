const db = require('../helpers/db.helper')

const modelAllResetPassword = (data, cb) => {
  db.query('SELECT * FROM "resetPassword"', cb)
}

const modelDeleteResetPassword = (data, cb) => {
  const sql = `DELETE FROM "resetPassword" WHERE id=$1`
  const value = [data.id]
  db.query(sql, value, cb)
}

const modelUpdateResetPassword = (data, cb) => {
  const sql = 'UPDATE "resetPassword" SET "email" = $1, "userId" = $4, "updateAt" = $3 WHERE id =$2 RETURNING *'
  const value = [data.body.email, data.params.id, new Date(), data.body.userId]
  db.query(sql,value,cb)
}

const modelCreatePassword = (data, cb) => {
  const sql = 'INSERT INTO "resetPassword"("email", "userId") VALUES($1, $2) RETURNING *';
  const value = [data.email, data.userId];
  db.query(sql, value, cb)

}

module.exports = {modelAllResetPassword, modelDeleteResetPassword, modelUpdateResetPassword, modelCreatePassword}
