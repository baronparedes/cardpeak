CREATE TABLE [dbo].[TeamPlacement]
(
	[TeamPlacementId] INT NOT NULL IDENTITY, 
	[TeamId] INT NOT NULL, 
	[AgentId] INT NOT NULL, 
	[IsUnitManager] BIT NOT NULL DEFAULT 0, 
	CONSTRAINT [PK_TeamPlacement] PRIMARY KEY ([TeamPlacementId]), 
	CONSTRAINT [CK_TeamPlacement_Unique] UNIQUE ([TeamId], [AgentId]), 
	CONSTRAINT [FK_TeamPlacement_Agent] FOREIGN KEY ([AgentId]) REFERENCES [Agent]([AgentId]),
	CONSTRAINT [FK_TeamPlacement_Team] FOREIGN KEY ([TeamId]) REFERENCES [Team]([TeamId])
)
