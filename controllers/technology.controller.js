const Employee = require("../models/employee.model");
const { uploadFile } = require("../services/common.services");
const fs = require("fs");

const Technology = require("../models/technology.model");

const createTechnology = async (req, res) => {
  const name = req.file ? await uploadFile("technology_", req.file) : "";
  req.body.image = name;
  const technology = await Technology.create(req.body);
  res.send(technology);
};

const getAllTechnologies = async (req, res) => {
  const technology = await Technology.find();
  const tech = technology.map((item) => {
    item.image =
      req.protocol + "://" + req.get("host") + "/api/v1/image/" + item.image;
    return item;
  });
  res.send(tech);
};

const getOneTechnology = async (req, res) => {
  const { _id } = req.params;
  const technology = await Technology.findOne({ _id });
  technology.image =
    req.protocol +
    "://" +
    req.get("host") +
    "/api/v1/image/" +
    technology.image;
  res.send(technology);
};

const updateTechnology = async (req, res) => {
  const { _id } = req.params;
  const name = req.file ? await uploadFile("technology_", req.file) : "";
  req.body.image = name;
  const technology = await Technology.updateOne({ _id }, req.body);
  res.send(technology);
};

const deleteTechnology = async (req, res) => {
  const { _id } = req.params;
  const name = Technology.findOne({ _id });
  fs.unlink(name.image);
  const technology = await Technology.deleteOne({ _id });
  res.send(technology);
};

module.exports = {
  createTechnology,
  getAllTechnologies,
  getOneTechnology,
  updateTechnology,
  deleteTechnology,
};
