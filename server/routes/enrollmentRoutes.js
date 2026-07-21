const express = require('express');
const router = express.Router();
const {
  enrollInCourse,
  getMyEnrolledCourses,
  updateLessonProgress,
  getCertificate,
  getMyCertificates
} = require('../controllers/enrollmentController');
const { protect } = require('../middleware/authMiddleware');

router.post('/:courseId', protect, enrollInCourse);
router.get('/my-courses', protect, getMyEnrolledCourses);
router.put('/:id/progress', protect, updateLessonProgress);
router.get('/my-certificates', protect, getMyCertificates);
router.get('/certificates/:certificateId', getCertificate);

module.exports = router;
