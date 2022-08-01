const { Pool } = require('pg');

const credentials = {
  user: 'brandonhsu',
  host: 'localhost',
  database: 'qanda2',
  password: '',
  port: '5432',
};

const pool = new Pool(credentials);

module.exports = pool;
