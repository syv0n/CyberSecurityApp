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

CREATE TABLE Saves (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED ,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    description TEXT,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE Scores (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED ,
    subcategory_id BIGINT UNSIGNED ,
    component_id BIGINT UNSIGNED ,
    category_id BIGINT UNSIGNED ,
    current_state INT,
    target_state INT,
    save_id BIGINT UNSIGNED ,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (subcategory_id) REFERENCES Subcategories(id),
    FOREIGN KEY (component_id) REFERENCES Components(id),
    FOREIGN KEY (category_id) REFERENCES Categories(id),
    FOREIGN KEY (save_id) REFERENCES Saves(id)
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

CREATE TABLE Submissions (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED ,
    save_id BIGINT UNSIGNED ,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (save_id) REFERENCES Saves(id)
);

CREATE TABLE Departments (
    dept_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) 
);

