CREATE TABLE Scores (
    id INT IDENTITY(1,1) PRIMARY KEY,
    userId INT NOT NULL,
    category VARCHAR(50) NOT NULL,
    subcategory VARCHAR(50) NOT NULL,
    score INT NOT NULL,
    comments TEXT,
    createdAt DATETIME DEFAULT GETDATE(),
    updatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (userId) REFERENCES Users(id)
);