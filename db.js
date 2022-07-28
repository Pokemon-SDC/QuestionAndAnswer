const mongoose = require('mongoose');

// 1. Use mongoose to establish a connection to MongoDB
mongoose.connect('mongodb://localhost/qanda');

// 2. Set up any schema and models needed by the app
const questionSchema = new mongoose.Schema({
  product_id: { type: Number, required: true },
  question_id: { type: Number, unique: true, required: true },
  question_body: { type: String, required: true },
  question_date: { type: String, required: true },
  asker_name: { type: String, required: true },
  question_helpfulness: { type: Number, required: true },
  report: { type: Boolean, required: true },
  email: { type: String, required: true },
});

const answerSchema = new mongoose.Schema({
  question_id: { type: Number, unique: true, required: true },
  answer_id: { type: Number, unique: true, required: true },
  answer_body: { type: String, required: true },
  answer_date: { type: String, required: true },
  asker_name: { type: String, required: true },
  answer_helpfulness: { type: Number, required: true },
  report: { type: String, required: true },
  email: { type: String, required: true },
});

const photoSchema = new mongoose.Schema({
  answer_id: { type: Number, unique: true, required: true },
  photos: { type: [String], required: true },
});

const Question = mongoose.model('Entry', questionSchema);
const Answer = mongoose.model('Entry', answerSchema);
const Photo = mongoose.model('Entry', photoSchema);
