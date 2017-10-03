CREATE TABLE [dbo].[BatchFileConfiguration]
(
	[BatchFileConfigurationId] INT NOT NULL IDENTITY , 
	[BankId] INT NOT NULL, 
	[HasHeader] BIT NOT NULL DEFAULT 0, 
	[SkipNumberOfRows] INT NULL, 
	[AliasColumn] INT NOT NULL, 
	[ProductTypeColumn] INT NOT NULL, 
	[Ref1Column] INT NULL, 
	[Ref2Column] INT NULL, 
	[ClientFullNameColumn] INT NULL, 
	[ClientFirstNameColumn] INT NULL, 
	[ClientMiddleNameColumn] INT NULL, 
	[ClientLastNameColumn] INT NULL, 
	[ApprovalDateColumn] INT NOT NULL, 
	[CardCategoryColumn] INT NOT NULL, 
	[CardCountColumn] INT NULL, 
	[ApprovalDateFormat] VARCHAR(20) NOT NULL, 
	PRIMARY KEY ([BatchFileConfigurationId]), 
	CONSTRAINT [CK_BatchFileConfiguration_BankId] UNIQUE(BankId), 
	CONSTRAINT [FK_BatchFileConfiguration_Reference_BankId] FOREIGN KEY (BankId) REFERENCES Reference(ReferenceId)
)
