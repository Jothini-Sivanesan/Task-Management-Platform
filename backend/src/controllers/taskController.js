const db = require('../config/db');

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private (Admin or PM)
const createTask = async (req, res) => {
  try {
    const { title, description, project_id, assigned_to_id, status, priority } = req.body;

    if (!title || !project_id) {
      return res.status(400).json({ message: 'Title and project_id are required' });
    }

    // Check if project exists and user has permission
    const [projects] = await db.query('SELECT * FROM Projects WHERE id = ?', [project_id]);
    if (projects.length === 0) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (req.user.role !== 'ADMIN' && projects[0].created_by_id !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to add tasks to this project' });
    }

    const [result] = await db.query(
      'INSERT INTO Tasks (title, description, project_id, assigned_to_id, status, priority) VALUES (?, ?, ?, ?, ?, ?)',
      [title, description || '', project_id, assigned_to_id || null, status || 'TODO', priority || 'MEDIUM']
    );

    res.status(201).json({
      id: result.insertId,
      title,
      description,
      project_id,
      assigned_to_id,
      status: status || 'TODO',
      priority: priority || 'MEDIUM'
    });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all tasks (filtered by user access)
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
  try {
    let query = '';
    let params = [];

    // Admin sees all. Others see tasks in projects they belong to.
    if (req.user.role === 'ADMIN') {
      query = 'SELECT * FROM Tasks';
    } else {
      query = `
        SELECT t.* FROM Tasks t
        JOIN ProjectMembers pm ON t.project_id = pm.project_id
        WHERE pm.user_id = ?
      `;
      params = [req.user.id];
    }

    const [tasks] = await db.query(query, params);
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single task by ID
// @route   GET /api/tasks/:id
// @access  Private
const getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const [tasks] = await db.query('SELECT * FROM Tasks WHERE id = ?', [taskId]);

    if (tasks.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(tasks[0]);
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
  try {
    const { title, description, status, priority, assigned_to_id } = req.body;
    const taskId = req.params.id;

    const [tasks] = await db.query('SELECT * FROM Tasks WHERE id = ?', [taskId]);
    if (tasks.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const task = tasks[0];

    // Access control: Members can only update status of tasks assigned to them. PMs/Admins can update anything.
    if (req.user.role === 'MEMBER') {
      if (task.assigned_to_id !== req.user.id) {
        return res.status(403).json({ message: 'Not authorized to update this task' });
      }
      // Members can only update status
      await db.query('UPDATE Tasks SET status = ? WHERE id = ?', [status || task.status, taskId]);
    } else {
      // PM or Admin can update all fields
      await db.query(
        'UPDATE Tasks SET title = ?, description = ?, status = ?, priority = ?, assigned_to_id = ? WHERE id = ?',
        [
          title || task.title,
          description || task.description,
          status || task.status,
          priority || task.priority,
          assigned_to_id !== undefined ? assigned_to_id : task.assigned_to_id,
          taskId
        ]
      );
    }

    res.json({ message: 'Task updated successfully' });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private (Admin or PM)
const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    const [tasks] = await db.query('SELECT * FROM Tasks WHERE id = ?', [taskId]);
    if (tasks.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Access control: Only Admins or PMs of the project can delete
    const [projects] = await db.query('SELECT * FROM Projects WHERE id = ?', [tasks[0].project_id]);
    
    if (req.user.role !== 'ADMIN') {
      if (req.user.role !== 'PM' || (projects.length > 0 && projects[0].created_by_id !== req.user.id)) {
        return res.status(403).json({ message: 'Not authorized to delete this task' });
      }
    }

    await db.query('DELETE FROM Tasks WHERE id = ?', [taskId]);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
};
