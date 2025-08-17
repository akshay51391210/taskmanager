const express = require("express");
const router = express.Router();
const Milestone = require("../models/Milestone");
const { protect } = require("../middleware/authMiddleware");

// Create a milestone
router.post("/", protect, async (req, res) => {
  try {
    const { projectId, description, amount, dueDate } = req.body;

    const milestone = await Milestone.create({
      projectId,
      description,
      amount,
      dueDate,
      status: "pending", // default status
      paymentStatus: "unpaid"
    });

    res.status(201).json(milestone);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all milestones for a project
router.get("/:projectId", protect, async (req, res) => {
  try {
    const milestones = await Milestone.find({ projectId: req.params.projectId });
    res.json(milestones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Simulate payment release
router.post("/:id/release", protect, async (req, res) => {
  try {
    const milestone = await Milestone.findById(req.params.id);

    if (!milestone) {
      return res.status(404).json({ message: "Milestone not found" });
    }

    if (milestone.paymentStatus === "paid") {
      return res.status(400).json({ message: "Milestone already paid" });
    }

    // Simulate payment release
    milestone.paymentStatus = "paid";
    milestone.status = "completed";
    await milestone.save();

    res.json({ message: "Payment released successfully", milestone });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
