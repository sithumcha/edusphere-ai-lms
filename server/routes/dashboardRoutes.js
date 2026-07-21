const express = require('express');
const router = express.Router();
const {
  getStudentDashboard,
  getInstructorDashboard,
  getAdminDashboard
} = require('../controllers/dashboardController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.get('/student', protect, getStudentDashboard);
router.get('/instructor', protect, authorizeRoles('instructor', 'admin'), getInstructorDashboard);
router.get('/admin', protect, authorizeRoles('admin'), getAdminDashboard);

module.exports = router;
