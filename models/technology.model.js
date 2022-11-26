const mongoose = require("mongoose");

const technologySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      trim: true,
      lowercase: true,
    },
    resources: {
      type: Array,
      required: true,
      trim: true,
    },
    status: {
      type: Boolean,
      required: true,
      trim: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("technology", technologySchema);
