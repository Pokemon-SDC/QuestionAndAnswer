require('dotenv').config();
const { Pool } = require('pg');

const credentials = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

console.log (process.env.DB_DATABASE, 'db name');

// const credentials = {
//   user: 'brandonhsu',
//   host: 'localhost',
//   database: 'qanda2',
//   password: '',
//   port: '5432',
// };

const pool = new Pool(credentials);

module.exports = pool;
