const express = require('express');
const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject
} = require('../controllers/projectController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// All project routes require authentication
router.use(protect);

router.route('/')
  .get(getProjects)
  .post(authorize('ADMIN', 'PM'), createProject);

router.route('/:id')
  .get(getProjectById)
  .put(authorize('ADMIN', 'PM'), updateProject)
  .delete(authorize('ADMIN', 'PM'), deleteProject);

module.exports = router;
