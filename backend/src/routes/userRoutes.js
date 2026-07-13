const express = require('express');
const { getUsers, updateUser, deleteUser } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

// PMs and Admins can get users (to assign members), but only Admins can manage them
router.route('/')
  .get(authorize('ADMIN', 'PM'), getUsers);

router.route('/:id')
  .put(authorize('ADMIN'), updateUser)
  .delete(authorize('ADMIN'), deleteUser);

module.exports = router;