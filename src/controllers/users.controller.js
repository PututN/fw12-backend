const readAllUsers = (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'list data of users'
  })
}
const readUser = (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'data of user'
  })
}
const createUsers = (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'user created successfully'
  })
}
const deletedUsers = (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Deleted user successfully'
  })
}
const updatedUsers = (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Updated user successfully'
  })
}
module.exports = {readAllUsers, createUsers, deletedUsers, updatedUsers, readUser} //sama saja dengan export.readAllUsers dll
