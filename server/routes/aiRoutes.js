const express = require('express');
const router = express.Router();
const {
  generateQuiz,
  chatWithTutor,
  summarizeTranscript,
  getRecommendations
} = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

router.post('/generate-quiz', protect, generateQuiz);
router.post('/chatbot', protect, chatWithTutor);
router.post('/summarize-transcript', protect, summarizeTranscript);
router.get('/recommendations/:userId', protect, getRecommendations);

module.exports = router;
