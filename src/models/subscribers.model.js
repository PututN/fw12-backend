const db = require('../helpers/db.helper')

const modelAllSubscribers = (data, cb) => {
  db.query('SELECT * FROM subscribers', cb)
}

const modelDeleteSubscribers = (data, cb) => {
  const sql = `DELETE FROM subscribers WHERE id=$1`
  const value = [data.id]
  db.query(sql, value, cb)
}

const modelUpdateSubscribers = (data, cb) => {
  const sql = 'UPDATE subscribers SET "email" = $1, "updateAt" = $3 WHERE id =$2 RETURNING *'
  const value = [data.body.email, data.params.id, new Date()]
  db.query(sql,value,cb)
}

const modelCreateSubscribers = (data, cb) => {
  const sql = 'INSERT INTO subscribers("email") VALUES($1) RETURNING *';
  const value = [data.email];
  db.query(sql, value, cb)

}

module.exports = {modelAllSubscribers, modelDeleteSubscribers, modelUpdateSubscribers, modelCreateSubscribers}
