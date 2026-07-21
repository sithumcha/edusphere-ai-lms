const Quiz = require('../models/Quiz');
const QuizAttempt = require('../models/QuizAttempt');

// @desc Get quizzes for a course
// @route GET /api/quizzes/:courseId
const getQuizzesByCourse = async (req, res) => {
  try {
    const quizzes = await Quiz.find({ courseId: req.params.courseId });
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Create a new quiz
// @route POST /api/quizzes
const createQuiz = async (req, res) => {
  try {
    const { courseId, lessonId, moduleId, title, questions } = req.body;

    const quiz = await Quiz.create({
      courseId,
      lessonId,
      moduleId,
      title: title || 'Module Assessment Quiz',
      questions,
      createdBy: req.user._id
    });

    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Submit a quiz attempt & auto-grade
// @route POST /api/quizzes/:quizId/attempt
const submitQuizAttempt = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { answers } = req.body; // Array of { questionIndex, selectedOption }

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    let correctCount = 0;
    const processedAnswers = quiz.questions.map((q, idx) => {
      const userAns = answers.find((a) => a.questionIndex === idx || a.questionId === q._id?.toString());
      const selectedOption = userAns ? Number(userAns.selectedOption) : -1;
      const isCorrect = selectedOption === q.correctAnswer;
      if (isCorrect) correctCount++;

      return {
        questionId: q._id ? q._id.toString() : idx.toString(),
        selectedOption,
        isCorrect
      };
    });

    const totalQuestions = quiz.questions.length;
    const scorePercentage = Math.round((correctCount / totalQuestions) * 100);
    const passed = scorePercentage >= 60;

    const attempt = await QuizAttempt.create({
      studentId: req.user._id,
      quizId,
      courseId: quiz.courseId,
      answers: processedAnswers,
      score: scorePercentage,
      totalQuestions,
      passed
    });

    res.json({
      attempt,
      correctCount,
      totalQuestions,
      score: scorePercentage,
      passed,
      questions: quiz.questions
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get student quiz attempts history
// @route GET /api/quizzes/attempts/history
const getStudentQuizHistory = async (req, res) => {
  try {
    const attempts = await QuizAttempt.find({ studentId: req.user._id })
      .populate('quizId')
      .populate('courseId', 'title thumbnail')
      .sort({ createdAt: -1 });

    res.json(attempts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getQuizzesByCourse,
  createQuiz,
  submitQuizAttempt,
  getStudentQuizHistory
};
