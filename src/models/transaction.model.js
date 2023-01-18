const db = require("../helpers/db.helper");

const modelAllTransaction = (filter, cb) => {
  const sql = `SELECT * FROM transaction WHERE "fullName" LIKE $3 ORDER BY "${filter.sortBy}" ${filter.sort} LIMIT $1 OFFSET $2`;
  const values = [filter.limit, filter.offset, `%${filter.search}%`];
  db.query(sql, values, cb);
};
const selectCountAllTransaction = (filter, cb) => {
  const sql = `SELECT COUNT("fullName") AS "totalData" FROM "transaction" WHERE "fullName" LIKE $1`;
  const values = [`%${filter.search}%`];
  db.query(sql, values, cb);
};

const modelTransactionId = (id, cb) => {
  const sql = `SELECT c.picture,
  t."bookingDate",
  t.time,
  m.title,
  string_agg(DISTINCT g.name,', ') AS genre,
  rS.*
  FROM transaction t
  JOIN cinemas c ON t."cinemaId" = c.id
  JOIN movies m ON t."movieId" = m.id
  JOIN "movieGenre" mg ON mg."movieId" = m.id
  JOIN genre g ON g.id = mg."genreId"
  JOIN "reversedSeat" rS ON rS."transactionId" = t.id
  WHERE t."userId"=$1
  GROUP BY c.picture, t."bookingDate", t.time, m.title, rS.id`;
  const value = [id];
  db.query(sql, value, cb);
};

const modelDeleteTransactionId = (data, cb) => {
  const sql = `DELETE FROM transaction WHERE id=$1`;
  const value = [data.id];
  db.query(sql, value, cb);
};

const modelUpdateTransaction = (data, id, cb) => {
  const sql = `UPDATE transaction SET "bookingDate" = COALESCE(NULLIF($1, '')::TIMESTAMPTZ, "bookingDate"), "movieId" = COALESCE(NULLIF($2, '')::INTEGER, "movieId"), "cinemaId" = COALESCE(NULLIF($3, '')::INTEGER, "cinemaId"), "movieScheduleId" = COALESCE(NULLIF($4, '')::INTEGER, "movieScheduleId"), "fullName" = COALESCE(NULLIF($5, ''), "fullName"), "email" = COALESCE(NULLIF($6, ''), "email"), "phoneNumber" = COALESCE(NULLIF($7, ''), "phoneNumber"), "statusId" = COALESCE(NULLIF($8, '')::INTEGER, "statusId") WHERE id =$9 RETURNING *`;
  const value = [
    data.bookingDate,
    data.movieId,
    data.cinemaId,
    data.movieScheduleId,
    data.fullName,
    data.email,
    data.phoneNumber,
    data.statusId,
    id,
  ];
  db.query(sql, value, cb);
};

const modelCreateTransaction = (data, cb) => {
  const sql =
    'INSERT INTO transaction("bookingDate", "movieId", "cinemaId", "movieScheduleId", "fullName", "email", "phoneNumber", "statusId") VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
  const value = [
    data.bookingDate,
    data.movieId,
    data.cinemaId,
    data.movieScheduleId,
    data.fullName,
    data.email,
    data.phoneNumber,
    data.statusId,
  ];
  db.query(sql, value, cb);
};

const modelCreateOrder = async (data, cb) => {
  try {
    await db.query("BEGIN");
    const insertTransaction = `INSERT INTO "transaction" ("userId", "fullName", "email", "phoneNumber", "movieId", "cinemaId", "bookingDate", "movieScheduleId", "statusId", "paymentId", "time", "totalPrice") VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`;
    const sql = await db.query(insertTransaction, [
      data.userId,
      data.fullName,
      data.email,
      data.phoneNumber,
      data.movieId,
      data.cinemaId,
      data.bookingDate,
      data.movieScheduleId,
      data.statusId,
      data.paymentId,
      data.time,
      data.totalPrice,
    ]);
    const insertSeatNum = `INSERT INTO "reversedSeat" ("seatNum", "transactionId") VALUES ($1, $2) RETURNING *`;
    const insertSeatNumValues = [data.seatNum, sql.rows[0].id];
    const sqlseat = await db.query(insertSeatNum, insertSeatNumValues);
    await db.query("COMMIT");
    const dataOrder = {
      transaction: sql.rows[0],
      seatNum: sqlseat.rows,
    };
    cb(null, dataOrder); // data order disini mengembalikan result dalam bentuk object (controller) (err,result)
  } catch (e) {
    await db.query("ROLLBACK");
    cb(e, null); //cb (err,result) >> kondisinya error
  }
};

const modelHistoryById = async (data) => {
  try {
    const sql = `SELECT m.title, t."bookingDate", t.time, t."totalPrice", rS."seatNum",  string_agg(DISTINCT g.name,', ') AS genre FROM "reversedSeat" rS
    JOIN transaction t ON t.id = rS."transactionId"
    JOIN cinemas c ON t."cinemaId" = c.id
    JOIN movies m ON t."movieId" = m.id
    JOIN "movieGenre" mg ON mg."movieId" = m.id
    JOIN genre g ON g.id = mg."genreId"
    WHERE rS.id=$1
    GROUP BY c.picture, t."bookingDate", t.time, m.title, rS.id, t."totalPrice"`;
    const value = [data.id];
    const results = await db.query(sql, value);
    return results.rows[0];
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  modelAllTransaction,
  modelTransactionId,
  modelDeleteTransactionId,
  modelUpdateTransaction,
  modelCreateTransaction,
  selectCountAllTransaction,
  modelCreateOrder,
  modelHistoryById,
};
