const db = require('../config/db');

// @desc    Create a new project
// @route   POST /api/projects
// @access  Private/Admin or PM
const createProject = async (req, res) => {
  try {
    const { name, description, status, progress, start_date, due_date } = req.body;
    const createdById = req.user.id;

    if (!name) {
      return res.status(400).json({ message: 'Project name is required' });
    }

    const [result] = await db.query(
      'INSERT INTO Projects (name, description, status, progress, start_date, due_date, created_by_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, description || '', status || 'Active', progress || 0, start_date || null, due_date || null, createdById]
    );

    // Automatically add the creator as a project member
    await db.query(
      'INSERT INTO ProjectMembers (project_id, user_id) VALUES (?, ?)',
      [result.insertId, createdById]
    );

    res.status(201).json({ id: result.insertId, name, description, status, progress, start_date, due_date, created_by_id: createdById });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all projects
// @route   GET /api/projects
// @access  Private
const getProjects = async (req, res) => {
  try {
    let query = '';
    let params = [];

    // Admin can see all projects. Others see projects they are members of.
    if (req.user.role === 'ADMIN') {
      query = `
        SELECT p.*, u.name AS manager_name, 
        (SELECT COUNT(*) FROM ProjectMembers pm2 WHERE pm2.project_id = p.id) AS member_count
        FROM Projects p
        LEFT JOIN Users u ON p.created_by_id = u.id
      `;
    } else {
      query = `
        SELECT p.*, u.name AS manager_name,
        (SELECT COUNT(*) FROM ProjectMembers pm2 WHERE pm2.project_id = p.id) AS member_count
        FROM Projects p
        JOIN ProjectMembers pm ON p.id = pm.project_id
        LEFT JOIN Users u ON p.created_by_id = u.id
        WHERE pm.user_id = ?
      `;
      params = [req.user.id];
    }

    const [projects] = await db.query(query, params);
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single project by ID
// @route   GET /api/projects/:id
// @access  Private
const getProjectById = async (req, res) => {
  try {
    const projectId = req.params.id;
    const [projects] = await db.query('SELECT * FROM Projects WHERE id = ?', [projectId]);

    if (projects.length === 0) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(projects[0]);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private/Admin or PM
const updateProject = async (req, res) => {
  try {
    const { name, description, status, progress, start_date, due_date } = req.body;
    const projectId = req.params.id;

    // Check if project exists and user has permission
    const [projects] = await db.query('SELECT * FROM Projects WHERE id = ?', [projectId]);
    if (projects.length === 0) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (req.user.role !== 'ADMIN' && projects[0].created_by_id !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this project' });
    }

    await db.query(
      'UPDATE Projects SET name = ?, description = ?, status = ?, progress = ?, start_date = ?, due_date = ? WHERE id = ?',
      [
        name || projects[0].name, 
        description || projects[0].description, 
        status || projects[0].status,
        progress !== undefined ? progress : projects[0].progress,
        start_date !== undefined ? start_date : projects[0].start_date,
        due_date !== undefined ? due_date : projects[0].due_date,
        projectId
      ]
    );

    res.json({ message: 'Project updated successfully' });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private/Admin or PM
const deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id;

    const [projects] = await db.query('SELECT * FROM Projects WHERE id = ?', [projectId]);
    if (projects.length === 0) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (req.user.role !== 'ADMIN' && projects[0].created_by_id !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this project' });
    }

    await db.query('DELETE FROM Projects WHERE id = ?', [projectId]);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject
};
