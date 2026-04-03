import pg from "pg";
import dotenv from "dotenv";
import dns from 'dns';


dns.setDefaultResultOrder('ipv4first');

dotenv.config();


const { Pool } = pg;

export const pool = new  Pool({
    connectionString : process.env.POSTGRESQL_URI,
    max: 10, // Limit active connections to prevent Supabase MaxClientsInSessionMode error
    idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
    connectionTimeoutMillis: 5000,
});


const connectDB = async () => {
  try {
    if (!process.env.POSTGRESQL_URI) {
      console.error("❌ PostgreSQL URI is missing in .env file");
      return;
    }

    const client = await pool.connect();
    console.log("✅ PostgreSQL connected");
    client.release();
  } catch (error) {
    console.error("❌ PostgreSQL connection failed:", error.message);
    console.log("⚠️ Server will continue without database connection");
  }
};

export default connectDB;
