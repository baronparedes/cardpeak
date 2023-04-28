CREATE TABLE [dbo].[Agent]
(
	[AgentId] INT NOT NULL PRIMARY KEY IDENTITY, 
    [FirstName] VARCHAR(50) NOT NULL, 
    [MiddleName] VARCHAR(50) NULL, 
    [LastName] VARCHAR(50) NOT NULL, 
    [Gender] CHAR NOT NULL, 
    [BirthDate] DATE NULL, 
    [Email] VARCHAR(100) NULL,
	[IsDeleted] BIT NOT NULL DEFAULT 0, 
    [AgentTypeId] INT NOT NULL DEFAULT 31
	CONSTRAINT [FK_Agent_Reference_AgentTypeId] FOREIGN KEY ([AgentTypeId]) REFERENCES [Reference]([ReferenceId])
)
