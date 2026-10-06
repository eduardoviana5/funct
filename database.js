//database.js
require('dotenv').config();
const mysql = require('mysql2/promise');
const pool = mysql.createPool({
host: process.env.DB_HOST,
user: process.env.DB_USER,
password: process.env.DB_PASSWORD,
database: process.env.DB_NAME,
waitForConnections: true
});
module.exports = pool;


// database.js
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

async function conectar() {
  const db = await open({
    filename: './banco.db',
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  return db;
}

module.exports = conectar();
