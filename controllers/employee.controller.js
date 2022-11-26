const Employee = require("../models/employee.model");
const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const createEmployee = async (req, res) => {
  const { email } = req.body;
  try {
    if (await Employee.isEmailTaken(email)) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: "Email already used" });
    }
    const employee = await Employee.create(req.body);
    res.send(employee);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json(error);
  }
};

const employeeLogin = async (req, res) => {
  const { email, password } = req.body;
  const employee = await Employee.findOne({ email });

  if (!employee || !(await bcrypt.compare(password, employee.password))) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ status: false, message: "Invalid Credentials" });
  }

  const token = jwt.sign(JSON.stringify(employee), "thisisasamplesecret");
  res.send({ employee, token });
};

module.exports = { createEmployee, employeeLogin };
