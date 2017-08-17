DECLARE @bankReferenceType INT = 1;

;WITH Bank_CTE(BankId, [Description])
AS
(
	SELECT 1, 'Metrobank' 
	UNION ALL SELECT 2, 'BPI' 
	UNION ALL SELECT 3, 'Eastwest Bank' 
	UNION ALL SELECT 4, 'Security Bank' 
	UNION ALL SELECT 5, 'RCBC' 
	UNION ALL SELECT 6, 'Security Bank'
	UNION ALL SELECT 7, 'Bank of Commerce'
)

MERGE dbo.Reference ref
USING Bank_CTE cte
	ON ref.[Type] = @bankReferenceType AND ref.Id = cte.BankId
WHEN MATCHED THEN
	UPDATE 
	SET ref.[Description] = cte.[Description]
WHEN NOT MATCHED BY TARGET THEN
	INSERT (Id, [Type], [Description])
	VALUES (cte.BankId, @bankReferenceType, cte.[Description]);