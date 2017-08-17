DECLARE @ttReferenceType INT = 4;

;WITH TransactionType_CTE(Id, [Description])
AS
(
	SELECT 1, 'Debit/Credit' 
	UNION ALL SELECT 2, 'Retirement Incentive' 
)

MERGE dbo.Reference ref
USING TransactionType_CTE cte
	ON ref.[Type] = @ttReferenceType AND ref.Id = cte.Id
WHEN MATCHED THEN
	UPDATE 
	SET ref.[Description] = cte.[Description]
WHEN NOT MATCHED BY TARGET THEN
	INSERT (Id, [Type], [Description])
	VALUES (cte.Id, @ttReferenceType, cte.[Description]);