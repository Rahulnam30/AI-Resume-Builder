import { pool } from "../config/postgresdb.js";

const migrate = async () => {
  try {
    await pool.query(`
      ALTER TABLE user_profiles
      ADD COLUMN IF NOT EXISTS extra_links JSONB DEFAULT '[]'::jsonb;
    `);
    console.log("✅ extra_links column added to user_profiles");
  } catch (err) {
    console.error("❌ Migration failed:", err.message);
  } finally {
    await pool.end();
  }
};

migrate();
