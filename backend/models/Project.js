const mongoose = require('mongoose');

const milestoneSchema = new mongoose.Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true, min: 0 },
  dueDate: { type: Date },
  paid: { type: Boolean, default: false }
}, { _id: false });

const projectSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // who posted it
  title: { type: String, required: true },
  description: { type: String },
  deadline: { type: Date },
  skills: [{ type: String }], // e.g. ["react", "node", "ui-design"]
  budgetMin: { type: Number, min: 0 },
  budgetMax: { type: Number, min: 0 },
  status: {
    type: String,
    enum: ['open', 'awarded', 'in_progress', 'completed', 'cancelled'],
    default: 'open'
  },
  milestones: [milestoneSchema],
  paymentStatus: {
    type: String,
    enum: ['unpaid', 'escrowed', 'released', 'disputed'],
    default: 'unpaid'
  }
  
}, { timestamps: true });

projectSchema.index({ clientId: 1, status: 1, createdAt: -1 });

module.exports = mongoose.model('Project', projectSchema);
