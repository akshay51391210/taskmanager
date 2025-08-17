const Bid = require('../models/Bid');
const Project = require('../models/Project');

// Get all bids for a project
const getBids = async (req, res) => {
  try {
    const bids = await Bid.find({ projectId: req.params.projectId })
      .populate('bidderId', 'name email');
    res.json(bids);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Submit a new bid
const addBid = async (req, res) => {
  const { projectId, amount, days, coverLetter } = req.body;
  try {
    const project = await Project.findById(projectId);
    if (!project || project.status !== 'open') {
      return res.status(400).json({ message: 'Project not open for bids' });
    }

    const bid = await Bid.create({
      projectId,
      bidderId: req.user.id,
      amount,
      days,
      coverLetter
    });

    res.status(201).json(bid);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update bid (only bidder who created it)
const updateBid = async (req, res) => {
  const { amount, days, coverLetter } = req.body;
  try {
    const bid = await Bid.findById(req.params.id);
    if (!bid) return res.status(404).json({ message: 'Bid not found' });

    if (bid.bidderId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    bid.amount = amount ?? bid.amount;
    bid.days = days ?? bid.days;
    bid.coverLetter = coverLetter || bid.coverLetter;

    const updatedBid = await bid.save();
    res.json(updatedBid);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete bid (only bidder who created it)
const deleteBid = async (req, res) => {
  try {
    const bid = await Bid.findById(req.params.id);
    if (!bid) return res.status(404).json({ message: 'Bid not found' });

    if (bid.bidderId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await bid.remove();
    res.json({ message: 'Bid deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getBids, addBid, updateBid, deleteBid };
