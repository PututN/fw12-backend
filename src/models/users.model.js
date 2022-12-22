const db = require("../helpers/db.helper.js");

const readAllUsers = (filter, cb) => {
  //wajib pake 2 parameter karena yang digunakan response
  const sql = `SELECT * FROM "users" WHERE "firstName" LIKE $3 ORDER BY "${filter.sortBy}" ${filter.sort} LIMIT $1 OFFSET $2`;
  const values = [filter.limit, filter.offset, `%${filter.search}%`];
  db.query(sql, values, cb);
};
const selectCountAllUsers = (filter, cb) => {
  const sql = `SELECT COUNT("firstName") AS "totalData" FROM "users" WHERE "firstName" LIKE $1`;
  const values = [`%${filter.search}%`];
  db.query(sql, values, cb);
};

const readUser = (data, cb) => {
  const sql = `SELECT * FROM users WHERE id=$1`;
  const value = [data.id];
  db.query(sql, value, cb);
};

const getProfile = (id, cb) => {
  const sql = `SELECT * FROM users WHERE id=$1`;
  const value = [id];
  db.query(sql, value, cb);
};

const selectUserByEmail = (email, cb) => {
  const sql = `SELECT * FROM users WHERE email=$1`;
  const value = [email];
  db.query(sql, value, cb);
};

const updateProfile = (data, id, cb) => {
  const sql = `UPDATE users SET "firstName" = COALESCE(NULLIF($1, ''), "firstName"), "lastName" = COALESCE(NULLIF($2, ''), "lastName"), "phoneNumber" = COALESCE(NULLIF($3, ''), "phoneNumber"), "email" = COALESCE(NULLIF($4, ''), "email"), "password" = COALESCE(NULLIF($5, ''), "password"), "picture" = COALESCE(NULLIF($6, ''), "picture") WHERE id= $7 RETURNING *`;
  const value = [
    data.firstName,
    data.lastName,
    data.phoneNumber,
    data.email,
    data.password,
    data.picture,
    id,
  ];
  db.query(sql, value, cb);
};

const deletedUser = (data, cb) => {
  const sql = `DELETE FROM users WHERE id=$1`;
  const value = [data.id];
  db.query(sql, value, cb);
};

const createUsers = async (data) => {
  //parameter "data" tipe datanya harus object
  try {
    const sql =
      'INSERT INTO users("picture", "firstName", "lastName", "phoneNumber", "email", "password") VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
    const value = [
      data.picture,
      data.firstName,
      data.lastName,
      data.phoneNumber,
      data.email,
      data.password,
    ];
    const newUser = await db.query(sql, value);
    return newUser.rows[0];
  } catch (error) {
    if (error) throw error
  }
};

const updatedUsers = (data, id, cb) => {
  const sql = `UPDATE users SET "firstName" = COALESCE(NULLIF($1, ''), "firstName"), "lastName" = COALESCE(NULLIF($2, ''), "lastName"), "phoneNumber" = COALESCE(NULLIF($3, ''), "phoneNumber"), "email" = COALESCE(NULLIF($4, ''), "email"), "password" = COALESCE(NULLIF($5, ''), "password"), "picture" = COALESCE(NULLIF($6, ''), "picture") WHERE id= $7 RETURNING *`;
  const value = [
    data.firstName,
    data.lastName,
    data.phoneNumber,
    data.email,
    data.password,
    data.picture,
    id,
  ];
  db.query(sql, value, cb);
};

module.exports = {
  readAllUsers,
  readUser,
  deletedUser,
  createUsers,
  updatedUsers,
  selectCountAllUsers,
  selectUserByEmail,
  getProfile,
  updateProfile,
};
