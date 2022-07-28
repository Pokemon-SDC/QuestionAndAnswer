CREATE TABLE question (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  body TEXT NOT NULL,
  date_written TEXT NOT NULL,
  asker_name TEXT NOT NULL,
  asker_email TEXT NOT NULL,
  reported BOOLEAN NOT NULL,
  helpfulness INTEGER NOT NULL
);

CREATE TABLE answer (
  answer_id SERIAL PRIMARY KEY,
  question_id INTEGER NOT NULL REFERENCES question (id),
  body TEXT NOT NULL,
  date_written TEXT NOT NULL,
  answerer_name TEXT NOT NULL,
  answerer_email TEXT NOT NULL,
  reported BOOLEAN NOT NULL,
  helpful INTEGER NOT NULL
);

CREATE TABLE photo (
  id SERIAL PRIMARY KEY,
  answer_id INTEGER NOT NULL REFERENCES answer (answer_id),
  photo_url TEXT NOT NULL
);

COPY question FROM '/Users/brandonhsu/Desktop/SDC/csv_files/questions.csv' DELIMITER ',' CSV HEADER;
COPY answer FROM '/Users/brandonhsu/Desktop/SDC/csv_files/answers.csv' DELIMITER ',' CSV HEADER;
COPY photo FROM '/Users/brandonhsu/Desktop/SDC/csv_files/answers_photos.csv' DELIMITER ',' CSV HEADER;
