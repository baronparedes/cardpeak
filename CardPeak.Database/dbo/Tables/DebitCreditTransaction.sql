CREATE TABLE [dbo].[DebitCreditTransaction]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [AgentId] INT NOT NULL, 
    [Amount] DECIMAL(19, 4) NOT NULL, 
    [Remarks] VARCHAR(255) NOT NULL, 
    CONSTRAINT [FK_DebitCreditTransaction_Agent] FOREIGN KEY ([AgentId]) REFERENCES [Agent]([AgentId])
)
