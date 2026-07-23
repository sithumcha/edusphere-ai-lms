const express = require('express');
const router = express.Router();
const {
  generateQuiz,
  chatWithTutor,
  summarizeTranscript,
  getRecommendations,
  runCode,
  fixCode
} = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

router.post('/generate-quiz', protect, generateQuiz);
router.post('/chatbot', protect, chatWithTutor);
router.post('/summarize-transcript', protect, summarizeTranscript);
router.get('/recommendations/:userId', protect, getRecommendations);
router.post('/run-code', protect, runCode);
router.post('/fix-code', protect, fixCode);

module.exports = router;
