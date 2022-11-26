const express = require("express");

const route = express.Router();

const {
  createMentor,
  mentorLogin,
  getMentorProjects,
} = require("../controllers/mentor.controller");

route.post("/mentor", createMentor);
route.post("/mentorLogin", mentorLogin);
route.get("/mentor/projects/:_id", getMentorProjects);

module.exports = route;
