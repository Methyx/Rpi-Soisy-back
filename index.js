const https = require("https");
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: process.env.BDD_HOST,
  user: process.env.BDD_USER,
  password: process.env.BDD_PWD,
  database: "test",
  connectionLimit: 5,
});

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/test", async (req, res) => {
  res.json("coucou les amis");
});

app.all("*", (req, res) => {
  res.status(401).json({ message: "route not found" });
});

app.listen(process.env.PORT, () => {
  console.log("Server is Listening on port : ", process.env.PORT);
});
// };
