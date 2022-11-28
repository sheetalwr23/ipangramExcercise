const Task = require("../models/task.model");

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.send(task);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json(error);
  }
};

const getAllTasks = async (req, res) => {
  try {
    const task = await Task.find()
      .populate("developer")
      .populate({ path: "comments", populate: { path: "username" } })
      .populate({
        path: "comments",
        populate: { path: "reply", populate: { path: "username" } },
      });
    res.send(task);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json(error);
  }
};

const getAllTasksForProject = async (req, res) => {
  try {
    const { _id } = req.params;
    console.log("_id", _id);
    const task = await Task.find({ project: _id })
      .populate("developer")
      .populate({ path: "comments", populate: { path: "username" } })
      .populate({
        path: "comments",
        populate: { path: "reply", populate: { path: "username" } },
      });
    res.send(task);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json(error);
  }
};
const getOneTask = async (req, res) => {
  try {
    const { _id } = req.params;
    const task = await Task.find({ _id })
      .populate("developer")
      .populate({ path: "comments", populate: { path: "username" } })
      .populate({
        path: "comments",
        populate: { path: "reply", populate: { path: "username" } },
      });
    res.send(task);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json(error);
  }
};

const createComment = async (req, res) => {
  try {
    const { _id } = req.params;
    const { user, comment } = req.body;
    const com = await Task.updateOne(
      { _id },
      { $push: { comments: { comment, username: user } } }
    );
    res.send(com);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json(error);
  }
};

const createCommentReply = async (req, res) => {
  try {
    const { _id, _cid } = req.params;
    const { user, comment } = req.body;
    const com = await Task.updateOne(
      { _id },
      // { comments: { $push: { reply: { comment, username: user } } } },
      {
        $set: {
          "comments.$[comments].reply.$[reply]": { comment, username: user },
        },
      },
      { arrayFilters: [{ "comments.id": _cid }] }
    );
    res.send(com);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json(error);
  }
};

module.exports = {
  createTask,
  // updateTask,
  getAllTasks,
  getOneTask,
  // deleteTask,
  getAllTasksForProject,
  createComment,
  createCommentReply,
};
