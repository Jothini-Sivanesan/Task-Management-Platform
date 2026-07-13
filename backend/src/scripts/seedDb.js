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
      // Clear existing projects and tasks first
      await db.query('DELETE FROM Tasks');
      await db.query('DELETE FROM ProjectMembers');
      await db.query('DELETE FROM Projects');

      const dummyProjects = [
        { name: 'Website Redesign', description: 'UI/UX design and development', status: 'In Progress', progress: 75, start_date: '2025-01-01', due_date: '2025-07-20', managerId: sarahId },
        { name: 'Mobile App Development', description: 'Android and iOS application', status: 'In Progress', progress: 60, start_date: '2025-02-15', due_date: '2025-08-15', managerId: johnId },
        { name: 'Marketing Campaign', description: 'Q3 digital marketing campaign', status: 'At Risk', progress: 40, start_date: '2025-03-01', due_date: '2025-06-30', managerId: sarahId },
        { name: 'Internal Dashboard', description: 'Admin dashboard for analytics', status: 'On Track', progress: 90, start_date: '2025-01-10', due_date: '2025-07-10', managerId: johnId },
        { name: 'Customer Portal', description: 'Self-service portal for clients', status: 'On Hold', progress: 25, start_date: '2025-04-01', due_date: '2025-09-30', managerId: sarahId },
        { name: 'API Integration', description: 'Third-party payment gateway', status: 'In Progress', progress: 55, start_date: '2025-05-01', due_date: '2025-08-25', managerId: johnId },
        { name: 'Security Audit', description: 'Annual security assessment', status: 'On Track', progress: 15, start_date: '2025-06-01', due_date: '2025-07-05', managerId: sarahId },
        { name: 'Cloud Migration', description: 'AWS infrastructure setup', status: 'In Progress', progress: 80, start_date: '2024-11-01', due_date: '2025-07-15', managerId: johnId }
      ];

      for (const p of dummyProjects) {
        const [res] = await db.query(
          'INSERT INTO Projects (name, description, status, progress, start_date, due_date, created_by_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [p.name, p.description, p.status, p.progress, p.start_date, p.due_date, p.managerId]
        );
        
        const projectId = res.insertId;

        // Add to ProjectMembers
        await db.query('INSERT INTO ProjectMembers (project_id, user_id) VALUES (?, ?)', [projectId, p.managerId]);
        if (aliceId) await db.query('INSERT INTO ProjectMembers (project_id, user_id) VALUES (?, ?)', [projectId, aliceId]);
        if (bobId) await db.query('INSERT INTO ProjectMembers (project_id, user_id) VALUES (?, ?)', [projectId, bobId]);

        // Insert some tasks for this project
        const dummyTasks = [
          { title: `Design phase - ${p.name}`, description: 'Initial designs', status: 'DONE', priority: 'HIGH', due_date: '2025-06-01' },
          { title: `Development - ${p.name}`, description: 'Core implementation', status: 'IN_PROGRESS', priority: 'MEDIUM', due_date: '2025-07-10' },
          { title: `Testing - ${p.name}`, description: 'QA and testing', status: 'TODO', priority: 'LOW', due_date: '2025-08-01' }
        ];

        for (const t of dummyTasks) {
          await db.query(
            'INSERT INTO Tasks (title, description, status, priority, due_date, project_id, assigned_to_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [t.title, t.description, t.status, t.priority, t.due_date, projectId, p.managerId]
          );
        }
      }
      console.log('Seeded 8 projects and related tasks.');
    }

    console.log('Database seeding completed successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seedDb();
