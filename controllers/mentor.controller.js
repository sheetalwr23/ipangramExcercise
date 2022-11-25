const Mentor = require("../models/mentor.model");
const httpStatus = require("http-status");

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

module.exports = { createMentor };
