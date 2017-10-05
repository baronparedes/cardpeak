CREATE TABLE [dbo].[BatchUpload]
(
	[BatchId] INT NOT NULL PRIMARY KEY IDENTITY, 
	[FileName] VARCHAR(MAX) NOT NULL, 
	[BankId] INT NOT NULL, 
	[HasErrors] BIT NULL DEFAULT 0, 
	[ProcessStartDateTime] DATETIME NULL, 
	[ProcessEndDateTime] DATETIME NULL, 
	[ProcessedRecords] INT NULL, 
	[IsDeleted] BIT NOT NULL DEFAULT 0,
	[CreatedBy] VARCHAR(200) NOT NULL DEFAULT SYSTEM_USER, 
	[CreatedDate] DATETIME NOT NULL DEFAULT GETDATE()
	CONSTRAINT [FK_BatchUpload_Bank] FOREIGN KEY (BankId) REFERENCES [Reference]([ReferenceId])
)
