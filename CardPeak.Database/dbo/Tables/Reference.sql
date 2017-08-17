CREATE TABLE [dbo].[Reference]
(
	[Id] INT NOT NULL , 
    [Type] INT NOT NULL, 
    [Description] VARCHAR(100) NOT NULL, 
    CONSTRAINT [PK_Reference] PRIMARY KEY ([Id], [Type]), 
    CONSTRAINT [FK_Reference_ReferenceType] FOREIGN KEY ([Type]) REFERENCES [ReferenceType]([ReferenceTypeId])
)
