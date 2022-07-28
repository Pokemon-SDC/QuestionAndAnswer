const express = require('express');
// const controller = require('./controller.js');

const app = express();

// app.use(express.static('/../client/dist'));
app.use(express.json());

// list all the HTTP requests here, replace callback function with a
// function from the controller file

// POST routes
app.post('/question', function (req, res) {
  res.send(console.log('able to post information'));
});

// GET route
app.get('/question', function (req, res) {
  res.status(200)
  res.send (console.log('getting question'))
});

const port = 3000;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});
