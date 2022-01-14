DROP DATABASE IF EXISTS questionsAndAnswers;

CREATE DATABASE questionsAndAnswers;

USE questionsAndAnswers;

-- ---
-- Table 'PRODUCTS'
-- ---
CREATE TABLE Products (
  id INTEGER AUTO_INCREMENT NOT NULL,
  name CHAR,
  PRIMARY KEY (id)
);

-- ---
-- Table 'QUESTIONS'
-- ---

CREATE TABLE Questions (
  id INTEGER  AUTO_INCREMENT NOT NULL,
  product_id INTEGER NOT NULL,
  body VARCHAR(1000) NOT NULL,
  date DATETIME NOT NULL,
  name VARCHAR(20) NOT NULL,
  email VARCHAR(50) NOT NULL,
  reported BOOLEAN NOT NULL,
  helpfulness INTEGER NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY(product_id)
    REFERENCES Products(id)
);

-- ---
-- Table 'Answers'
-- ---

DROP TABLE IF EXISTS Answers;

CREATE TABLE Answers (
  id INTEGER NOT NULL AUTO_INCREMENT,
  question_id INTEGER NOT NULL,
  body VARCHAR(1000) NOT NULL,
  date DATETIME NOT NULL,
  name VARCHAR(30) NOT NULL,
  email VARCHAR(50) NOT NULL,
  reported BOOLEAN NOT NULL,
  helpfulness INTEGER NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY(question_id)
    REFERENCES Questions(id)
);

-- ---
-- Table 'Photos'
-- ---

DROP TABLE IF EXISTS Photos;

CREATE TABLE Photos (
  id INTEGER NOT NULL AUTO_INCREMENT,
  answer_id INTEGER NOT NULL,
  url VARCHAR(300) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY(answer_id)
    REFERENCES Answers(id)
);

-- ---
-- Foreign Keys
-- ---

-- Questions ADD FOREIGN KEY (product_id) REFERENCES Products (id);
-- Answers ADD FOREIGN KEY (Question_id) REFERENCES Questions (id);
-- Photos ADD FOREIGN KEY (Answer_id) REFERENCES Answers (id);
