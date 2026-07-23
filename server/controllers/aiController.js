const {
  generateQuizFromAI,
  getAIChatTutorResponse,
  summarizeTranscriptAI,
  generateCourseRecommendationsAI,
  runAndReviewCodeAI,
  fixAndFormatCodeAI
} = require('../services/aiService');
const Course = require('../models/Course');
const ChatHistory = require('../models/ChatHistory');
const Quiz = require('../models/Quiz');
const Enrollment = require('../models/Enrollment');

// @desc Generate AI Quiz questions from topic or lesson content
// @route POST /api/ai/generate-quiz
const generateQuiz = async (req, res) => {
  try {
    const { topic, content, courseId, lessonId, numberOfQuestions, saveToDb } = req.body;

    if (!topic && !content) {
      return res.status(400).json({ message: 'Topic or content is required to generate quiz' });
    }

    const questions = await generateQuizFromAI(topic || 'Course Module', content, numberOfQuestions || 5);

    let savedQuiz = null;
    if (saveToDb && courseId) {
      savedQuiz = await Quiz.create({
        courseId,
        lessonId: lessonId || null,
        title: `AI Generated Quiz: ${topic || 'Lesson Quiz'}`,
        questions,
        createdBy: req.user._id
      });
    }

    res.json({
      success: true,
      quiz: savedQuiz,
      questions
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc RAG Chatbot Tutor response
// @route POST /api/ai/chatbot
const chatWithTutor = async (req, res) => {
  try {
    const { courseId, lessonId, message } = req.body;
    const studentId = req.user._id;

    if (!message) {
      return res.status(400).json({ message: 'Message content is required' });
    }

    // Fetch Course & Lesson context for RAG
    let courseContext = 'General online learning platform context.';
    if (courseId) {
      const course = await Course.findById(courseId);
      if (course) {
        let currentLesson = null;
        if (lessonId && course.modules) {
          for (const mod of course.modules) {
            const found = mod.lessons.find((l) => l._id.toString() === lessonId || l.id === lessonId);
            if (found) {
              currentLesson = found;
              break;
            }
          }
        }

        courseContext = `Course Title: "${course.title}"\nDescription: "${course.description}"\nCategory: ${course.category}`;
        if (currentLesson) {
          courseContext += `\nCurrent Lesson: "${currentLesson.title}"\nTranscript Summary: "${currentLesson.aiSummary || currentLesson.transcript}"`;
        }
      }
    }

    // Fetch or create chat history
    let chatRecord = await ChatHistory.findOne({ studentId, courseId: courseId || null });
    let historyText = '';
    if (chatRecord && chatRecord.messages.length > 0) {
      historyText = chatRecord.messages
        .slice(-6)
        .map((m) => `${m.role.toUpperCase()}: ${m.content}`)
        .join('\n');
    }

    // Generate AI Tutor answer
    const aiResponseText = await getAIChatTutorResponse(courseContext, historyText, message);

    // Save to ChatHistory
    if (!chatRecord) {
      chatRecord = new ChatHistory({
        studentId,
        courseId: courseId || null,
        messages: []
      });
    }

    chatRecord.messages.push({ role: 'user', content: message, timestamp: new Date() });
    chatRecord.messages.push({ role: 'ai', content: aiResponseText, timestamp: new Date() });
    await chatRecord.save();

    res.json({
      role: 'ai',
      content: aiResponseText,
      chatHistory: chatRecord.messages
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Summarize lesson transcript
// @route POST /api/ai/summarize-transcript
const summarizeTranscript = async (req, res) => {
  try {
    const { transcript, lessonTitle, courseId, lessonId } = req.body;

    if (!transcript) {
      return res.status(400).json({ message: 'Transcript text is required for summarization' });
    }

    const summaryData = await summarizeTranscriptAI(transcript, lessonTitle || 'Lesson');

    // Optionally save summary to Course lesson model
    if (courseId && lessonId) {
      const course = await Course.findById(courseId);
      if (course && course.modules) {
        for (const mod of course.modules) {
          const lesson = mod.lessons.id(lessonId);
          if (lesson) {
            lesson.aiSummary = summaryData.summary;
            lesson.transcript = transcript;
            await course.save();
            break;
          }
        }
      }
    }

    res.json(summaryData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc AI Course Recommendations for student
// @route GET /api/ai/recommendations/:userId
const getRecommendations = async (req, res) => {
  try {
    const studentId = req.params.userId || req.user._id;

    // Get user's enrolled courses to understand category preference
    const enrollments = await Enrollment.find({ studentId }).populate('courseId');
    const enrolledCategories = enrollments.map((e) => e.courseId?.category).filter(Boolean);

    const enrolledCourseIds = enrollments.map((e) => e.courseId?._id?.toString()).filter(Boolean);

    // Get published courses candidate pool
    const allCourses = await Course.find({ status: 'published' }).select('title category description thumbnail price averageRating level');

    const recommendedIds = await generateCourseRecommendationsAI(enrolledCategories, allCourses);

    // Filter courses matching recommended IDs, excluding already enrolled
    let recommendedCourses = allCourses.filter(
      (c) => recommendedIds.includes(c._id.toString()) && !enrolledCourseIds.includes(c._id.toString())
    );

    // If pool is empty, pick top rated courses
    if (recommendedCourses.length === 0) {
      recommendedCourses = allCourses
        .filter((c) => !enrolledCourseIds.includes(c._id.toString()))
        .slice(0, 3);
    }

    res.json(recommendedCourses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Run and AI Review Code Sandbox Script
// @route POST /api/ai/run-code
const runCode = async (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code) {
      return res.status(400).json({ message: 'Code content is required for execution' });
    }

    const result = await runAndReviewCodeAI(code, language || 'python');
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Auto-Fix & Format Code Script
// @route POST /api/ai/fix-code
const fixCode = async (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code) {
      return res.status(400).json({ message: 'Code content is required for fixing' });
    }

    const result = await fixAndFormatCodeAI(code, language || 'python');
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  generateQuiz,
  chatWithTutor,
  summarizeTranscript,
  getRecommendations,
  runCode,
  fixCode
};
