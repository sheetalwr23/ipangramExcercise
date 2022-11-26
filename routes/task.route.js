const express = require("express");

const route = express.Router();

const {
  createTask,
  // updateTask,
  getAllTasks,
  getOneTask,
  getAllTasksForProject,
  // deleteTask,
  createComment,
  createCommentReply,
} = require("../controllers/task.controller");

route
  .post("/task", createTask)
  // .put("/task/:_id", updateTask)
  .get("/task", getAllTasks)
  .get("/task/project/:_id", getAllTasksForProject)
  .get("/task/:_id", getOneTask)
  .post("/task/:_id/comment", createComment)
  .post("/task/:_id/comment/:_cid/reply", createCommentReply);

module.exports = route;
