const bcrypt = require('bcryptjs');
const db = require('../config/db');

const seedDb = async () => {
  try {
    console.log('Starting database seeding...');

    // Hash passwords
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('password123', salt);

    // Seed Users
    const usersData = [
      ['Admin User', 'admin@example.com', passwordHash, 'ADMIN', true],
      ['Sarah Manager', 'sarah@example.com', passwordHash, 'PM', true],
      ['John Manager', 'john@example.com', passwordHash, 'PM', true],
      ['Alice Worker', 'alice@example.com', passwordHash, 'MEMBER', true],
      ['Bob Builder', 'bob@example.com', passwordHash, 'MEMBER', true],
      ['Charlie Helper', 'charlie@example.com', passwordHash, 'MEMBER', true],
      ['Inactive User', 'inactive@example.com', passwordHash, 'MEMBER', false]
    ];

    for (const user of usersData) {
      await db.query(
        'INSERT IGNORE INTO Users (name, email, password, role, is_active) VALUES (?, ?, ?, ?, ?)',
        user
      );
    }
    console.log('Users seeded.');

    // Get inserted users
    const [users] = await db.query('SELECT id, email, role FROM Users');
    const getUserId = (email) => users.find(u => u.email === email)?.id;

    const sarahId = getUserId('sarah@example.com');
    const johnId = getUserId('john@example.com');
    const aliceId = getUserId('alice@example.com');
    const bobId = getUserId('bob@example.com');

    // Seed Projects
    if (sarahId && johnId) {
      const projectsData = [
        ['Website Redesign', 'Revamp the corporate website with new branding.', 'ACTIVE', sarahId, '2026-10-01'],
        ['Mobile App V2', 'Develop the second version of our iOS app.', 'ACTIVE', sarahId, '2026-12-15'],
        ['Backend Migration', 'Migrate from monolithic architecture to microservices.', 'ACTIVE', johnId, '2027-02-28']
      ];

      for (const project of projectsData) {
        await db.query(
          'INSERT INTO Projects (name, description, status, created_by_id, deadline) VALUES (?, ?, ?, ?, ?)',
          project
        );
      }
      console.log('Projects seeded.');

      // Get inserted projects
      const [projects] = await db.query('SELECT id, name FROM Projects');
      const getProjectId = (name) => projects.find(p => p.name === name)?.id;

      const websiteId = getProjectId('Website Redesign');
      const mobileId = getProjectId('Mobile App V2');
      const backendId = getProjectId('Backend Migration');

      // Seed Project Members
      if (websiteId && mobileId && backendId) {
        const membersData = [
          [websiteId, sarahId], [websiteId, aliceId], [websiteId, bobId],
          [mobileId, sarahId], [mobileId, aliceId],
          [backendId, johnId], [backendId, bobId]
        ];

        for (const member of membersData) {
          await db.query(
            'INSERT IGNORE INTO ProjectMembers (project_id, user_id) VALUES (?, ?)',
            member
          );
        }
        console.log('Project Members seeded.');

        // Seed Tasks
        const tasksData = [
          ['Design new logo', 'Create modern variants of the logo.', 'TODO', 'HIGH', websiteId, aliceId, '2026-08-10'],
          ['Implement homepage UI', 'Build React components for homepage.', 'IN_PROGRESS', 'MEDIUM', websiteId, bobId, '2026-08-20'],
          ['API setup for mobile', 'Create REST endpoints for the app.', 'TODO', 'HIGH', mobileId, aliceId, '2026-09-01'],
          ['Database refactoring', 'Optimize queries and add indexes.', 'DONE', 'MEDIUM', backendId, bobId, '2026-07-01']
        ];

        for (const task of tasksData) {
          await db.query(
            'INSERT INTO Tasks (title, description, status, priority, project_id, assigned_to_id, due_date) VALUES (?, ?, ?, ?, ?, ?, ?)',
            task
          );
        }
        console.log('Tasks seeded.');
      }
    }

    console.log('Database seeding completed successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seedDb();
