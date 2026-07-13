const db = require('../config/db');

const addColumn = async (table, column, definition) => {
  try {
    await db.query(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
    console.log(`Added ${column} to ${table}`);
  } catch (e) {
    if (e.code === 'ER_DUP_FIELDNAME') {
      console.log(`${column} already exists in ${table}`);
    } else {
      console.error(`Error adding ${column} to ${table}:`, e);
    }
  }
};

const alterDb = async () => {
  try {
    console.log('Altering database schema...');
    
    await addColumn('Projects', 'progress', 'INT DEFAULT 0');
    await addColumn('Projects', 'start_date', 'DATE');
    await addColumn('Projects', 'due_date', 'DATE');
    
    try {
      await db.query(`ALTER TABLE Projects MODIFY COLUMN status VARCHAR(50) DEFAULT 'Not Started'`);
      console.log('Modified Projects status column.');
    } catch (e) {
      console.error(e);
    }

    await addColumn('Tasks', 'due_date', 'DATE');

    console.log('Database alteration completed.');
    process.exit(0);
  } catch (err) {
    console.error('Error in alterDb:', err);
    process.exit(1);
  }
};

alterDb();
