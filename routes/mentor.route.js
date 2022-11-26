const express = require("express");

const route = express.Router();

const {
  createMentor,
  mentorLogin,
} = require("../controllers/mentor.controller");

route.post("/mentor", createMentor);
route.post("/mentorLogin", mentorLogin);

module.exports = route;
