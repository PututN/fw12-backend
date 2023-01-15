const db = require("../helpers/db.helper");

exports.getScheduleByCityModel = async (id, date, cb) => {
  try {
    const sql = `
    SELECT c.city as name
    FROM "movieSchedules" mS
    JOIN cinemas c ON mS."cinemaId" = c.id
    JOIN movies m on mS."movieId" = m.id
    JOIN "movieScheduleTimes" mST on mS.id = mST."movieScheduleId"
    WHERE m.id = $1
    AND (COALESCE(NULLIF($2, '')::DATE, CURRENT_DATE) BETWEEN mS."startDate" AND mS."endDate")
    GROUP BY c.city`;
    const values = [id, date];
    db.query(sql, values, cb)
  } catch (err) {
    cb(err, null);
  }
};
