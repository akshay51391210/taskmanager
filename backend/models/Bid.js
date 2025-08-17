const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  bidderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // freelancer
  amount: { type: Number, required: true, min: 0 },
  days: { type: Number, required: true, min: 1 }, // delivery time
  coverLetter: { type: String },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'withdrawn'],
    default: 'pending'
  }
}, { timestamps: true });

bidSchema.index({ projectId: 1, createdAt: -1 });
bidSchema.index({ bidderId: 1, createdAt: -1 });

module.exports = mongoose.model('Bid', bidSchema);
