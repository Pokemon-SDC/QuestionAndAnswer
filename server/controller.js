/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
/* eslint-disable camelcase */
/* eslint-disable import/extensions */
const model = require('./model.js');

module.exports = {
  getQuestions(req, res) {
    const { product_id, page, count } = req.query;
    model.getQuestions(product_id, page, count)
      .then((results) => {
        res.status(200);
        res.send(results);
      })
      .catch((err) => { res.status(500); });
  },

  getAnswers(req, res) {
    const { page, count } = req.query;
    const { question_id } = req.params;
    model.getAnswers(question_id, page, count)
      .then((results) => {
        res.status(200);
        res.send(results);
      })
      .catch((err) => { res.status(500); });
  },

  addAnswer(req, res) {
    const { question_id } = req.params;
    const { body, name, email, photos } = req.body;
    model.addAnswer(question_id, body, name, email, photos)
      .then((results) => {
        res.status(201);
        res.send(results); // do i really need to send back results or only the status code
      })
      .catch((err) => { res.status(500); });
  },

  addQuestion(req, res) {
    const { body, name, email, product_id } = req.body;
    model.addQuestion(product_id, body, name, email)
      .then((results) => {
        res.status(201);
        res.send(results); // do i really need to send back results or only the status code
      })
      .catch((err) => { res.status(500); });
  },

  helpfulQuestion(req, res) {
    const { question_id } = req.params;
    model.helpfulQuestion(question_id)
      .then((results) => {
        res.send(results);
        res.status(204); // do i really need to send back results or only the status code
      })
      .catch((err) => { res.status(500); });
  },

  reportQuestion(req, res) {
    const { question_id } = req.params;
    model.reportQuestion(question_id)
      .then((results) => {
        res.status(204);
        res.send(results); // do i really need to send back results or only the status code
      })
      .catch((err) => { res.status(500); });
  },

  helpfulAnswer(req, res) {
    const { answer_id } = req.params;
    model.helpfulAnswer(answer_id)
      .then((results) => {
        res.send(results);
        res.status(204); // do i really need to send back results or only the status code
      })
      .catch((err) => { res.status(500); });
  },

  reportAnswer(req, res) {
    const { answer_id } = req.params;
    model.reportAnswer(answer_id)
      .then((results) => {
        res.status(204);
        res.send(results); // do i really need to send back results or only the status code
      })
      .catch((err) => { res.status(500); });
  },
};
