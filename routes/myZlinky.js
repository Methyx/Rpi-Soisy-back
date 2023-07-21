const express = require("express");
const date = require("date-and-time");
const router = express.Router();

const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: "myZlinky",
  connectionLimit: 5,
});

router.get("/myZlinky/semihour/list", async (req, res) => {
  try {
    const request = "SELECT * FROM SemiHour";
    const conn = await pool.getConnection();
    const response = await conn.query(request);
    await conn.end();
    res.json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/myZlinky/semihour/put", async (req, res) => {
  try {
    const { time, counterIndex, consumption } = req.body;
    const request = `INSERT INTO SemiHour (time, counterIndex, consumption) VALUES ("${time}",${Number(
      counterIndex
    )},${Number(consumption)})`;
    const conn = await pool.getConnection();
    const response = await conn.query(request);
    await conn.end();
    res.json(response.insertId.toString());
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
