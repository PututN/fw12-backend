const db = require('../helpers/db.helper')

const modelAllPaymentMethod = (filter, cb) => {
  const sql = `SELECT * FROM "paymentMethod" WHERE name LIKE $3 ORDER BY "${filter.sortBy}" ${filter.sort} LIMIT $1 OFFSET $2`;
  const values = [filter.limit, filter.offset, `%${filter.search}%`]
  db.query(sql, values, cb)
}
const selectCountAllPaymentMethod = (filter, cb) => {
  const sql = `SELECT COUNT("name") AS "totalData" FROM "paymentMethod" WHERE name LIKE $1`;
  const values = [`%${filter.search}%`]
  db.query(sql, values, cb)
}


const modelDeletePaymentMethod = (data, cb) => {
  const sql = `DELETE FROM "paymentMethod" WHERE id=$1`
  const value = [data.id]
  db.query(sql, value, cb)
}

const modelUpdatePaymentMethod = (data, id, cb) => {
  const sql = `UPDATE "paymentMethod" SET "picture" = COALESCE(NULLIF($1, ''), "picture"), "name" = COALESCE(NULLIF($3, ''), "name") WHERE id =$2 RETURNING *`
  const value = [data.picture, id, data.name]
  db.query(sql,value,cb)
}

const modelCreatePaymentMethod = (data, cb) => {
  const sql = 'INSERT INTO "paymentMethod"("picture", "name") VALUES($1, $2) RETURNING *';
  const value = [data.picture, data.name];
  db.query(sql, value, cb)

}

module.exports = {modelAllPaymentMethod, modelDeletePaymentMethod, modelUpdatePaymentMethod, modelCreatePaymentMethod, selectCountAllPaymentMethod}
