import { pool } from "./config/postgresdb.js";

async function createTable() {
  try {
    console.log("Creating password_resets table...");
    await pool.query(`
      CREATE TABLE IF NOT EXISTS password_resets (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        token VARCHAR(255) NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("password_resets table created successfully!");
  } catch (error) {
    console.error("Error creating password_resets table:", error);
  } finally {
    pool.end();
  }
}

createTable();
