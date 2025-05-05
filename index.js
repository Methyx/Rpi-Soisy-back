const fs = require("fs");
const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/allo", async (req, res) => {
  res.json("coucou mes amis");
});

app.get("/getkWattsColor", async (req, res) => {
  try {
    const key = "8055ab6b8560796d19caf2510a878ac3"; // philippe.mercy@free.fr on DEV
    const response = await axios.get(
      "https://dev01.cumkwatt.com/api_front?key=" + key
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.all("*", (req, res) => {
  res.status(401).json({ message: "route not found" });
});

app.listen(process.env.PORT, () => {
  console.log(new Date(), "Server is Listening on port : ", process.env.PORT);
});
