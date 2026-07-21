const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  toggleBlockUser,
  deleteUser,
  getPendingCourses,
  updateCourseStatus
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.use(protect);
router.use(authorizeRoles('admin'));

router.get('/users', getAllUsers);
router.put('/users/:id/block', toggleBlockUser);
router.delete('/users/:id', deleteUser);
router.get('/courses/pending', getPendingCourses);
router.put('/courses/:id/status', updateCourseStatus);

module.exports = router;
