CREATE TABLE [dbo].[DefaultRate] (
	[DefaultRateId] INT IDENTITY (1, 1) NOT NULL,
	[Amount] DECIMAL(19, 4) NOT NULL,
	[BankId] INT NOT NULL, 
	[CardCategoryId] INT NOT NULL, 
	[TypeId] INT NOT NULL, 
	[SavingsAmount] DECIMAL(19, 4) NOT NULL DEFAULT 0, 
	CONSTRAINT [PK_DefaultRate] PRIMARY KEY ([BankId], [CardCategoryId], [TypeId]),
	CONSTRAINT [FK_DefaultRate_Reference_BankId] FOREIGN KEY ([BankId]) REFERENCES [Reference]([ReferenceId]),
	CONSTRAINT [FK_DefaultRate_Reference_CardCategoryId] FOREIGN KEY ([CardCategoryId]) REFERENCES [Reference]([ReferenceId]),
	CONSTRAINT [FK_DefaultRate_Agent] FOREIGN KEY ([TypeId]) REFERENCES [Reference]([ReferenceId])
);

