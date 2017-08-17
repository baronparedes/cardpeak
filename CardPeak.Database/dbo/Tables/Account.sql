CREATE TABLE [dbo].[Account]
(
	[AgentId] INT NOT NULL , 
    [Alias] VARCHAR(50) NOT NULL, 
    PRIMARY KEY ([AgentId], [Alias])
)
