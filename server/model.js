/* eslint-disable camelcase */
/* eslint-disable import/extensions */
const pool = require('../pool.js');

/* set CRUD functions in this file
  return the query searches for each individual controller function

  getQuestion:
    query = (SELECT * from question WHERE product_id = )
*/

module.exports = {
  getQuestions(product_id, page, count) {
    return new Promise((resolve, reject) => {
      const pageNumber = page || 1;
      const countNumber = count || 5;
      const productID = product_id;
      const offset = (pageNumber - 1) * countNumber;

      const data = {
        product_id: productID,
        results: [],
      };

      const queryStatement = `SELECT question.id, question.body, question.date_written, question.asker_name, question.helpfulness, question.reported,
      (SELECT (json_object_agg(answer.answer_id, json_build_object('id', answer.answer_id, 'body', answer.body, 'date', answer.date_written, 'answerer_name', answer.answerer_name, 'helpfulness', answer.helpful,
      'photos', (SELECT (array_agg(json_build_object('id', photo.id, 'photo_url', photo.photo_url))) FROM photo WHERE answer.answer_id = photo.answer_id))))
      FROM answer WHERE answer.question_id = question.id)
      AS answers
      FROM question
      WHERE question.product_id = ${productID} AND question.reported = false
      ORDER BY question.question_helpfulness
      DESC LIMIT ${countNumber}
      OFFSET ${offset};`;

      pool.query(queryStatement, (err, results) => {
        if (err) {
          reject(err);
        }
        data.results = results.rows;
        resolve(data);
      });
    });
  },

  getAnswers(question_id, page, count) {
    return new Promise((resolve, reject) => {
      const pageNumber = page || 1;
      const countNumber = count || 5;
      const questionID = question_id;
      const offset = (pageNumber - 1) * countNumber;

      const data = {
        question: question_id,
        page: pageNumber,
        count: countNumber,
        result: [],
      };

      const queryStatement = `SELECT answer.answer_id, answer.body, answer.date_written, answer.answerer_name, answer.helpful, (SELECT (array_agg(json_build_object('id', photo.id, 'url', photo.photo_url))) FROM photo WHERE answer.answer_id = photo.answer_id) AS photos FROM answer WHERE answer.reported = false AND answer.question_id = ${questionID}, ORDER BY DESC LIMIT ${countNumber} OFFSET ${offset};`;
      pool.query(queryStatement, (err, results) => {
        if (err) {
          reject(err);
        }
        data.results = results.rows;
        resolve(data);
      });
    });
  },

  addQuestion(product_id, body, name, email) {
    return new Promise((resolve, reject) => {
      const dateWritten = Math.floor(new Date().getTime());
      const queryStatement = 'INSERT INTO question (product_id, body, date_written, asker_name, asker_email, reported, helpfulness) VALUES (?, ?, ?, ?, ?, ?, ?);';
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
      const queryStatement = 'INSERT INTO answer(question_id, body, date_written, answerer_name, answerer_email, reported, helpful) VALUES (?, ?, ?, ?, ?, ?, ?);';
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
      const queryStatement = `UPDATE question SET reported = true WHERE id = ${question_id};`;
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
      const queryStatement = `UPDATE answer SET reported = true WHERE answer_id = ${answer_id};`;
      pool.query(queryStatement, (err, results) => {
        if (err) {
          reject(err);
        }
        resolve(results);
      });
    });
  },
};
