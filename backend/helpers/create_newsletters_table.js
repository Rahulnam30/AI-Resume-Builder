import { pool } from "../config/postgresdb.js";

async function createNewslettersTable() {
  try {
    console.log("Creating newsletters table...");
    await pool.query(`
      CREATE TABLE IF NOT EXISTS newsletters (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("newsletters table created!");
  } catch (error) {
    console.error("Error creating newsletters table:", error);
  } finally {
    pool.end();
  }
}

createNewslettersTable();
