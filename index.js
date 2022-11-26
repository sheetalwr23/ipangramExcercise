const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const { PORT, MONGODB_URL } = process.env;
const fs = require("fs");
const helmet = require("helmet");

const app = express();

/**
 * Middlewares
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());

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
const technologyeRoutes = require("./routes/technology.route");
const projectRoutes = require("./routes/project.route");

app.use("/api/v1/", mentorRoutes);
app.use("/api/v1/", employeeRoutes);
app.use("/api/v1/", technologyeRoutes);
app.use("/api/v1/", projectRoutes);

/**
 * File Donwloading Path
 */
app.get("/api/v1/image/:filename", function (req, res) {
  var filePath = "/uploads/" + req.params.filename;
  fs.readFile(__dirname + filePath, function (err, data) {
    if (err) {
      res.send(err);
    } else {
      if (req.params.filename) {
        if (
          req.params.filename.split(".")[
            req.params.filename.split(".").length - 1
          ] == "pdf"
        ) {
          var file = fs.createReadStream(__dirname + filePath);
          var stat = fs.statSync(__dirname + filePath);
          res.setHeader("Content-Length", stat.size);
          res.setHeader("Content-Type", "application/pdf");
          res.setHeader(
            "Content-Disposition",
            "attachment; filename=" + req.params.filename
          );
          file.pipe(res);
        } else {
          res.contentType("application/image");
          res.send(data);
        }
      }
    }
  });
});
