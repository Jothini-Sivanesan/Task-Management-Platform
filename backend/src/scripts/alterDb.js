const db = require('../config/db');

const alterDb = async () => {
  try {
    console.log('Altering Users table to add is_active column...');
    await db.query(`
      ALTER TABLE Users
      ADD COLUMN is_active BOOLEAN DEFAULT TRUE
    `);
    console.log('Successfully added is_active column.');
  } catch (err) {
    if (err.code === 'ER_DUP_FIELDNAME') {
      console.log('Column is_active already exists.');
    } else {
      console.error('Error altering table:', err);
    }
  }

  try {
    console.log('Altering Projects table to add deadline column...');
    await db.query(`
      ALTER TABLE Projects
      ADD COLUMN deadline DATE
    `);
    console.log('Successfully added deadline column.');
  } catch (err) {
    if (err.code === 'ER_DUP_FIELDNAME') {
      console.log('Column deadline already exists.');
    } else {
      console.error('Error altering table:', err);
    }
  }

  try {
    console.log('Altering Tasks table to add due_date column...');
    await db.query(`
      ALTER TABLE Tasks
      ADD COLUMN due_date DATE
    `);
    console.log('Successfully added due_date column.');
  } catch (err) {
    if (err.code === 'ER_DUP_FIELDNAME') {
      console.log('Column due_date already exists.');
    } else {
      console.error('Error altering table:', err);
    }
  }

  process.exit(0);
};

alterDb();
