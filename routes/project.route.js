const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "temp/" });

const route = express.Router();

const {
  createProject,
  updateProject,
  getAllProjects,
  getOneProject,
  deleteProject,
} = require("../controllers/project.controller");

route
  .post("/project", upload.single("document"), createProject)
  .put("/project/:_id", upload.single("document"), updateProject)
  .get("/project", getAllProjects)
  .get("/project/:_id", getOneProject)
  .get("/project/:_id", deleteProject);

module.exports = route;
