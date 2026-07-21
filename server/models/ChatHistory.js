const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
  role: { type: String, enum: ['user', 'ai'], required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const chatHistorySchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    messages: [chatMessageSchema]
  },
  { timestamps: true }
);

chatHistorySchema.index({ studentId: 1, courseId: 1 }, { unique: true });

module.exports = mongoose.model('ChatHistory', chatHistorySchema);
