CREATE TABLE [dbo].[BatchUpload]
(
	[BatchId] INT NOT NULL PRIMARY KEY IDENTITY, 
    [FileName] VARCHAR(255) NOT NULL, 
    [BankId] INT NOT NULL, 
    [HasErrors] BIT NOT NULL DEFAULT 0, 
    [UploadStartDateTime] DATETIME NULL, 
    [UploaedEndDateTime] DATETIME NULL, 
    CONSTRAINT [FK_BatchUpload_Bank] FOREIGN KEY (BankId) REFERENCES [Reference]([ReferenceId])
)
