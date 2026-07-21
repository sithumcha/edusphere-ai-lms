const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const User = require('../models/User');
const Certificate = require('../models/Certificate');

// @desc Enroll student in course
// @route POST /api/enrollments/:courseId
const enrollInCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const studentId = req.user._id;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    let enrollment = await Enrollment.findOne({ studentId, courseId });
    if (!enrollment) {
      enrollment = await Enrollment.create({
        studentId,
        courseId,
        progress: [],
        overallProgress: 0
      });

      // Push to Course & User schemas
      if (!course.enrolledStudents.includes(studentId)) {
        course.enrolledStudents.push(studentId);
        await course.save();
      }

      await User.findByIdAndUpdate(studentId, {
        $addToSet: { enrolledCourses: courseId }
      });
    }

    res.status(200).json({ message: 'Enrolled successfully', enrollment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get student's enrolled courses with course details & progress
// @route GET /api/enrollments/my-courses
const getMyEnrolledCourses = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ studentId: req.user._id })
      .populate('courseId')
      .sort({ updatedAt: -1 });

    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update lesson progress (mark complete)
// @route PUT /api/enrollments/:id/progress
const updateLessonProgress = async (req, res) => {
  try {
    const { lessonId, completed } = req.body;
    const courseId = req.params.id;
    const studentId = req.user._id;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    let enrollment = await Enrollment.findOne({ studentId, courseId });
    if (!enrollment) {
      enrollment = await Enrollment.create({
        studentId,
        courseId,
        progress: [{ lessonId, completed: true, completedAt: new Date() }],
        overallProgress: 0
      });
    } else {
      const existingLessonIndex = enrollment.progress.findIndex(
        (p) => p.lessonId === lessonId
      );

      if (existingLessonIndex > -1) {
        enrollment.progress[existingLessonIndex].completed = completed !== undefined ? completed : true;
        enrollment.progress[existingLessonIndex].completedAt = new Date();
      } else {
        enrollment.progress.push({
          lessonId,
          completed: true,
          completedAt: new Date()
        });
      }
    }

    // Calculate total lessons in course
    let totalLessonsCount = 0;
    if (course.modules && course.modules.length > 0) {
      course.modules.forEach((mod) => {
        if (mod.lessons) totalLessonsCount += mod.lessons.length;
      });
    }

    if (totalLessonsCount > 0) {
      const completedCount = enrollment.progress.filter((p) => p.completed).length;
      enrollment.overallProgress = Math.min(100, Math.round((completedCount / totalLessonsCount) * 100));
    } else {
      enrollment.overallProgress = 100;
    }

    // Auto issue certificate on 100% completion
    if (enrollment.overallProgress >= 100 && !enrollment.certificateIssued) {
      enrollment.certificateIssued = true;
      const certId = `CERT-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
      enrollment.certificateId = certId;

      await Certificate.create({
        certificateId: certId,
        studentId,
        studentName: req.user.name,
        courseId,
        courseTitle: course.title,
        instructorName: course.instructorName || 'LMS Instructor',
        issueDate: new Date()
      });
    }

    await enrollment.save();
    res.json(enrollment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get certificate details
// @route GET /api/enrollments/certificates/:certificateId
const getCertificate = async (req, res) => {
  try {
    const cert = await Certificate.findOne({ certificateId: req.params.certificateId });
    if (cert) {
      res.json(cert);
    } else {
      res.status(404).json({ message: 'Certificate not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get student's all earned certificates
// @route GET /api/enrollments/my-certificates
const getMyCertificates = async (req, res) => {
  try {
    const certs = await Certificate.find({ studentId: req.user._id }).sort({ createdAt: -1 });
    res.json(certs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  enrollInCourse,
  getMyEnrolledCourses,
  updateLessonProgress,
  getCertificate,
  getMyCertificates
};
