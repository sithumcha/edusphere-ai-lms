const express = require('express');
const router = express.Router();
const {
  getQuizzesByCourse,
  createQuiz,
  submitQuizAttempt,
  getStudentQuizHistory
} = require('../controllers/quizController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.get('/history', protect, getStudentQuizHistory);
router.get('/:courseId', getQuizzesByCourse);
router.post('/', protect, authorizeRoles('instructor', 'admin'), createQuiz);
router.post('/:quizId/attempt', protect, submitQuizAttempt);

module.exports = router;
