
DROP TABLE IF EXISTS responses CASCADE;
DROP TABLE IF EXISTS questions CASCADE;
DROP TABLE IF EXISTS answer_reports CASCADE;
DROP TABLE IF EXISTS quiz CASCADE;
DROP TABLE IF EXISTS topics CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS sessions CASCADE;

CREATE TABLE users (
	user_id SERIAL PRIMARY KEY,
	user_name VARCHAR(15),
	user_email VARCHAR (40),
	first_name VARCHAR(30),
	last_name VARCHAR(30),
	is_admin BOOL
);

CREATE TABLE topics (
	topic_id SERIAL PRIMARY KEY,
	topic_name VARCHAR(15)
);

CREATE TABLE quiz (
	quiz_id SERIAL PRIMARY KEY,
	admin_id INT REFERENCES users(user_id),
	topic_id INT REFERENCES topics(topic_id),
	quiz_name VARCHAR(30)
);

CREATE TABLE questions (
	question_id SERIAL PRIMARY KEY,
	quiz_id INT REFERENCES quiz(quiz_id) ON DELETE CASCADE,
	question VARCHAR(128),
	question_ans1 VARCHAR(128),
	question_ans2 VARCHAR(128),
	question_ans3 VARCHAR(128),
	question_ans4 VARCHAR(128),
	correct_answer INT,
	active BOOL
);

CREATE TABLE answer_reports (
	report_id SERIAL PRIMARY KEY,
	quiz_id INT REFERENCES quiz(quiz_id),
	user_id INT REFERENCES users(user_id),
	analysis TEXT,
	score INT
);

CREATE TABLE responses (
	response_id SERIAL PRIMARY KEY,
	report_id INT REFERENCES answer_reports(report_id),
	answer INT,
	question_id INT REFERENCES questions(question_id),
	confidence INT,
	quiz_id INT REFERENCES quiz(quiz_id)
);

-- table for jwt
CREATE TABLE sessions (
	session_id SERIAL PRIMARY KEY,
	user_Id INT REFERENCES users(user_id),
	session_key VARCHAR(200),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Table selections
SELECT * FROM users;
SELECT * FROM topics;
SELECT * FROM quiz;
SELECT * FROM questions;
SELECT * FROM answer_reports;
SELECT * FROM responses;
SELECT * FROM sessions;
