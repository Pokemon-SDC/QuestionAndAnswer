/* eslint-disable import/extensions */
const express = require('express');
const controller = require('./controller.js');

const port = 3000;
const app = express();

// app.use(express.static('/../client/dist'));
app.use(express.json());

// list all the HTTP requests here, replace callback function with a
// function from the controller file

// POST routes
app.post('/question', controller.addQuestion);
app.post('/answer', controller.addAnswer);

// GET routes
app.get('/question', controller.getQuestions);
app.get('/answer', controller.getAnswers);
app.get('/photo', controller.getPhotos);

// PUT routes
app.put('/question', controller.helpfulQuestion);
app.put('/question', controller.reportQuestion);
app.put('/answer', controller.helpfulAnswer);
app.put('/answer', controller.reportAnswer);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
