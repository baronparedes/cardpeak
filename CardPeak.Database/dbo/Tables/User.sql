CREATE TABLE [dbo].[User]
(
	[UserId] INT NOT NULL PRIMARY KEY IDENTITY, 
    [Username] VARCHAR(15) NOT NULL, 
    [Password] VARCHAR(255) NOT NULL, 
    [FirstName] VARCHAR(50) NOT NULL, 
    [Middlename] VARCHAR(50) NULL, 
    [LastName] VARCHAR(50) NOT NULL, 
    [Email] VARCHAR(100) NULL 
)
