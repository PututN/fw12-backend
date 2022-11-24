const db = require('../helpers/db.helper')

const modelAllCasts = (data, cb) => {
  db.query('SELECT * FROM casts', cb)
}

const modelDeleteCasts = (data, cb) => {
  const sql = `DELETE FROM casts WHERE id=$1`
  const value = [data.id]
  db.query(sql, value, cb)
}

const modelUpdateCasts = (data, cb) => {
  const sql = 'UPDATE casts SET "name" = $1, "updateAt" = $3 WHERE id =$2 RETURNING *'
  const value = [data.body.name, data.params.id, new Date()]
  db.query(sql,value,cb)
}

const modelCreateCasts = (data, cb) => {
  const sql = 'INSERT INTO casts("name") VALUES($1) RETURNING *';
  const value = [data.name];
  db.query(sql, value, cb)

}

module.exports = {modelAllCasts, modelDeleteCasts, modelUpdateCasts, modelCreateCasts}
