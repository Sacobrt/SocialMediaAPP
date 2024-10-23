﻿USE MASTER;
GO
DROP DATABASE IF EXISTS socialMedia;
GO
CREATE DATABASE socialMedia collate Croatian_CI_AS;
GO

USE socialMedia;

-- CREATE

CREATE TABLE Users (
	ID INT NOT NULL PRIMARY KEY IDENTITY(1, 1),
	username VARCHAR(40) NOT NULL,
	password NVARCHAR(64) NOT NULL,
	email VARCHAR(50) NOT NULL,
	firstName VARCHAR(20),
	lastName VARCHAR(20),
	birthDate DATETIME NOT NULL,
	createdAt DATETIME NOT NULL
);

CREATE TABLE Followers (
	ID INT NOT NULL PRIMARY KEY IDENTITY(1, 1),
	userID INT NOT NULL,
	followerUserID INT NOT NULL,
	followedAt DATETIME NOT NULL
);

CREATE TABLE Posts (
	ID INT NOT NULL PRIMARY KEY IDENTITY(1, 1),
	userID INT NOT NULL,
	post TEXT NOT NULL,
	likes INT,
	createdAt DATETIME NOT NULL
);

CREATE TABLE Comments (
	ID INT NOT NULL PRIMARY KEY IDENTITY(1, 1),
	userID INT NOT NULL,
	postID INT NOT NULL,
	comment TEXT NOT NULL,
	likes INT,
	createdAt DATETIME NOT NULL
);

CREATE TABLE Operators (
	ID INT NOT NULL PRIMARY KEY IDENTITY(1, 1),
	userID INT NOT NULL,
	email VARCHAR(50) NOT NULL,
	password VARCHAR(200) NOT NULL
);

ALTER TABLE Followers ADD FOREIGN KEY (userID) REFERENCES Users(ID);
ALTER TABLE Followers ADD FOREIGN KEY (followerUserID) REFERENCES Users(ID);
ALTER TABLE Posts ADD FOREIGN KEY (userID) REFERENCES Users(ID);
ALTER TABLE Comments ADD FOREIGN KEY (userID) REFERENCES Users(ID);
ALTER TABLE Comments ADD FOREIGN KEY (postID) REFERENCES Posts(ID);
ALTER TABLE Operators ADD FOREIGN KEY (userID) REFERENCES Users(ID);

INSERT INTO Operators (UserID, Email, Password) VALUES (3, 'demo@demo.com', '$2a$12$nk156JFXGNNH.GfgRq.Zx.CJz/34Oeqgy43A0/qRWb90jLgmSqw/2');
