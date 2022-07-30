/* eslint-disable camelcase */
/* eslint-disable import/extensions */
const pool = require('../pool.js');

/* set CRUD functions in this file
  return the query searches for each individual controller function

  getQuestion:
    query = (SELECT * from question WHERE product_id = )
*/

module.exports = {
  getAnswers(question_id, page, count) {
    return new Promise((resolve, reject) => {
      const pageNumber = page || 1;
      const countNumber = count || 5;

      let data = {
        question: question_id,
        page: pageNumber,
        count: countNumber,
        result: [],
      };
    });
  },

  addQuestion(product_id, body, name, email) {
    return new Promise((resolve, reject) => {
      const dateWritten = Math.floor(new Date().getTime());
      const queryStatement = 'INSERT INTO question (product_id, body, date_written, asker_name, asker_email, reported, helpful VALUES (?, ?, ?, ?, ?, ?, ?)';
      const queryArguments = [product_id, body, dateWritten, name, email, 0, 0];
      pool.query(queryStatement, queryArguments, (err, results) => {
        if (err) {
          reject(err);
        }
        resolve(results);
      });
    });
  },

  addAnswer(question_id, body, name, email) {
    return new Promise((resolve, reject) => {
      const dateWritten = Math.floor(new Date().getTime());
      const queryStatement = 'INSERT INTO answer(question_id, body, date_written, answerer_name, answerer_email, reported, helpful) VALUES (?, ?, ?, ?, ?, ?, ?)';
      const queryArguments = [question_id, body, dateWritten, name, email, 0, 0];
      pool.query(queryStatement, queryArguments, (err, results) => {
        if (err) {
          reject(err);
        }
        resolve(results);
      });
    });
  },

  helpfulQuestion(question_id) {
    return new Promise((resolve, reject) => {
      const queryStatement = `Update question SET helpfulness = helpfulness + 1 WHERE id = ${question_id};`;
      pool.query(queryStatement, (err, results) => {
        if (err) {
          reject(err);
        }
        resolve(results);
      });
    });
  },

  helpfulAnswer(answer_id) {
    return new Promise((resolve, reject) => {
      const queryStatement = `Update answer SET helpful = helpful + 1 WHERE answer_id = ${answer_id};`;
      pool.query(queryStatement, (err, results) => {
        if (err) {
          reject(err);
        }
        resolve(results);
      });
    });
  },

  reportQuestion(question_id) {
    return new Promise((resolve, reject) => {
      const queryStatement = `UPDATE question SET reported = 1 WHERE id = ${question_id};`;
      pool.query(queryStatement, (err, results) => {
        if (err) {
          reject(err);
        }
        resolve(results);
      });
    });
  },

  reportAnswer(answer_id) {
    return new Promise((resolve, reject) => {
      const queryStatement = `UPDATE answer SET reported = 1 WHERE answer_id = ${answer_id};`;
      pool.query(queryStatement, (err, results) => {
        if (err) {
          reject(err);
        }
        resolve(results);
      });
    });
  },
};