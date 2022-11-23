const postgree = require('../helpers/db.helper.js')

const readAllUsers= (req, res) => { //wajib pake 2 parameter karena yang digunakan response
  postgree.query('SELECT * FROM users', (error,result) => {
    if(error) {
      return res.status(500).json({
        success: false,
        message: "Access database failed"
    })
  } else {
      return res.status(200).json({
        success: true,
        message: "Access database success",
        data: result.rows,
      })
  }
  }
  )
}

const readUser = (req, res) => {

  postgree.query(`SELECT * FROM users WHERE id=${req.params.id}`, (error,result) => {
    if(error) {
      return res.status(500).json({
        success: false,
        message: "Access database failed"
    })
  } else {
      return res.status(200).json({
        success: true,
        message: "Access database success",
        data: result.rows,
      })
  }
  }
  )
}

const deletedUser = (req, res) => {

  postgree.query(`DELETE FROM users WHERE id=${req.params.id}`, (error,result) => {
    if(error) {
      return res.status(500).json({
        success: false,
        message: "Delete user failed"
    })
  } else {
      return res.status(200).json({
        success: true,
        message: "Delete user success",
        data: result.rows,
      })
  }
  }
  )
}

const createUsers = (req, res) => {

  postgree.query(`INSERT INTO users("firstName", "lastName", "phoneNumber", "email", "password")
  VALUES('${req.body.firstName}', '${req.body.lastName}', '${req.body.phoneNumber}', '${req.body.email}', '${req.body.password}')
  `, (error,result) => {
    if(error) {
      return res.status(500).json({
        success: false,
        message: "Create user failed"
    })
  } else {
      return res.status(200).json({
        success: true,
        message: "Create user success",
        data: result.rows,
      })
  }
  }
  )
}


const updatedUsers = (req, res) => {

  postgree.query(`UPDATE users SET "firstName" = '${req.body.firstName}', "lastName" = '${req.body.lastName}', "phoneNumber" = '${req.body.phoneNumber}', "email" = '${req.body.email}', "password" = '${req.body.password}' WHERE id=${req.params.id}`, (error,result) => {
    if(error) {
      return res.status(500).json({
        success: false,
        message: "Updated user failed"
    })
  } else {
      return res.status(200).json({
        success: true,
        message: "Updated user success",
      })
  }
  }
  )
}

module.exports = {readAllUsers, readUser, deletedUser, createUsers, updatedUsers}
