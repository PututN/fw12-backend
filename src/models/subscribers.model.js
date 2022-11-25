const db = require('../helpers/db.helper')

const modelAllSubscribers = (data, cb) => {
  db.query('SELECT * FROM subscribers', cb)
}

const modelDeleteSubscribers = (data, cb) => {
  const sql = `DELETE FROM subscribers WHERE id=$1`
  const value = [data.id]
  db.query(sql, value, cb)
}

const modelUpdateSubscribers = (data, id, cb) => {
  const sql =  `UPDATE subscribers SET "email" = COALESCE(NULLIF($1,''), "email") WHERE id =$2 RETURNING *`
  const value = [data.email, id]
  db.query(sql,value,cb)
}

const modelCreateSubscribers = (data, cb) => {
  const sql = 'INSERT INTO subscribers("email") VALUES($1) RETURNING *';
  const value = [data.email];
  db.query(sql, value, cb)

}

module.exports = {modelAllSubscribers, modelDeleteSubscribers, modelUpdateSubscribers, modelCreateSubscribers}
