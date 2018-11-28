CREATE TABLE [dbo].[BatchUpload] (
    [BatchId]              INT           IDENTITY (1, 1) NOT NULL,
    [FileName]             VARCHAR (MAX) NOT NULL,
    [BankId]               INT           NOT NULL,
    [HasErrors]            BIT           DEFAULT ((0)) NULL,
    [ProcessStartDateTime] DATETIME      NULL,
    [ProcessEndDateTime]   DATETIME      NULL,
    [ProcessedRecords]     INT           NULL,
    [CreatedBy]            VARCHAR (200) DEFAULT (suser_sname()) NOT NULL,
    [CreatedDate]          DATETIME      DEFAULT (getdate()) NOT NULL,
    [IsDeleted]            BIT           DEFAULT ((0)) NOT NULL,
    PRIMARY KEY CLUSTERED ([BatchId] ASC),
    CONSTRAINT [FK_BatchUpload_Bank] FOREIGN KEY ([BankId]) REFERENCES [dbo].[Reference] ([ReferenceId])
);


