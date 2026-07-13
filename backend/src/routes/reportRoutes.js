const express = require('express');
const { getAdminSummary } = require('../controllers/reportController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.route('/admin-summary')
  .get(authorize('ADMIN'), getAdminSummary);

module.exports = router;
