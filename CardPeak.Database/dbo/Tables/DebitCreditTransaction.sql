CREATE TABLE [dbo].[DebitCreditTransaction] (
    [Id]                  INT              IDENTITY (1, 1) NOT NULL,
    [AgentId]             INT              NOT NULL,
    [Amount]              DECIMAL (19, 4)  NOT NULL,
    [Remarks]             VARCHAR (255)    NOT NULL,
    [TransactionTypeId]   INT              DEFAULT ((1)) NOT NULL,
    [TransactionDateTime] DATETIME         DEFAULT (getdate()) NOT NULL,
    [IsDeleted]           BIT              DEFAULT ((0)) NOT NULL,
    [TransactionId]       UNIQUEIDENTIFIER NULL,
    [CreatedBy]           VARCHAR (200)    DEFAULT (suser_sname()) NOT NULL,
    [CreatedDate]         DATETIME         DEFAULT (getdate()) NOT NULL,
    [BatchId]             INT              NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_DebitCreditTransaction_Agent] FOREIGN KEY ([AgentId]) REFERENCES [dbo].[Agent] ([AgentId]),
    CONSTRAINT [FK_DebitCreditTransaction_Reference] FOREIGN KEY ([TransactionTypeId]) REFERENCES [dbo].[Reference] ([ReferenceId])
);


