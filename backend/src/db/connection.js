const Database = require('better-sqlite3');
const path = require('path');
require('dotenv').config();

const dbPath = process.env.DATABASE_PATH || path.resolve(__dirname, '../../data/educacore.sqlite');

const db = new Database(dbPath, { verbose: console.log });
db.pragma('journal_mode = WAL');

module.exports = db;
