/* eslint-disable import/extensions */
const model = require('./model.js');

module.exports = {
  getQuestions(req, res) {
    res.send(console.log('GET QUESTION using controller'));
    // get the params to pass to the model getAllQuestions function
    // Get Questions requires product_id, page, count as parameters
    // Response is 200 status code
    res.status(200);
  },

  getAnswers(req, res) {
    res.send(console.log('GET ANSWER using controller'));
    // Get Answers requires question_id, page, count as parameters
    // Response is 200 status code
    res.status(200);
  },

  getPhotos(req, res) {
    res.send(console.log('GET PHOTOS using controller'));
  },

  addAnswer(req, res) {
    // Add Question requires PARAMETER question_id, BODY PARAMETERS body, name, email, photos
    const { question_id } = req.params;
    const { body, name, email, photos } = req.body;
    model.addAnswer(question_id, body, name, email, photos)
      .then((results) => {
        res.status(201);
        res.send(results); // do i really need to send back results or only the status code
      })
      .catch((err) => { res.status(500); });
    res.status(201);
  },

  addQuestion(req, res) {
    // Add Answer requires BODY PARAMETER product_id, body, name, email
    const { body, name, email, product_id } = req.body;
    model.addQuestion(product_id, body, name, email)
      .then((results) => {
        res.status(201);
        res.send(results); // do i really need to send back results or only the status code
      })
      .catch((err) => { res.status(500); });
  },

  helpfulQuestion(req, res) {
    // need to know how to get the question_id Parameter from req data
    const { question_id } = req.params;
    model.helpfulQuestion(question_id)
      .then((results) => {
        res.send(results);
        res.status(204); // do i really need to send back results or only the status code
      })
      .catch((err) => { res.status(500); });
  },

  reportQuestion(req, res) {
    // need to know how to get the question_id Parameter from req data
    const { question_id } = req.params;
    model.reportQuestion(question_id)
      .then((results) => {
        res.status(204);
        res.send(results); // do i really need to send back results or only the status code
      })
      .catch((err) => { res.status(500); });
  },

  helpfulAnswer(req, res) {
    // need to know how to get the answer_id Parameter from req data
    const { answer_id } = req.params;
    model.helpfulAnswer(answer_id)
      .then((results) => {
        res.send(results);
        res.status(204); // do i really need to send back results or only the status code
      })
      .catch((err) => { res.status(500); });
  },

  reportAnswer(req, res) {
    // need to know how to get the answer_id Parameter from req data
    const { answer_id } = req.params;
    model.reportAnswer(answer_id)
      .then((results) => {
        res.status(204);
        res.send(results); // do i really need to send back results or only the status code
      })
      .catch((err) => { res.status(500); });
  },
};
