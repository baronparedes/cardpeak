DECLARE @ccReferenceType INT = 2;

;WITH CardCategory_CTE(Id, [Description])
AS
(
	SELECT 1, 'Classic' 
	UNION ALL SELECT 2, 'Gold' 
	UNION ALL SELECT 3, 'Platinum' 
)

MERGE dbo.Reference ref
USING CardCategory_CTE cte
	ON ref.[Type] = @ccReferenceType AND ref.Id = cte.Id
WHEN MATCHED THEN
	UPDATE 
	SET ref.[Description] = cte.[Description]
WHEN NOT MATCHED BY TARGET THEN
	INSERT (Id, [Type], [Description])
	VALUES (cte.Id, @ccReferenceType, cte.[Description]);