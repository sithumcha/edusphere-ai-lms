const express = require('express');
const router = express.Router();
const {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  addRating
} = require('../controllers/courseController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.get('/', getCourses);
router.get('/:id', getCourseById);
router.post('/', protect, authorizeRoles('instructor', 'admin'), createCourse);
router.put('/:id', protect, authorizeRoles('instructor', 'admin'), updateCourse);
router.delete('/:id', protect, authorizeRoles('instructor', 'admin'), deleteCourse);
router.post('/:id/ratings', protect, addRating);

module.exports = router;
