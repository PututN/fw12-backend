// const { Pool } = require("pg"); //pool ini digunakan untuk mengkoneksi dengan database postgree

// const db = new Pool({
//   connectionString : "postgresql://postgres:p72PNbhuqSn#!wh@db.bgsgrtonoxhwpujndgfh.supabase.co:5432/postgres"  //connectionstring untuk mengakses database
// })
const { Pool } = require("pg");

const db = new Pool({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

db.connect((err) => {
  if (err) {
    console.log(err);
    console.log("database is not connect");
  } else {
    console.log("database is connect!");
  }
});

module.exports = db;
