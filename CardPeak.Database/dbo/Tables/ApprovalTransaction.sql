CREATE TABLE [dbo].[ApprovalTransaction]
(
	[Id] BIGINT NOT NULL PRIMARY KEY IDENTITY, 
    [BankId] INT NOT NULL, 
    [CardCategoryId] INT NOT NULL, 
    [AgentId] INT NOT NULL, 
    [Units] DECIMAL(19, 4) NOT NULL DEFAULT 1, 
    [Amount] DECIMAL(19, 4) NOT NULL, 
	[ProductType] VARCHAR(100) NOT NULL,
    [ReferenceNumber1] VARCHAR(50) NULL, 
    [ReferenceNumber2] VARCHAR(50) NULL, 
    [Client] VARCHAR(255) NULL, 
    [ApprovalDate] DATE NOT NULL, 
    CONSTRAINT [FK_ApprovalTransaction_Agent] FOREIGN KEY ([AgentId]) REFERENCES [Agent]([AgentId])
)
