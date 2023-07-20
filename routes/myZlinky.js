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

router.get("/myZlinky/shortterm/get", async (req, res) => {
  try {
    const request = "SELECT * FROM short-term";
    const conn = await pool.getConnection();
    const response = await conn.query(request);
    await conn.end();
    res.json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/myZlinky/shortterm/put", async (req, res) => {
  try {
    const { time, index, conso } = req.body;
    const request = `INSERT INTO short-term (time, index, value) VALUES ("${time}","${Number(
      index
    )}","${Number(conso)})`;
    const conn = await pool.getConnection();
    const response = await conn.query(request);
    await conn.end();
    res.json(response.insertId.toString());
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
