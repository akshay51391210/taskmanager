const mongoose = require("mongoose");

const milestoneSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "in-progress", "completed", "paid"],
    default: "pending",
  },
}, { timestamps: true });

module.exports = mongoose.model("Milestone", milestoneSchema);
