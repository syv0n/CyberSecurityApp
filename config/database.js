const mysql = require('mysql2/promise');
require('dotenv').config();

const client = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function connectDB() {
  try {
    await client.getConnection();
    console.log("Connected to MySQL database");
  } catch (err) {
    console.error("Database connection error:", err);
  }
}

module.exports = {
  db: client, // Export the client for use in models
  connectDB
};