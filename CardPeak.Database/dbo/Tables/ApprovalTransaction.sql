CREATE TABLE [dbo].[ApprovalTransaction] (
    [Id]               BIGINT           IDENTITY (1, 1) NOT NULL,
    [BankId]           INT              NOT NULL,
    [CardCategoryId]   INT              NOT NULL,
    [AgentId]          INT              NOT NULL,
    [Units]            DECIMAL (19, 4)  DEFAULT ((1)) NOT NULL,
    [Amount]           DECIMAL (19, 4)  NOT NULL,
    [ProductType]      VARCHAR (100)    NOT NULL,
    [ReferenceNumber1] VARCHAR (50)     NULL,
    [ReferenceNumber2] VARCHAR (50)     NULL,
    [Client]           VARCHAR (255)    NULL,
    [ApprovalDate]     DATE             NOT NULL,
    [BatchId]          INT              NULL,
    [IsDeleted]        BIT              DEFAULT ((0)) NOT NULL,
    [TransactionId]    UNIQUEIDENTIFIER NULL,
    [CreatedBy]        VARCHAR (200)    DEFAULT (suser_sname()) NOT NULL,
    [CreatedDate]      DATETIME         DEFAULT (getdate()) NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_ApprovalTransaction_Agent] FOREIGN KEY ([AgentId]) REFERENCES [dbo].[Agent] ([AgentId]),
    CONSTRAINT [FK_ApprovalTransaction_Reference_BankId] FOREIGN KEY ([BankId]) REFERENCES [dbo].[Reference] ([ReferenceId]),
    CONSTRAINT [FK_ApprovalTransaction_Reference_CardCategoryId] FOREIGN KEY ([CardCategoryId]) REFERENCES [dbo].[Reference] ([ReferenceId])
);




GO

CREATE INDEX [IX_ApprovalTransaction_CheckDuplicate] 
    ON [dbo].[ApprovalTransaction] (BankId, CardCategoryId, AgentId, ProductType, ReferenceNumber1, ReferenceNumber2, Client, IsDeleted)
GO


GO
CREATE NONCLUSTERED INDEX [IX_Approval_Transaction_IsDeleted]
    ON [dbo].[ApprovalTransaction]([IsDeleted] ASC)
    INCLUDE([AgentId], [Units], [ApprovalDate]);

