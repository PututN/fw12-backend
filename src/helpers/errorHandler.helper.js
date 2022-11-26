const errorHandler =  (err, res) => {
  console.log(err)
  if(err.message.includes('duplicate key value violates unique constraint "email"') || err.message.includes('unique_email') ) {
    return res.status(400).json({
      success: false,
      message: "Email already exists"
    })
  } else if (err.message.includes('duplicate key value violates unique constraint "name"') || err.message.includes('unique_name')) {
    return res.status(400).json({
      success: false,
      message: "Name already exists"
    })
  }
  return res.status(500).json({
    success: false,
    message: "Something happend in our backend"
  })
}

module.exports = errorHandler
