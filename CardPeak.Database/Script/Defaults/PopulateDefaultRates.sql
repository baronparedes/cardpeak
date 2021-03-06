﻿SET IDENTITY_INSERT dbo.DefaultRate ON
GO

;WITH CoreRateWithSavings_CTE(Id, Amount, BankId, CardCategoryId, SavingsAmount, TypeId)
AS
(
	--Metrobank
			  SELECT 101, 1500, 1, 7, 100, 20
	UNION ALL SELECT 102, 2000, 1, 8, 100, 20
	UNION ALL SELECT 103, 2300, 1, 9, 100, 20

	--BPI
	UNION ALL SELECT 104, 1500, 2, 7, 100, 20
	UNION ALL SELECT 105, 1500, 2, 8, 100, 20
	UNION ALL SELECT 106, 1500, 2, 9, 100, 20

	--Eastwest Bank
	UNION ALL SELECT 107, 1500, 3, 7, 100, 20
	UNION ALL SELECT 108, 1700, 3, 8, 100, 20
	UNION ALL SELECT 109, 2400, 3, 9, 100, 20

	--Security Bank
	UNION ALL SELECT 110, 600, 4, 7, 0, 20
	UNION ALL SELECT 111, 1300, 4, 8, 100, 20
	UNION ALL SELECT 112, 1800, 4, 9, 100, 20

	--RCBC
	UNION ALL SELECT 113, 500, 5, 7, 0, 20
	UNION ALL SELECT 114, 1100, 5, 8, 100, 20
	UNION ALL SELECT 115, 1100, 5, 9, 100, 20
),
CoreRateWithoutSavings_CTE(Id, Amount, BankId, CardCategoryId, SavingsAmount, TypeId)
AS
(
	--Metrobank
			  SELECT 201, 1500, 1, 7, 0, 19
	UNION ALL SELECT 202, 2000, 1, 8, 0, 19
	UNION ALL SELECT 203, 2300, 1, 9, 0, 19

	--BPI
	UNION ALL SELECT 204, 1500, 2, 7, 0, 19
	UNION ALL SELECT 205, 1500, 2, 8, 0, 19
	UNION ALL SELECT 206, 1500, 2, 9, 0, 19

	--Eastwest Bank
	UNION ALL SELECT 207, 1500, 3, 7, 0, 19
	UNION ALL SELECT 208, 1700, 3, 8, 0, 19
	UNION ALL SELECT 209, 2400, 3, 9, 0, 19

	--Security Bank
	UNION ALL SELECT 210, 600, 4, 7, 0, 19
	UNION ALL SELECT 211, 1300, 4, 8, 0, 19
	UNION ALL SELECT 212, 1800, 4, 9, 0, 19

	--RCBC
	UNION ALL SELECT 213, 500, 5, 7, 0, 19
	UNION ALL SELECT 214, 1100, 5, 8, 0, 19
	UNION ALL SELECT 215, 1100, 5, 9, 0, 19
),
RookieRate_CTE(Id, Amount, BankId, CardCategoryId, SavingsAmount, TypeId)
AS
(
	--Metrobank
			  SELECT 301, 1300, 1, 7, 0, 18
	UNION ALL SELECT 302, 1800, 1, 8, 0, 18
	UNION ALL SELECT 303, 2100, 1, 9, 0, 18

	--BPI
	UNION ALL SELECT 304, 1300, 2, 7, 0, 18
	UNION ALL SELECT 305, 1300, 2, 8, 0, 18
	UNION ALL SELECT 306, 1300, 2, 9, 0, 18

	--Eastwest Bank
	UNION ALL SELECT 307, 1300, 3, 7, 0, 18
	UNION ALL SELECT 308, 1500, 3, 8, 0, 18
	UNION ALL SELECT 309, 2200, 3, 9, 0, 18

	--Security Bank
	UNION ALL SELECT 310, 400, 4, 7, 0, 18
	UNION ALL SELECT 311, 1100, 4, 8, 0, 18
	UNION ALL SELECT 312, 1600, 4, 9, 0, 18

	--RCBC
	UNION ALL SELECT 313, 400, 5, 7, 0, 18
	UNION ALL SELECT 314, 900, 5, 8, 0, 18
	UNION ALL SELECT 315, 900, 5, 9, 0, 18
),
DefaultRate_CTE(Id, Amount, BankId, CardCategoryId, SavingsAmount, TypeId)
AS
(
	SELECT Id, Amount, BankId, CardCategoryId, SavingsAmount, TypeId FROM CoreRateWithSavings_CTE UNION ALL
	SELECT Id, Amount, BankId, CardCategoryId, SavingsAmount, TypeId FROM CoreRateWithoutSavings_CTE UNION ALL
	SELECT Id, Amount, BankId, CardCategoryId, SavingsAmount, TypeId FROM RookieRate_CTE
)

MERGE dbo.DefaultRate ref
USING DefaultRate_CTE cte
	ON ref.DefaultRateId = cte.Id
WHEN MATCHED THEN
	UPDATE 
	SET
		ref.Amount = cte.Amount,
		ref.BankId = cte.BankId,
		ref.CardCategoryId = cte.CardCategoryId,
		ref.TypeId = cte.TypeId,
		ref.SavingsAmount = cte.SavingsAmount
WHEN NOT MATCHED BY TARGET THEN
	INSERT (DefaultRateId, Amount, BankId, CardCategoryId, SavingsAmount, TypeId)
	VALUES (cte.Id, cte.Amount, cte.BankId, cte.CardCategoryId, cte.SavingsAmount, cte.TypeId);

SET IDENTITY_INSERT dbo.DefaultRate OFF
GO