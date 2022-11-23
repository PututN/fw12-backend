const { Pool } = require("pg"); //pool ini digunakan untuk mengkoneksi dengan database postgree

// const postgree = new Pool({ //membuat variable untuk mendefiniskan koneksi database dengan menggunakan key value
//   host: 'localhost',
//   port: '5432',
//   password : '1',
//   user : 'postgres',
//   database : 'cinemnar'
// })

const postgres = new Pool({
  connectionString :  'postgres://postgres:1@localhost:5432/cinemnar' //connectionstring untuk mengakses database
})

postgres.connect((err) =>{
  if(err) {
    console.log('database is not connect')
  } else{
    console.log('database is connect!')
  }
})

module.exports = postgres
