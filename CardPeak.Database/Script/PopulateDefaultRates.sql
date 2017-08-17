SET IDENTITY_INSERT dbo.Rate ON
GO

DECLARE @defaultAgentId INT = 0;

;WITH Rate_CTE(RateId, Rate, BankId, CardCategoryId)
AS
(
	--Metrobank
	SELECT 1, 1500, 1, 1 
	UNION ALL SELECT 2, 2000, 1, 2
	UNION ALL SELECT 3, 2300, 1, 3

	--BPI
	UNION ALL SELECT 4, 1500, 2, 1
	UNION ALL SELECT 5, 2000, 2, 2
	UNION ALL SELECT 6, 2300, 2, 3

	--Eastwest Bank
	UNION ALL SELECT 7, 1500, 3, 1
	UNION ALL SELECT 8, 2000, 3, 2
	UNION ALL SELECT 9, 2300, 3, 3

	--Security Bank
	UNION ALL SELECT 13, 1500, 4, 1
	UNION ALL SELECT 14, 2000, 4, 2
	UNION ALL SELECT 15, 2300, 4, 3

	--RCBC
	UNION ALL SELECT 16, 1500, 5, 1
	UNION ALL SELECT 17, 2000, 5, 2
	UNION ALL SELECT 18, 2300, 5, 3

	--Bank of Commerce
	UNION ALL SELECT 19, 1500, 6, 1
	UNION ALL SELECT 20, 2000, 6, 2
	UNION ALL SELECT 21, 2300, 6, 3
)

MERGE dbo.Rate ref
USING Rate_CTE cte
	ON ref.RateId = cte.RateId
WHEN MATCHED THEN
	UPDATE 
	SET
		ref.Rate = cte.Rate,
		ref.BankId = cte.BankId,
		ref.CardCategoryId = cte.CardCategoryId,
		ref.AgentId = @defaultAgentId
WHEN NOT MATCHED BY TARGET THEN
	INSERT (RateId, Rate, BankId, CardCategoryId, AgentId)
	VALUES (cte.RateId, cte.Rate, cte.BankId, cte.CardCategoryId, @defaultAgentId);

SET IDENTITY_INSERT dbo.Rate OFF
GO