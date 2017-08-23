CREATE VIEW [dbo].[ApprovalTransactionView]
	AS SELECT
	t.Id,
	t.BankId,
	t.CardCategoryId,
	t.AgentId,
	t.Units,
	t.Amount,
	t.ProductType,
	t.ReferenceNumber1,
	t.ReferenceNumber2,
	t.Client,
	t.ApprovalDate,
	t.BatchId,
	t.IsDeleted,
	bank.[Description] AS Bank,
	category.[Description] AS CardCategory
FROM dbo.ApprovalTransaction t
INNER JOIN dbo.Reference bank
	ON bank.Id = t.BankId AND bank.[Type] = 1
INNER JOIN dbo.Reference category
	ON category.Id = t.CardCategoryId AND category.[Type] = 2
