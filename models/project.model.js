const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
  {
    timeline: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      trim: true,
      lowercase: true,
    },
    endDate: {
      type: Date,
      trim: true,
      lowercase: true,
    },
    document: {
      type: String,
      trim: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "employee",
      },
    ],
    technology: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "technology",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("project", projectSchema);
