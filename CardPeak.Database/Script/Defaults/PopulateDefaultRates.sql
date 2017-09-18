SET IDENTITY_INSERT dbo.Rate ON
GO

DECLARE @defaultAgentId INT = 0;

;WITH Rate_CTE(RateId, Amount, BankId, CardCategoryId, SavingsAmount)
AS
(
	--Metrobank
			  SELECT 1, 1500, 1, 7, 100 
	UNION ALL SELECT 2, 2000, 1, 8, 100
	UNION ALL SELECT 3, 2300, 1, 9, 100

	--BPI
	UNION ALL SELECT 4, 1500, 2, 7, 100
	UNION ALL SELECT 5, 2000, 2, 8, 100
	UNION ALL SELECT 6, 2300, 2, 9, 100

	--Eastwest Bank
	UNION ALL SELECT 7, 1500, 3, 7, 100
	UNION ALL SELECT 8, 2000, 3, 8, 100
	UNION ALL SELECT 9, 2300, 3, 9, 100

	--Security Bank
	UNION ALL SELECT 10, 1500, 4, 7, 100
	UNION ALL SELECT 11, 2000, 4, 8, 100
	UNION ALL SELECT 12, 2300, 4, 9, 100

	--RCBC
	UNION ALL SELECT 13, 1500, 5, 7, 100
	UNION ALL SELECT 14, 2000, 5, 8, 100
	UNION ALL SELECT 15, 2300, 5, 9, 100

	--Bank of Commerce
	UNION ALL SELECT 16, 1500, 6, 7, 100
	UNION ALL SELECT 17, 2000, 6, 8, 100
	UNION ALL SELECT 18, 2300, 6, 9, 100
)

MERGE dbo.Rate ref
USING Rate_CTE cte
	ON ref.RateId = cte.RateId
WHEN MATCHED THEN
	UPDATE 
	SET
		ref.Amount = cte.Amount,
		ref.BankId = cte.BankId,
		ref.CardCategoryId = cte.CardCategoryId,
		ref.AgentId = @defaultAgentId,
		ref.SavingsAmount = cte.SavingsAmount
WHEN NOT MATCHED BY TARGET THEN
	INSERT (RateId, Amount, BankId, CardCategoryId, AgentId, SavingsAmount)
	VALUES (cte.RateId, cte.Amount, cte.BankId, cte.CardCategoryId, @defaultAgentId, cte.SavingsAmount);

SET IDENTITY_INSERT dbo.Rate OFF
GO