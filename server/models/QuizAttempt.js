const mongoose = require('mongoose');

const quizAttemptSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    answers: [
      {
        questionId: { type: String },
        selectedOption: { type: Number },
        isCorrect: { type: Boolean }
      }
    ],
    score: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    passed: { type: Boolean, default: false },
    attemptedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model('QuizAttempt', quizAttemptSchema);
