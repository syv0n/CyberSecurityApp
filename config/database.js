const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to Postgres database");
  } catch (err) {
    console.error("Database connection error:", err);
  }
}

module.exports = {
  db: client, // Export the client for use in models
  connectDB
};