const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()

require("dotenv").config()

app.use(express.json()) //untuk parsing json
app.use(express.urlencoded({extended:true})) //untuk form encode
app.use(cors()) // untuk membuka akses ke front end
app.use(morgan("dev"))
app.use('/', require('./src/routes'))

app.use('/assets/uploads', express.static("uploads/"))

app.get('/', (request, response) => { //buat informasi kalau backend kita bisa diakses atau tidak
  return response.status(200).json({
    success: true,
    message: "Backend is running well",
  }
  )
}
)
//membuka port app
app.listen(8888, () => {
  console.log('App listening on port 8888')
})

