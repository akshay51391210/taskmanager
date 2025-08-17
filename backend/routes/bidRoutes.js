const express = require('express');
const { getBids, addBid, updateBid, deleteBid } = require('../controllers/bidController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Bids belong to a project
router.route('/:projectId').get(protect, getBids).post(protect, addBid);  // freelancer submits bid

// Manage individual bid
router.route('/bid/:id').put(protect, updateBid).delete(protect, deleteBid); // bidder can delete their bid

module.exports = router;
