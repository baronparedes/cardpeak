CREATE VIEW dbo.DuplicateTransactions
AS
SELECT  
	APT.BankId,
	APT.CardCategoryId,
	APT.Client,
	APT.ProductType,
	APT.Amount,
	COUNT(1) AS TransactionCount
FROM dbo.ApprovalTransaction APT
WHERE APT.IsDeleted = 0 AND APT.Units = 1
GROUP BY APT.BankId, APT.Client, APT.CardCategoryId, APT.ProductType, APT.Amount
HAVING COUNT(1) > 1