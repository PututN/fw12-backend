const db = require('../helpers/db.helper')

const modelAllPaymentMethod = (data, cb) => {
  db.query('SELECT * FROM "paymentMethod"', cb)
}

const modelDeletePaymentMethod = (data, cb) => {
  const sql = `DELETE FROM "paymentMethod" WHERE id=$1`
  const value = [data.id]
  db.query(sql, value, cb)
}

const modelUpdatePaymentMethod = (data, cb) => {
  const sql = 'UPDATE "paymentMethod" SET "picture" = $1, "name" = $4, "updateAt" = $3 WHERE id =$2 RETURNING *'
  const value = [data.body.picture, data.params.id, new Date(), data.body.name]
  db.query(sql,value,cb)
}

const modelCreatePaymentMethod = (data, cb) => {
  const sql = 'INSERT INTO "paymentMethod"("picture", "name") VALUES($1, $2) RETURNING *';
  const value = [data.picture, data.name];
  db.query(sql, value, cb)

}

module.exports = {modelAllPaymentMethod, modelDeletePaymentMethod, modelUpdatePaymentMethod, modelCreatePaymentMethod}
