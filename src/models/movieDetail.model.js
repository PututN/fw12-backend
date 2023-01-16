const db = require("../helpers/db.helper");

exports.getScheduleByCityModel = async (id, date, cb) => {
  try {
    const sql = `
    SELECT c.city AS name
    FROM "movieSchedules" mS
    JOIN cinemas c ON mS."cinemaId" = c.id
    JOIN movies m on mS."movieId" = m.id
    JOIN "movieScheduleTimes" mST on mS.id = mST."movieScheduleId"
    WHERE m.id = $1
    AND (COALESCE(NULLIF($2, '')::DATE, CURRENT_DATE) BETWEEN mS."startDate" AND mS."endDate")
    GROUP BY c.city`;
    const values = [id, date];
    db.query(sql, values, cb);
  } catch (err) {
    cb(err, null);
  }
};

exports.getScheduleByMovieModel = async (id, city, date, cb) => {
  try {
    const sql = `SELECT mS.id as movieScheduleId, c.id, c.picture, c.name, c.address, c.city, mS.price, string_to_array(string_agg(DISTINCT mST.time::VARCHAR, ', '), ', ') as time
    FROM "movieSchedules" mS
    JOIN cinemas c ON mS."cinemaId" = c.id
    JOIN movies m ON mS."movieId" = m.id
    JOIN "movieScheduleTimes" mST ON mS.id = mST."movieScheduleId"
    WHERE m.id = $1 AND c.city = $2
    AND (COALESCE(NULLIF($3, '')::DATE, CURRENT_DATE) BETWEEN mS."startDate" AND mS."endDate")
    GROUP BY c.id, mS.price, mS.id`;
    const values = [id, city, date];
    db.query(sql, values, cb);
  } catch (err) {
    cb(err, null);
  }
};
