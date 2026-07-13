const db = require('../config/db');

const getUsers = async (req, res) => {
  try {
    const { search } = req.query;
    let query = 'SELECT id, name, email, role, is_active, created_at FROM Users';
    const params = [];

    if (search) {
      query += ' WHERE name LIKE ? OR email LIKE ?';
      params.push(`%${search}%`, `%${search}%`);
    }

    const [users] = await db.query(query, params);
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, email, role, is_active } = req.body;
    const userId = req.params.id;

    // Validate role if it is being updated
    if (role && !['ADMIN', 'PM', 'MEMBER'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    // Fetch existing user
    const [users] = await db.query('SELECT * FROM Users WHERE id = ?', [userId]);
    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    const user = users[0];

    const updatedName = name !== undefined ? name : user.name;
    const updatedEmail = email !== undefined ? email : user.email;
    const updatedRole = role !== undefined ? role : user.role;
    const updatedIsActive = is_active !== undefined ? is_active : user.is_active;

    const [result] = await db.query(
      'UPDATE Users SET name = ?, email = ?, role = ?, is_active = ? WHERE id = ?', 
      [updatedName, updatedEmail, updatedRole, updatedIsActive, userId]
    );

    res.json({ message: 'User updated successfully' });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'Email already exists' });
    }
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const [result] = await db.query('DELETE FROM Users WHERE id = ?', [userId]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getUsers, updateUser, deleteUser };