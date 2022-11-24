const db = require('../helpers/db.helper')

const modelAllCinemas = (data, cb) => {
  db.query('SELECT * FROM cinemas', cb)
}

const modelCinemasId = (data, cb) => {
  const sql = `SELECT * FROM cinemas WHERE id=$1`
  const value = [data.id]
  db.query(sql, value, cb)
}

const modelDeleteCinemasId = (data, cb) => {
  const sql = `DELETE FROM cinemas WHERE id=$1`
  const value = [data.id]
  db.query(sql, value, cb)
}

const modelUpdateCinemasId = (data, cb) => {
  const sql = 'UPDATE cinemas SET "picture" = $1, "name" = $2, "address" = $3, "city" = $4, "updateAt" = $5 WHERE id =$6 RETURNING *'
  const value = [data.body.picture, data.body.name, data.body.address, data.body.city, new Date(), data.params.id]
  db.query(sql,value,cb)
}

const modelCreateCinemas = (data, cb) => {
  const sql = 'INSERT INTO cinemas("picture", "name", "address", "city") VALUES($1, $2, $3, $4) RETURNING *';
  const value = [data.picture, data.name, data.address, data.city];
  db.query(sql, value, cb)

}

module.exports = {modelAllCinemas, modelCinemasId, modelDeleteCinemasId, modelUpdateCinemasId, modelCreateCinemas}
