﻿CREATE TABLE [dbo].[ApprovalTransaction]
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
	[BatchId] INT NULL, 
	[IsDeleted] BIT NOT NULL DEFAULT 0, 
	[TransactionId] UNIQUEIDENTIFIER NULL, 
	[CreatedBy] VARCHAR(200) NOT NULL DEFAULT SYSTEM_USER, 
	[CreatedDate] DATETIME NOT NULL DEFAULT GETDATE(), 
	CONSTRAINT [CK_ApprovalTransaction_UniqueTransaction] UNIQUE(BankId, CardCategoryId, AgentId, ProductType, ReferenceNumber1, ReferenceNumber2, Client), 
	CONSTRAINT [FK_ApprovalTransaction_Agent] FOREIGN KEY ([AgentId]) REFERENCES [Agent]([AgentId]), 
	CONSTRAINT [FK_ApprovalTransaction_Reference_BankId] FOREIGN KEY ([BankId]) REFERENCES [Reference]([ReferenceId]),
	CONSTRAINT [FK_ApprovalTransaction_Reference_CardCategoryId] FOREIGN KEY ([CardCategoryId]) REFERENCES [Reference]([ReferenceId])
)
