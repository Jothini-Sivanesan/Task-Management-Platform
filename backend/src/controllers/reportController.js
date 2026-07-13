const db = require('../config/db');

const getAdminSummary = async (req, res) => {
  try {
    const [usersResult] = await db.query('SELECT COUNT(*) as totalUsers FROM Users');
    const [projectsResult] = await db.query('SELECT COUNT(*) as activeProjects FROM Projects WHERE status = "ACTIVE"');

    res.json({
      totalUsers: usersResult[0].totalUsers,
      activeProjects: projectsResult[0].activeProjects
    });
  } catch (error) {
    console.error('Error fetching admin summary:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAdminSummary
};
