CREATE TABLE [dbo].[BatchFileConfiguration]
(
	[BatchFileConfigurationId] INT NOT NULL IDENTITY , 
    [BankId] INT NOT NULL, 
    [HasHeader] BIT NOT NULL DEFAULT 0, 
    [SkipNumberOfRows] INT NULL, 
    [AliasColumn] INT NULL, 
    [ProductTypeColumn] INT NULL, 
    [Ref1Column] INT NULL, 
    [Ref2Column] INT NULL, 
    [ClientFullNameColumn] INT NULL, 
    [ClientFirstNameColumn] INT NULL, 
    [ClientMiddleNameColumn] INT NULL, 
    [ClientLastNameColumn] INT NULL, 
    [ApprovalDateColumn] INT NULL, 
    [CardCategoryColumn] INT NULL, 
    [CardCountColumn] INT NULL, 
    PRIMARY KEY ([BatchFileConfigurationId]), 
    CONSTRAINT [CK_BatchFileConfiguration_BankId] UNIQUE(BankId), 
    CONSTRAINT [FK_BatchFileConfiguration_Reference_BankId] FOREIGN KEY (BankId) REFERENCES Reference(ReferenceId)
)
