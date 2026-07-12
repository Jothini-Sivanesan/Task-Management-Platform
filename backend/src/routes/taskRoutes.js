const express = require('express');
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
} = require('../controllers/taskController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// All task routes require authentication
router.use(protect);

router.route('/')
  .get(getTasks)
  .post(authorize('ADMIN', 'PM'), createTask);

router.route('/:id')
  .get(getTaskById)
  .put(updateTask) // Authorization handled in controller
  .delete(authorize('ADMIN', 'PM'), deleteTask);

module.exports = router;
