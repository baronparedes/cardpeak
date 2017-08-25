CREATE TABLE [dbo].[Agent]
(
	[AgentId] INT NOT NULL PRIMARY KEY IDENTITY, 
    [FirstName] VARCHAR(50) NOT NULL, 
    [MiddleName] VARCHAR(50) NULL, 
    [LastName] VARCHAR(50) NOT NULL, 
    [Gender] CHAR NOT NULL, 
    [BirthDate] DATE NULL, 
    [Email] VARCHAR(100) NULL,
	[IsDeleted] BIT NULL DEFAULT 0
)
