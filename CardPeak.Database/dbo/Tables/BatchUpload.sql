CREATE TABLE [dbo].[BatchUpload]
(
	[BatchId] INT NOT NULL PRIMARY KEY IDENTITY, 
    [FileName] VARCHAR(255) NOT NULL, 
    [BankId] INT NOT NULL, 
    [HasErrors] BIT NOT NULL DEFAULT 0, 
    [UploadStartDateTime] DATETIME NOT NULL, 
    [UploaedEndDateTime] DATETIME NULL
)
