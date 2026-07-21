const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');
const User = require('../models/User');
const QuizAttempt = require('../models/QuizAttempt');

// @desc Get student dashboard overview
// @route GET /api/dashboard/student
const getStudentDashboard = async (req, res) => {
  try {
    const studentId = req.user._id;

    const enrollments = await Enrollment.find({ studentId }).populate('courseId');
    const quizAttempts = await QuizAttempt.find({ studentId }).sort({ createdAt: -1 }).limit(5);

    const completedCoursesCount = enrollments.filter((e) => e.overallProgress >= 100).length;
    const activeCoursesCount = enrollments.filter((e) => e.overallProgress < 100).length;

    res.json({
      enrolledCount: enrollments.length,
      activeCoursesCount,
      completedCoursesCount,
      recentEnrollments: enrollments.slice(0, 4),
      recentQuizAttempts: quizAttempts
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get instructor dashboard stats
// @route GET /api/dashboard/instructor
const getInstructorDashboard = async (req, res) => {
  try {
    const instructorId = req.user._id;

    const courses = await Course.find({ instructorId });
    const courseIds = courses.map((c) => c._id);

    const enrollments = await Enrollment.find({ courseId: { $in: courseIds } }).populate('studentId', 'name email avatar');

    const totalStudents = new Set(enrollments.map((e) => e.studentId?._id?.toString())).size;
    const totalRevenue = courses.reduce((acc, course) => acc + (course.price * (course.enrolledStudents?.length || 0)), 0);

    const completionRate = enrollments.length > 0
      ? Math.round((enrollments.filter((e) => e.overallProgress >= 100).length / enrollments.length) * 100)
      : 0;

    res.json({
      totalCourses: courses.length,
      totalStudents,
      totalRevenue,
      completionRate,
      courses,
      recentEnrollments: enrollments.slice(0, 6)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get admin overall dashboard stats
// @route GET /api/dashboard/admin
const getAdminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalInstructors = await User.countDocuments({ role: 'instructor' });
    const totalCourses = await Course.countDocuments();
    const pendingCourses = await Course.countDocuments({ status: 'pending' });

    const allCourses = await Course.find();
    const totalPlatformRevenue = allCourses.reduce((acc, course) => acc + (course.price * (course.enrolledStudents?.length || 0)), 0);

    res.json({
      totalUsers,
      totalStudents,
      totalInstructors,
      totalCourses,
      pendingCourses,
      totalPlatformRevenue
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getStudentDashboard,
  getInstructorDashboard,
  getAdminDashboard
};
