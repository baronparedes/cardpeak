CREATE TABLE [dbo].[DebitCreditTransaction]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [AgentId] INT NOT NULL, 
    [Amount] DECIMAL(19, 4) NOT NULL, 
    [Remarks] VARCHAR(255) NOT NULL, 
    [TransactionTypeId] INT NOT NULL DEFAULT 1, 
    [TransactionDateTime] DATETIME NOT NULL DEFAULT GETDATE(), 
    [IsDeleted] BIT NOT NULL DEFAULT 0, 
    CONSTRAINT [FK_DebitCreditTransaction_Agent] FOREIGN KEY ([AgentId]) REFERENCES [Agent]([AgentId])
)
