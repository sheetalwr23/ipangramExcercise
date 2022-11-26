const Mentor = require("../models/mentor.model");
const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const createMentor = async (req, res) => {
  const { email } = req.body;
  if (await Mentor.isEmailTaken(email)) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: "Email already used" });
  }
  const mentor = await Mentor.create(req.body);
  res.send(mentor);
};

const mentorLogin = async (req, res) => {
  const { email, password } = req.body;
  const mentor = await Mentor.findOne({ email });

  if (!mentor || !(await bcrypt.compare(password, mentor.password))) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ status: false, message: "Invalid Credentials" });
  }

  const token = jwt.sign(JSON.stringify(mentor), "thisisasamplesecret");
  res.send({ mentor, token });
};

module.exports = { createMentor, mentorLogin };
