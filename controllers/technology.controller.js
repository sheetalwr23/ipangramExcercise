const { uploadFile } = require("../services/common.services");
const fs = require("fs");

const Technology = require("../models/technology.model");

const createTechnology = async (req, res) => {
  try {
    const name = req.file ? await uploadFile("technology_", req.file) : "";
    req.body.image = name;
    const technology = await Technology.create(req.body);
    res.send(technology);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json(error);
  }
};

const getAllTechnologies = async (req, res) => {
  try {
    const technology = await Technology.find();
    const tech = technology.map((item) => {
      item.image =
        req.protocol + "://" + req.get("host") + "/api/v1/image/" + item.image;
      return item;
    });
    res.send(tech);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json(error);
  }
};

const getOneTechnology = async (req, res) => {
  try {
    const { _id } = req.params;
    const technology = await Technology.findOne({ _id });
    technology.image =
      req.protocol +
      "://" +
      req.get("host") +
      "/api/v1/image/" +
      technology.image;
    res.send(technology);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json(error);
  }
};

const updateTechnology = async (req, res) => {
  try {
    const { _id } = req.params;
    const oldTech = await Technology.findOne({ _id });
    const name = req.file
      ? await uploadFile("technology_", req.file)
      : oldTech.image;
    req.body.image = name;
    const technology = await Technology.updateOne({ _id }, req.body);
    res.send(technology);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json(error);
  }
};

const deleteTechnology = async (req, res) => {
  try {
    const { _id } = req.params;
    const name = Technology.findOne({ _id });
    fs.unlink(name.image);
    const technology = await Technology.deleteOne({ _id });
    res.send(technology);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json(error);
  }
};

module.exports = {
  createTechnology,
  getAllTechnologies,
  getOneTechnology,
  updateTechnology,
  deleteTechnology,
};
