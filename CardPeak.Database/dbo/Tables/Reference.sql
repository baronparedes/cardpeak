CREATE TABLE [dbo].[Reference]
(
	[ReferenceId] INT NOT NULL IDENTITY, 
	[ReferenceTypeId] INT NOT NULL, 
	[Description] VARCHAR(100) NOT NULL, 
	CONSTRAINT [FK_Reference_ReferenceType] FOREIGN KEY ([ReferenceTypeId]) REFERENCES [ReferenceType]([ReferenceTypeId]), 
	CONSTRAINT [PK_Reference] PRIMARY KEY ([ReferenceId]), 
	CONSTRAINT [CK_Reference_Unique] UNIQUE(ReferenceTypeId, [Description])
)
