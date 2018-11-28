CREATE TABLE [dbo].[BatchFileConfiguration] (
    [BatchFileConfigurationId] INT          IDENTITY (1, 1) NOT NULL,
    [BankId]                   INT          NOT NULL,
    [HasHeader]                BIT          DEFAULT ((0)) NOT NULL,
    [SkipNumberOfRows]         INT          NULL,
    [AliasColumn]              INT          NOT NULL,
    [ProductTypeColumn]        INT          NOT NULL,
    [Ref1Column]               INT          NULL,
    [Ref2Column]               INT          NULL,
    [ClientFullNameColumn]     INT          NULL,
    [ClientFirstNameColumn]    INT          NULL,
    [ClientMiddleNameColumn]   INT          NULL,
    [ClientLastNameColumn]     INT          NULL,
    [ApprovalDateColumn]       INT          NOT NULL,
    [CardCategoryColumn]       INT          NOT NULL,
    [CardCountColumn]          INT          NULL,
    [ApprovalDateFormat]       VARCHAR (20) DEFAULT ('MM/dd/yyyy') NOT NULL,
    PRIMARY KEY CLUSTERED ([BatchFileConfigurationId] ASC),
    CONSTRAINT [FK_BatchFileConfiguration_Reference_BankId] FOREIGN KEY ([BankId]) REFERENCES [dbo].[Reference] ([ReferenceId]),
    CONSTRAINT [CK_BatchFileConfiguration_BankId] UNIQUE NONCLUSTERED ([BankId] ASC)
);


