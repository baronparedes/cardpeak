CREATE TABLE [dbo].[Rate] (
    [RateId]   INT          IDENTITY (1, 1) NOT NULL,
    [Rate] DECIMAL(18, 2) NOT NULL,
    [BankId] INT NOT NULL, 
    [CardCategoryId] INT NOT NULL, 
    [AgentId] INT NOT NULL DEFAULT 0, 
    CONSTRAINT [PK_Rate] PRIMARY KEY ([BankId], [CardCategoryId], [AgentId]),
	CONSTRAINT [FK_Rate_Reference_BankId] FOREIGN KEY ([BankId]) REFERENCES [Reference]([ReferenceId]),
    CONSTRAINT [FK_Rate_Reference_CardCategoryId] FOREIGN KEY ([CardCategoryId]) REFERENCES [Reference]([ReferenceId]),
	CONSTRAINT [FK_Rate_Agent] FOREIGN KEY ([AgentId]) REFERENCES [Agent]([AgentId])
);

