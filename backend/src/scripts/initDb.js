const db = require('../config/db');

const initDb = async () => {
  try {
    console.log('Initializing database schema...');

    await db.query(`
      CREATE TABLE IF NOT EXISTS Users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('ADMIN', 'PM', 'MEMBER') DEFAULT 'MEMBER',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Users table initialized.');

    await db.query(`
      CREATE TABLE IF NOT EXISTS Projects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        status VARCHAR(50) DEFAULT 'ACTIVE',
        created_by_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (created_by_id) REFERENCES Users(id) ON DELETE CASCADE
      )
    `);
    console.log('Projects table initialized.');

    await db.query(`
      CREATE TABLE IF NOT EXISTS ProjectMembers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        project_id INT NOT NULL,
        user_id INT NOT NULL,
        UNIQUE KEY unique_member (project_id, user_id),
        FOREIGN KEY (project_id) REFERENCES Projects(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
      )
    `);
    console.log('ProjectMembers table initialized.');

    await db.query(`
      CREATE TABLE IF NOT EXISTS Tasks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        status ENUM('TODO', 'IN_PROGRESS', 'DONE') DEFAULT 'TODO',
        priority VARCHAR(50) DEFAULT 'MEDIUM',
        project_id INT NOT NULL,
        assigned_to_id INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (project_id) REFERENCES Projects(id) ON DELETE CASCADE,
        FOREIGN KEY (assigned_to_id) REFERENCES Users(id) ON DELETE SET NULL
      )
    `);
    console.log('Tasks table initialized.');

    console.log('Database initialization completed successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Error initializing database:', err);
    process.exit(1);
  }
};

initDb();