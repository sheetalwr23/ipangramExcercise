const express = require("express");

const route = express.Router();

const { createMentor } = require("../controllers/mentor.controller");

route.post("/mentor", createMentor);

module.exports = route;
