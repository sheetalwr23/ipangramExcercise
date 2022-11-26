const express = require("express");

const route = express.Router();

const {
  createEmployee,
  employeeLogin,
} = require("../controllers/employee.controller");

route.post("/employee", createEmployee);
route.post("/empLogin", employeeLogin);

module.exports = route;
