require("dotenv").config();
const mysql = require("mysql2/promise");

async function db() {
  return await mysql.createConnection({
    host: process.env.LOCALHOST,
    user: process.env.ROOT,
    password: process.env.PASSWORD,
  });
}

module.exports = db;
 