DROP DATABASE IF EXISTS questionsAndAnswers;

CREATE DATABASE questionsAndAnswers;

USE questionsAndAnswers;

-- ---
-- Table 'PRODUCTS'
-- ---
-- CREATE TABLE Products (
--   id INTEGER AUTO_INCREMENT NOT NULL,
--   name CHAR,
--   PRIMARY KEY (id)
-- );

-- ---
-- Table 'QUESTIONS'
-- ---

CREATE TABLE questions (
  id INTEGER  AUTO_INCREMENT NOT NULL,
  product_id INTEGER NOT NULL,
  body VARCHAR(255) NOT NULL,
  date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  name VARCHAR(20) NOT NULL,
  email VARCHAR(50) NOT NULL,
  reported BOOLEAN NOT NULL,
  helpfulness INTEGER NOT NULL,
  PRIMARY KEY (id)
  -- FOREIGN KEY(product_id)
  --   REFERENCES Products(id)
);

-- ---
-- Table 'Answers'
-- ---

CREATE TABLE answers (
  id INTEGER NOT NULL AUTO_INCREMENT,
  question_id INTEGER NOT NULL,
  body VARCHAR(255) NOT NULL,
  date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  name VARCHAR(30) NOT NULL,
  email VARCHAR(50) NOT NULL,
  reported BOOLEAN NOT NULL,
  helpfulness INTEGER NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY(question_id)
    REFERENCES questions(id)
);

-- ---
-- Table 'Photos'
-- ---


CREATE TABLE photos (
  id INTEGER NOT NULL AUTO_INCREMENT,
  answer_id INTEGER NOT NULL,
  url VARCHAR(200) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY(answer_id)
    REFERENCES answers(id)
);


-- ---
-- ADD INDEXES TO TABLES
-- ---
ALTER TABLE questions ADD INDEX product_id_index (product_id);
ALTER TABLE questions ADD INDEX reported_index (reported);
ALTER TABLE answers ADD INDEX question_id_index (question_id);
ALTER TABLE answers ADD INDEX reported_index (reported);
ALTER TABLE photos ADD INDEX answer_id_index (answer_id);


-- ---
-- LOAD CSV FILE DATA INTO TABLES
-- ---

LOAD DATA LOCAL INFILE
'./CSV_Files/questions.csv'
INTO TABLE questions
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(id, product_id, body, @date, name, email, reported, helpfulness)
SET date = FROM_UNIXTIME(SUBSTRING(@date,1,10));

LOAD DATA LOCAL INFILE
'./CSV_Files/answers.csv'
INTO TABLE answers
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(id, question_id, body, @date, name, email, reported, helpfulness)
SET date = FROM_UNIXTIME(SUBSTRING(@date,1,10));

LOAD DATA LOCAL INFILE
'./CSV_Files/answers_photos.csv'
INTO TABLE photos
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;



