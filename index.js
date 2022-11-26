const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const { PORT, MONGODB_URL } = process.env;

const app = express();

/**
 * Middlewares
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

/**
 * Routes For All APIS
 */
const mentorRoutes = require("./routes/mentor.route");
const employeeRoutes = require("./routes/employee.route");

app.use("/api/v1/", mentorRoutes);
app.use("/api/v1/", employeeRoutes);
