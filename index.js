const https = require("https");
const fs = require("fs");
const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.use(require("./routes/myZlinky"));

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
