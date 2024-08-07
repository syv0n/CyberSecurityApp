CREATE TABLE IdentifyScores (
    id INT IDENTITY(1,1) PRIMARY KEY,
    userId INT NOT NULL,
    subcategory VARCHAR(50) NOT NULL,
    score INT NOT NULL,
    comments TEXT,
    createdAt DATETIME DEFAULT GETDATE(),
    updatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (userId) REFERENCES Users(id)
);

CREATE TABLE ProtectScores (
    id INT IDENTITY(1,1) PRIMARY KEY,
    userId INT NOT NULL,
    subcategory VARCHAR(50) NOT NULL,
    score INT NOT NULL,
    comments TEXT,
    createdAt DATETIME DEFAULT GETDATE(),
    updatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (userId) REFERENCES Users(id)
);

CREATE TABLE DetectScores (
    id INT IDENTITY(1,1) PRIMARY KEY,
    userId INT NOT NULL,
    subcategory VARCHAR(50) NOT NULL,
    score INT NOT NULL,
    comments TEXT,
    createdAt DATETIME DEFAULT GETDATE(),
    updatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (userId) REFERENCES Users(id)
);

CREATE TABLE RespondScores (
    id INT IDENTITY(1,1) PRIMARY KEY,
    userId INT NOT NULL,
    subcategory VARCHAR(50) NOT NULL,
    score INT NOT NULL,
    comments TEXT,
    createdAt DATETIME DEFAULT GETDATE(),
    updatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (userId) REFERENCES Users(id)
);

CREATE TABLE RecoverScores (
    id INT IDENTITY(1,1) PRIMARY KEY,
    userId INT NOT NULL,
    subcategory VARCHAR(50) NOT NULL,
    score INT NOT NULL,
    comments TEXT,
    createdAt DATETIME DEFAULT GETDATE(),
    updatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (userId) REFERENCES Users(id)
);