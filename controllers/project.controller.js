const Project = require("../models/project.model");
const { uploadFile } = require("../services/common.services");
const fs = require("fs");

const createProject = async (req, res) => {
  try {
    const name = req.file ? await uploadFile("project_", req.file) : "";
    req.body.document = name;
    req.body.startDate = new Date(req.body.startDate);
    req.body.endDate = new Date(req.body.endDate);
    const project = await Project.create(req.body);
    res.send(project);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllProjects = async (req, res) => {
  const project = await Project.find()
    .populate("members")
    .populate("technology");
  const tech = project.map((item) => {
    item.document =
      req.protocol + "://" + req.get("host") + "/api/v1/image/" + item.document;
    return item;
  });
  res.send(tech);
};

const getOneProject = async (req, res) => {
  const { _id } = req.params;
  const project = await Project.findOne({ _id })
    .populate("members")
    .populate("technology");
  project.document =
    req.protocol +
    "://" +
    req.get("host") +
    "/api/v1/image/" +
    project.document;
  res.send(project);
};

const updateProject = async (req, res) => {
  const { _id } = req.params;
  const oldProject = await Project.findOne({ _id });
  const name = req.file
    ? await uploadFile("project_", req.file)
    : oldProject.document;
  req.body.document = name;
  req.body.startDate = new Date(req.body.startDate);
  req.body.endDate = new Date(req.body.endDate);
  const project = await Project.updateOne({ _id }, req.body);
  res.send(project);
};

const deleteProject = async (req, res) => {
  const { _id } = req.params;
  const name = Project.findOne({ _id });
  fs.unlink(name.image);
  const project = await Project.deleteOne({ _id });
  res.send(project);
};

module.exports = {
  createProject,
  updateProject,
  getAllProjects,
  getOneProject,
  deleteProject,
};
