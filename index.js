const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

/**
 * Middlewares
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require("dotenv").config();
const { PORT, MONGODB_URL } = process.env;
/**
 * Database Connectivity
 */
mongoose.connect(MONGODB_URL).then(() => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

const mentorRoutes = require("./routes/mentor.route");

app.use("/api/v1/", mentorRoutes);
