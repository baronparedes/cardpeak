CREATE TABLE [dbo].[DebitCreditTransaction]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
	[AgentId] INT NOT NULL, 
	[Amount] DECIMAL(19, 4) NOT NULL, 
	[Remarks] VARCHAR(255) NOT NULL, 
	[TransactionTypeId] INT NOT NULL DEFAULT 1, 
	[TransactionDateTime] DATETIME NOT NULL DEFAULT GETDATE(), 
	[IsDeleted] BIT NOT NULL DEFAULT 0, 
	[TransactionId] UNIQUEIDENTIFIER NULL, 
	[BatchId] INT NULL,
	[CreatedBy] VARCHAR(200) NOT NULL DEFAULT SYSTEM_USER, 
	[CreatedDate] DATETIME NOT NULL DEFAULT GETDATE(), 
	CONSTRAINT [FK_DebitCreditTransaction_Agent] FOREIGN KEY ([AgentId]) REFERENCES [Agent]([AgentId]), 
	CONSTRAINT [FK_DebitCreditTransaction_Reference] FOREIGN KEY ([TransactionTypeId]) REFERENCES [Reference]([ReferenceId])
)
