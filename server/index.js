/* eslint-disable import/extensions */
require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');
const controller = require('./controller.js');

// const port = 3000;
const port = process.env.PORT || 3000;
const app = express();

// app.use(express.static('/../client/dist'));
app.use(express.json());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// POST routes
app.post('/qa/questions', controller.addQuestion);
app.post('/qa/questions/:question_id/answers', controller.addAnswer);

// GET routes
app.get('/qa/questions', controller.getQuestions);
app.get('/qa/questions/:question_id/answers', controller.getAnswers);

// PUT routes
app.put('/qa/questions/:question_id/helpful', controller.helpfulQuestion);
app.put('/qa/questions/:question_id/report', controller.reportQuestion);
app.put('/qa/answers/:answer_id/helpful', controller.helpfulAnswer);
app.put('/qa/answers/:answer_id/report', controller.reportAnswer);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
