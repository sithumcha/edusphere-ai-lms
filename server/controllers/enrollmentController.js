const mongoose = require('mongoose');
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const User = require('../models/User');
const Certificate = require('../models/Certificate');

// Sample Course Title Mapping
const SAMPLE_MAP = {
  c1: { title: 'Python for Financial Analysis & Algorithmic Trading', category: 'Data Science', thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80' },
  c2: { title: 'Advanced Design Systems: Scale Your UI Workflow', category: 'Design', thumbnail: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=600&auto=format&fit=crop&q=80' },
  c3: { title: 'AWS Certified Solutions Architect Associate 2024', category: 'Cloud Computing', thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80' },
  c4: { title: 'Strategic MBA Essentials: Business Strategy & Execution', category: 'Business', thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80' },
  'banner-genai': { title: 'Mastering Generative AI for Creative Professionals', category: 'AI ENHANCED', thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80' }
};

// @desc Enroll student in course
// @route POST /api/enrollments/:courseId
const enrollInCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const studentId = req.user._id;

    let course = null;
    if (mongoose.Types.ObjectId.isValid(courseId)) {
      course = await Course.findById(courseId);
    }

    if (!course) {
      // Find by title or create sample course on the fly
      const sampleInfo = SAMPLE_MAP[courseId] || {
        title: `Interactive Course (${courseId})`,
        category: 'Computer Science',
        thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80'
      };

      course = await Course.findOne({ title: sampleInfo.title });
      if (!course) {
        course = await Course.create({
          title: sampleInfo.title,
          category: sampleInfo.category,
          thumbnail: sampleInfo.thumbnail,
          description: 'Comprehensive interactive course module covering industry standards and practical hands-on projects.',
          instructorName: 'EduSphere Senior AI Specialist',
          price: 49.99,
          level: 'Intermediate',
          status: 'published',
          modules: [
            {
              title: 'Module 1: Foundations & Architecture',
              lessons: [
                { title: '1. Course Overview & Introduction', duration: '12:40', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
                { title: '2. Core Principles & Logic', duration: '18:15', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' }
              ]
            }
          ]
        });
      }
    }

    const targetCourseId = course._id;

    let enrollment = await Enrollment.findOne({ studentId, courseId: targetCourseId });
    if (!enrollment) {
      enrollment = await Enrollment.create({
        studentId,
        courseId: targetCourseId,
        progress: [],
        overallProgress: 0
      });

      if (!course.enrolledStudents.includes(studentId)) {
        course.enrolledStudents.push(studentId);
        await course.save();
      }

      await User.findByIdAndUpdate(studentId, {
        $addToSet: { enrolledCourses: targetCourseId }
      });
    }

    res.status(200).json({ message: 'Enrolled successfully', enrollment });
  } catch (error) {
    console.error('Enrollment controller error:', error);
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
