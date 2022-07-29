const { Pool } = require('pg');

const credentials = {
  user: 'brandonhsu',
  host: 'localhost',
  database: 'qanda2',
  // password: '',
  port: '5432',
};

const pool = new Pool(credentials);

// pool.connect((err, client, done) => {
//   if (err) {
//     console.log('ERROR CONNECTING TO POOL');
//   }
//   console.log('connected to pool!');
// });

module.export.pool = pool;
