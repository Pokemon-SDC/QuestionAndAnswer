/* eslint-disable guard-for-in */
/* eslint-disable camelcase */
/* eslint-disable import/extensions */
const pool = require('../pool.js');

module.exports = {
  getQuestions(product_id, page, count) {
    return new Promise((resolve, reject) => {
      const pageNumber = page || 1;
      const countNumber = count || 5;
      const productID = product_id;
      const offset = (pageNumber - 1) * countNumber;

      const data = {
        product_id: productID.toString(),
        results: [],
      };

      const queryStatement = `SELECT question.id, question.body, question.date_written, question.asker_name, question.helpfulness, question.reported,
      (SELECT (json_object_agg(answer.answer_id, json_build_object('id', answer.answer_id, 'body', answer.body, 'date', answer.date_written, 'answerer_name', answer.answerer_name, 'helpfulness', answer.helpful,
      'photos', (SELECT (array_agg(json_build_object('id', photo.id, 'photo_url', photo.photo_url))) FROM photo WHERE answer.answer_id = photo.answer_id))))
      FROM answer WHERE answer.question_id = question.id)
      AS answers
      FROM question
      WHERE question.product_id = ${productID} AND question.reported = false`;

      pool.query(queryStatement, (err, rowData) => {
        if (err) {
          return reject(err);
        }
        data.results = rowData.rows;

        data.results.forEach((point) => {
          point.date_written = new Date(Number(point.date_written)).toISOString();
          // eslint-disable-next-line no-restricted-syntax
          for (var key in point.answers) {
            point.answers[key].date = new Date(Number(point.answers[key].date)).toISOString();
            if (point.answers[key].photos === null) {
              point.answers[key].photos = [];
            }
          }});
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
        results: [],
      };

      const queryStatement = `SELECT answer.answer_id, answer.body, answer.date_written, answer.answerer_name, answer.helpful, (SELECT (array_agg(json_build_object('id', photo.id, 'url', photo.photo_url))) FROM photo WHERE answer.answer_id = photo.answer_id) AS photos FROM answer WHERE answer.reported = false AND answer.question_id = ${questionID};`;
      pool.query(queryStatement, (err, rowData) => {
        if (err) {
          return reject(err);
        }

        data.results = rowData.rows;

        for (let i = 0; i < rowData.rows.length; i++) {
          // eslint-disable-next-line max-len
          rowData.rows[i].date_written = new Date(Number(rowData.rows[i].date_written)).toISOString();
        }

        resolve(data);
      });
    });
  },

  addQuestion(product_id, body, name, email) {
    return new Promise((resolve, reject) => {
      const dateWritten = Math.floor(new Date().getTime());
      const queryStatement = 'INSERT INTO question (product_id, body, date_written, asker_name, asker_email, reported, helpfulness) VALUES ($1, $2, $3, $4, $5, $6, $7);';
      const queryArguments = [product_id, body, dateWritten, name, email, false, 0];
      pool.query(queryStatement, queryArguments, (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  },

  addAnswer(question_id, body, name, email) {
    return new Promise((resolve, reject) => {
      const dateWritten = Math.floor(new Date().getTime());
      const queryStatement = 'INSERT INTO answer(question_id, body, date_written, answerer_name, answerer_email, reported, helpful) VALUES ($1, $2, $3, $4, $5, $6, $7)';
      const queryArguments = [question_id, body, dateWritten, name, email, false, 0];
      pool.query(queryStatement, queryArguments, (err, results) => {
        if (err) {
          reject(err);
        }
        return resolve(results);
      });
    });
  },

  helpfulQuestion(question_id) {
    return new Promise((resolve, reject) => {
      const queryStatement = `Update question SET helpfulness = helpfulness + 1 WHERE id = ${question_id};`;
      pool.query(queryStatement, (err, results) => {
        if (err) {
          return reject(err);
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
          return reject(err);
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
          return reject(err);
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
          return reject(err);
        }
        resolve(results);
      });
    });
  },
};
