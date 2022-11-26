const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "temp/" });

const route = express.Router();

const {
  createTechnology,
  updateTechnology,
  getAllTechnologies,
  getOneTechnology,
  deleteTechnology,
} = require("../controllers/technology.controller");

route
  .post("/technology", upload.single("image"), createTechnology)
  .put("/technology/:_id", upload.single("image"), updateTechnology)
  .get("/technology", getAllTechnologies)
  .get("/technology/:_id", getOneTechnology)
  .get("/technology/:_id", deleteTechnology);

module.exports = route;
