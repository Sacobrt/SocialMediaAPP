USE MASTER;
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
	password VARCHAR(40) NOT NULL,
	email VARCHAR(50) NOT NULL,
	firstName VARCHAR(20),
	lastName VARCHAR(20),
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
	post VARCHAR(200) NOT NULL,
	likes INT,
	createdAt DATETIME NOT NULL
);

CREATE TABLE Comments (
	ID INT NOT NULL PRIMARY KEY IDENTITY(1, 1),
	userID INT NOT NULL,
	postID INT NOT NULL,
	comment VARCHAR(200) NOT NULL,
	likes INT,
	createdAt DATETIME NOT NULL
);

ALTER TABLE Followers ADD FOREIGN KEY (userID) REFERENCES Users(ID);
ALTER TABLE Followers ADD FOREIGN KEY (followerUserID) REFERENCES Users(ID);
ALTER TABLE Posts ADD FOREIGN KEY (userID) REFERENCES Users(ID);
ALTER TABLE Comments ADD FOREIGN KEY (userID) REFERENCES Users(ID);
ALTER TABLE Comments ADD FOREIGN KEY (postID) REFERENCES Posts(ID);

-- INSERT

INSERT INTO Users (username, password, email, firstName, lastName, createdAt) VALUES 
	('sparklingDolphin', 'qz8Tp3K9', 'ivanhorvat@gmail.com', 'Ivan', 'Horvat', GETDATE()),
	('sunnyMeadow', 'r4F7hY2l', 'maraperic@yahoo.com', 'Mara', 'Perić', GETDATE()),
	('mysticRiver', 'p2B5jV9x', 'markozoric@hotmail.com', 'Marko', 'Zorić', GETDATE()),
	('blissfulSunset', 't3Q6aH7y', 'mateablazevic@gmail.com', 'Matea', 'Blažević', GETDATE()),
	('gentleBreeze', 'v6N8jX1w', 'stjepansimic@gmail.com', NULL, NULL, GETDATE()),
	('blueOcean', 'x7H2kD8q', 'ivanakrstic@gmail.com', 'Ivana', 'Krstić', GETDATE()),
	('goldenSun', 'y4J9mP3f', 'davorjuric@yahoo.com', NULL, NULL, GETDATE());

INSERT INTO Followers (userID, followerUserID, followedAt) VALUES 
	(3, 6, GETDATE()),
	(4, 7, GETDATE()),
	(2, 5, GETDATE()),
	(1, 3, GETDATE());

INSERT INTO Posts (userID, post, likes, createdAt) VALUES 
	(1, 'Prekrasan dan!', 10, GETDATE()),
	(2, 'Uživam u ovom vremenu.', 5, GETDATE()),
	(3, 'Pogledajte moj novi blog post.', 7, GETDATE()),
	(4, 'Upravo sam imao nevjerojatan ručak!', 12, GETDATE()),
	(5, 'Kodiranje cijelu noć!', 3, GETDATE()),
	(7, 'Još jedan sunčan dan.', 4, GETDATE()),
	(2, 'Planovi za vikend?', 9, GETDATE()),
	(3, 'Upravo sam završio sjajnu knjigu.', 6, GETDATE()),
	(4, 'Vrijeme za odmor!', 15, GETDATE()),
	(5, 'Natrag na posao.', 0, GETDATE());

INSERT INTO Comments (userID, postID, comment, likes, createdAt) VALUES 
	(2, 1, 'Sjajan post!', 1, GETDATE()),
	(3, 1, 'Slažem se, zaista prekrasan dan.', 2, GETDATE()),
	(4, 2, 'Apsolutno, i ja uživam u vremenu!', 3, GETDATE()),
	(5, 3, 'Provjerit ću!', 1, GETDATE()),
	(1, 4, 'Mljac! Što si jeo?', 0, GETDATE()),
	(6, 5, 'Zvuči zabavno!', 2, GETDATE()),
	(4, 6, 'Stvarno je!', 4, GETDATE()),
	(5, 7, 'Imam nekoliko planova, a ti?', 5, GETDATE()),
	(1, 8, 'Koju si knjigu pročitao?', 0, GETDATE()),
	(2, 9, 'Uživaj na odmoru!', 3, GETDATE()),
	(4, 1, 'Ne bih se mogao više složiti!', 2, GETDATE()),
	(7, 2, 'Jesi li za kavu?', 4, GETDATE()),
	(7, 3, 'Zanimljivo štivo.', 0, GETDATE()),
	(2, 4, 'Kakav obrok!', 1, GETDATE());

-- SELECT

--SELECT * FROM Users;
--SELECT * FROM Followers;
--SELECT * FROM Posts;
--SELECT * FROM Comments;
