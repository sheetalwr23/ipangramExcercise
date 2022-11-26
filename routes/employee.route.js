const express = require("express");

const route = express.Router();

const {
  createEmployee,
  employeeLogin,
  employeeProject,
} = require("../controllers/employee.controller");

route.post("/employee", createEmployee);
route.post("/empLogin", employeeLogin);
route.get("/employee/projects/:_id", employeeProject);

module.exports = route;
