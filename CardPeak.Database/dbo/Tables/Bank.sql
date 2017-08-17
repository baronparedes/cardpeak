CREATE TABLE [dbo].[Bank] (
    [BankId]   INT          IDENTITY (1, 1) NOT NULL,
    [Name] VARCHAR (50) NOT NULL,
    CONSTRAINT [PK_Bank] PRIMARY KEY CLUSTERED ([BankId] ASC)
);

