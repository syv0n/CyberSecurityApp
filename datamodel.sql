-- Active: 1724285437841@@127.0.0.1@3306@cyberpal_database_nist
CREATE TABLE Users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) ,
    email VARCHAR(255) UNIQUE ,
    password VARCHAR(255) ,
    type VARCHAR(255) ,
    role VARCHAR(255),
    department VARCHAR(255)
);

CREATE TABLE Components (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) ,
    description TEXT
);

CREATE TABLE Categories (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    component_id BIGINT UNSIGNED ,
    name VARCHAR(255) ,
    description TEXT,
    FOREIGN KEY (component_id) REFERENCES Components(id)
);

CREATE TABLE Subcategories (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    component_id BIGINT UNSIGNED ,
    category_id BIGINT UNSIGNED ,
    name VARCHAR(255) ,
    description TEXT,
    FOREIGN KEY (component_id) REFERENCES Components(id),
    FOREIGN KEY (category_id) REFERENCES Categories(id)
);


CREATE TABLE Scores (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED,
    question_id BIGINT UNSIGNED,
    subcategory VARCHAR(255),
    component VARCHAR(255),
    category VARCHAR(255),
    score INT,
    comments TEXT,
    target_state INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_submitted BOOLEAN DEFAULT FALSE,
    submitted_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE QuestionSets (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_type VARCHAR(255) ,
    user_role VARCHAR(255),
    name VARCHAR(255) 
);

CREATE TABLE Questions (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    set_id BIGINT UNSIGNED ,
    user_type VARCHAR(255) ,
    question TEXT,
    subcategory_id BIGINT UNSIGNED ,
    category_id BIGINT UNSIGNED ,
    component_id BIGINT UNSIGNED ,
    FOREIGN KEY (set_id) REFERENCES QuestionSets(id),
    FOREIGN KEY (subcategory_id) REFERENCES Subcategories(id),
    FOREIGN KEY (category_id) REFERENCES Categories(id),
    FOREIGN KEY (component_id) REFERENCES Components(id)
);


CREATE TABLE Departments (
    dept_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) 
);

DESCRIBE Questions



CREATE TABLE Submissions (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);


ALTER TABLE Submissions ADD COLUMN final_score DECIMAL(5,2) NOT NULL;

ALTER TABLE Scores ADD COLUMN submission_id BIGINT UNSIGNED;

SELECT * from `Submissions`