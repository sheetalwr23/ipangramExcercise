const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    username: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "employee",
    },

    comment: {
      type: String,
      required: true,
    },
    reply: [
      mongoose.Schema(
        {
          username: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "employee",
          },
          comment: {
            type: String,
            required: true,
          },
        },
        {
          timestamps: true,
        }
      ),
    ],
  },
  {
    timestamps: true,
  }
);

const projectSchema = mongoose.Schema(
  {
    estimatedTime: {
      type: String,
      trim: true,
    },
    actualTime: {
      type: String,
      trim: true,
    },
    completionStatus: {
      type: Boolean,
      trim: true,
      default: false,
    },
    description: {
      type: String,
      trim: true,
    },
    comments: [CommentSchema],
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "project",
    },
    qa: {
      type: String,
    },
    codeQuality: {
      type: String,
    },
    approvedByClient: {
      type: String,
    },
    developer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employee",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("task", projectSchema);
